let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let connection = require('../database/connection');

//Route For admin Page
router.get('/admin', isAuthenticated, function(req, res, next){
    res.render('admin', {message : 'Welcome, ' + req.session.email});
});

router.get('/logout', function(req, res, next){
    if(req.session.email){
        req.session.destroy();
        res.redirect('/');
    }
});
//Route For registration Page
router.get('/registration', function(req, res, next){
    res.render('registration', {message : 'Welcome, ' + req.session.email});
});
/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.flag == 1){
        req.session.destroy();
        res.render('login', { title: 'Page Manager', message : 'Email Already Exists' , flag : 1});
    } else if(req.session.flag == 2){
        req.session.destroy();
        res.render('login', { title: 'Page Manager', message : 'Registration Done. Please Login.', flag : 0});
    } else if(req.session.flag == 3){
        req.session.destroy();
        res.render('login', { title: 'Page Manager', message : 'Confirm Password Does Not Match.', flag : 1});
    } else if(req.session.flag == 4){
        req.session.destroy();
        res.render('login', { title: 'Page Manager', message : 'Incorrect Email or Password.', flag : 1 });
    } else{
        res.render('login', { title: 'Page Manager' });
    }
});
//Handle POST request for User Registration
router.post('/auth_reg', function(req, res, next){
    let fullname = req.body.fullname;
    let email = req.body.email;
    let password = req.body.password;
    let cpassword = req.body.cpassword;

    if(cpassword == password){
        let sql = 'select * from user where email = ?;';
        connection.query(sql,[email], function(err, result, fields){
            if(err) throw err;

            if(result.length > 0){
                req.session.flag = 1;
                res.redirect('/');
            } else{
                let hashpassword = bcrypt.hashSync(password, 10);
                let sql = 'insert into user(fullname,email,password) values(?,?,?);';
                connection.query(sql,[fullname,email, hashpassword], function(err, result, fields){
                    if(err) throw err;
                    req.session.flag = 2;
                    res.redirect('/');
                });
            }
        });
    } else{
        req.session.flag = 3;
        res.redirect('/');
    }
});
//Handle POST request for User Login
router.post('/auth_login', function(req,res,next){
    let email = req.body.email;
    let password =req.body.password;

    let sql = 'select * from user where email = ?;';
    connection.query(sql,[email], function(err,result, fields){
        if(err) throw err;

        if(result.length && bcrypt.compareSync(password, result[0].password)){
            req.session.email = email;
            res.redirect('/admin');
        } else{
            req.session.flag = 4;
            res.redirect('/');
        }
    });
});

function isAuthenticated(req, res, next) {
    if (req.session.email) {
        return next();
    }
    res.redirect('/');
}
// Render page manager with list of pages
router.get('/pages', isAuthenticated, (req, res) => {
    const sql = 'SELECT * FROM pages';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.render('pages', { pages: results });
    });
});
//Create new page
router.post('/create', (req, res) => {
    const { title, meta_description, content, slug } = req.body;
    const sql = `INSERT INTO pages (title, meta_description, content, slug) VALUES ('${title}', '${meta_description}', '${content}', '${slug}')`;
    connection.query(sql, (error, results) => {
      if (error) throw error;
      console.log(`Created new page with title "${title}"`);
      res.redirect(`/${slug}`);
    });
  });
//   SHOW PAGE
router.get('/pages/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM pages WHERE id = '${id}'`;
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        const page = results[0];
        res.redirect(`/${page.slug}`)
      } else {
        console.log(`Page with ID ${id} not found`);
        res.redirect('/pages');
      }
    });
  });
// Delete page
router.post('/delete-page', (req, res) => {
  const id = req.body.id;
  const sql = `SELECT id FROM pages WHERE id = '${id}'`;

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      const id = results[0].id;
      const sql = `DELETE FROM pages WHERE id = ${id}`;
      connection.query(sql, (error, results) => {
        if (error) throw error;
        console.log(`Deleted page with ID ${id}`);
        res.redirect('/pages');
      });
    } else {
      console.log(`Page with id ${id} not found`);
      res.redirect('/pages');
    }
  });
});


  module.exports = router;


  router.get('/new-page', isAuthenticated, (req, res) => {
    res.render('new-page');
});
// Render dynamic pages
router.get('/:slug', isAuthenticated, (req, res) => {
    const sql = `SELECT * FROM pages WHERE slug = '${req.params.slug}'`;
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.render('page', { page: results[0] });
      } else {
        res.status(404).render('404');
      }
    });
  });
  
  router.get('/new-page', isAuthenticated, (req, res) => {
    res.render('new-page');
  });
  