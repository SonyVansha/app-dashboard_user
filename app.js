const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const { createUsersTable } = require('./src/database/db');
const { createUsersLogin } = require('./src/database/db-auth');
const router = require('./src/routes/route');

const app = express();
const port = 3000;

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'a1b2c3d4e5f6g7h8i9j0',
    resave: false,
    saveUninitialized: true
}));

// Set view engine
app.set('view engine', 'hbs');

// Set views directory public/views
app.set('views', path.join(__dirname, 'public/views'));

// Path access to public directory
app.use('/assets', express.static(__dirname + '/public'));

// Menggunakan router yang telah didefinisikan
app.use('/', router);

app.listen(port, async () => {
    await createUsersTable();
    await createUsersLogin();
    console.log(`Server is running at http://localhost:${port}`);
});