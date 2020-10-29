# Full-Stack Personal Blog Site

Editor's Demo Site: https://kchhan-blog-editor.herokuapp.com/login
<br />
User's Demo Site: https://kchhan-blog-view.herokuapp.com/
<br />

![Screenshot](./blog-editor/public/blog-editor.png 'Screenshot')
Screenshot of Editor's Site

![Screenshot](./blog-view/public/blog-view.png 'Screenshot')
Screenshot of User's Site

---

## Tools Used:

### Front-End Tools

- [Javascript](https://en.wikipedia.org/wiki/JavaScript) - High level programming language and core technology of the web.
  - [React](https://reactjs.org/) - JavaScript library maintained by Facebook
- [CSS3](https://en.wikipedia.org/wiki/CSS) - Style Sheet Language for making attractive web pages

### Back-End Tools

- [Node.js](https://nodejs.org/en/about/) - JavaScript runtime for server-side development
  - [Express](http://expressjs.com/) - Node.js web application framework
- [MongoDB](https://www.mongodb.com/) - A document-based, cloud database
  - [Mongoose](https://mongoosejs.com/) - Schema-based object modeling tool
- [Heroku](https://heroku.com) - Cloud application platform

---

## Features:

- Authentication and Authorization

  - [JSON Web Tokens](https://jwt.io/) secures transmission of information   between the server and the client through a digitally signed token

  - [Passport.js](http://www.passportjs.org/) to log in with authentication using Local Strategies
  
  - [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) to hash passwords before storing those hashes in the database

- Validation and Sanitization

  - [Express-Validator](https://express-validator.github.io/docs/) ensures that client inputs are valid in that they meet a set of criteria depending on its use case

- REST API
  - A software architectural style that defines a set of constraints to be used for creating Web services
  - [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) allows the editor to create, read, update, or delete the posts
