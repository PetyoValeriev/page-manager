My Page Manager Assignment !
Page Manager is a web application built with Node.js and Express that allows users to manage a list of pages. Users can register, log in, create new pages, view the list of pages, and delete pages.

Getting Started
To run the application, you'll need to have Node.js and MySQL installed on your computer. Follow these steps:

1.Clone the repository: git clone 
2.Install the dependencies: npm install
3.Create a MySQL database and import the pages.sql file
4.Update the database/connection.js file with your MySQL connection details
5.Start the server: npm start
6.Open your browser and go to http://localhost:3000

Features
User Registration
Users can register by entering their name, email, password, and confirm password. If the email is already taken, the user will see an error message. If the passwords don't match, the user will see an error message.

User Login
Users can log in by entering their email and password. If the email or password is incorrect, the user will see an error message.

Admin Page
After logging in, users will see an admin page with a welcome message and a link to the list of pages.

List of Pages
The list of pages shows the title and meta description of each page. Users can click on a page to view it.

Create New Page
Users can create a new page by entering a title, meta description, content, and slug. After creating the page, the user will be redirected to the page.

View Page
Users can view a page by clicking on it in the list of pages. The page will show the title, meta description, content, and slug.

Delete Page
Users can delete a page by clicking on the delete button next to the page in the list of pages. A confirmation message will be shown before deleting the page.

Contributing
If you find a bug or want to add a feature, feel free to submit a pull request or open an issue. All contributions are welcome!

License
This project is licensed under the MIT License. See the LICENSE file for details.