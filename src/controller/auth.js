const { connect_db } = require('../database/db-auth');
const { method_db } = require('../database/db-auth');

// Admin user
const adminUser = {
    username: 'admin',
    password: 'admin123'
};

// Signup user
const createUserSignup = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    
    // Check if password and confirm password match
    if (password !== confirmPassword) {
        return res.send('Passwords do not match');
    }

    const sql = `INSERT INTO user (username, email, password) VALUES (?, ?, ?)`;
    connect_db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error('Error signing up:', err.message);
            return res.status(500).send('Error signing up');
        }
        console.log('Signup successful');
        res.redirect('/?success=Signup successful');
    });
};

// Login user
const getUserLogin = async (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT * FROM user WHERE username = ? AND password = ?`;

    // Verifikasi admin user
    if (username === adminUser.username && password === adminUser.password) {
        req.session.user = adminUser; // Simpan user admin di session
        return res.redirect('/admin'); // Redirect ke halaman admin setelah login sukses
    } 

    connect_db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Error logging in:', err.message);
            return res.status(500).send('Error logging in');
        }
        if (results.length > 0) {
            req.session.user = results[0]; // Simpan user di session
            res.redirect('/home'); // Redirect ke halaman home setelah login sukses
        } else {
            res.redirect('/login?error=Invalid credentials');
        }
    });
};

// Logout user
const getUserLogout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error logging out:', err.message);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/');
    });
};

// get page admin and get all user login
const pageAdmin = async (req, res) => {
    try {
        // Pastikan ada session yang berisi informasi user admin
        if (!req.session.user || req.session.user.username !== 'admin') {
            return res.redirect('/');
        }

        // Lakukan query ke database
        const [rows] = await method_db.query('SELECT * FROM user');

        // Render halaman admin dengan data user
        res.render('admin', { admin: rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

const postUserLogin = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const data = {
            username,
            email,
            password
        };

        const sql = "INSERT INTO user SET ?";
        await method_db.query(sql, data); // Assuming connectdb.query returns a promise

        res.redirect('/admin'); // Correct usage of res.redirect
    } catch (error) {
        next(error);
        res.redirect('/')
    }
};

const deleteUserLogin = async (req, res, next) => {
    try {
        const { id } = req.body;
        const sql = "DELETE FROM user WHERE id = ?";
        await method_db.query(sql, id); // Assuming connectdb.query returns a promise

        res.redirect('/admin'); // Correct usage of res.redirect
    } catch (error) {
        next(error);
    }
};

module.exports = { createUserSignup, getUserLogin, getUserLogout, pageAdmin, postUserLogin, deleteUserLogin };