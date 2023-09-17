import connection from "../database/connection.js"

const getPages = async (req, res) => {
    try {
      const [rows, fields] = await connection.query('SELECT * FROM pages');
      const pages = rows;
      res.render('pages', { pages });
    } catch (error) {
      console.error('Error fetching pages:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
const getPageByID = (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM pages WHERE id = ?';
    connection.query(sql, [id], (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            const page = result[0];
            res.redirect(`/${page.slug}`);
        } else {
            console.log(`Page with ID ${id} not found`);
            res.redirect('/pages')
        }
    });
};



  const renderPageBySlug = async (req, res) => {
    const sql = `SELECT * FROM pages WHERE slug = ?`;
    try {
      const [rows] = await connection.execute(sql, [req.params.slug]);
      if (rows.length > 0) {
        res.render('page', { page: rows[0] });
      } else {
        res.status(404).render('404');
      }
    } catch (error) {
      console.error('Error rendering page by slug:', error);
      res.status(500).send('Internal Server Error');
    }
  };

const renderNewPage = (req, res) => {
    res.render('new-page');
};





const checkPageExists = async (id) => {
    // Perform a database query to check if the page exists
    const result = await connection.query('SELECT * FROM pages WHERE id = ?', [id]);
  
    if (result.length === 0) {
      throw new Error('Page not found'); // Reject the promise with an error
    }
  
    return id; // Return the ID if the page exists
  };

const deletePage = async (req, res) => {
    try {
      const id = req.body.id;
      const idToDelete = await checkPageExists(id);
      
      const deleteSql = `DELETE FROM pages WHERE id = ?`;
      const [results] = await connection.query(deleteSql, [idToDelete]);
      
      console.log(`Deleted page with ID ${idToDelete}`);
      res.redirect('/pages');
    } catch (error) {
      console.error('Error deleting the page:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  

export {
    getPages,
    getPageByID,
    renderPageBySlug,
    renderNewPage,
    deletePage
}