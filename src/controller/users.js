const connectdb = require('../database/db').connectdb;
const ip = require('ip');

// Get all data from database
const getAllData = async (req, res) => {
    try {
        const [rows] = await connectdb.query('SELECT * FROM users'); // Pastikan tabel bernama 'customers'
        res.render('customers', { customers: rows, user: req.session.user });
    } catch (err) {
        // console.error(err);
        res.status(500).send('Server Error');
    }
};
  
// Route untuk halaman utama
const getPageData =  async (req, res) => {
    try {
        // Mengambil total data dari database
        const [totalRows] = await connectdb.query('SELECT COUNT(*) AS total FROM users');
        const totalData = totalRows[0].total;

        // Mengambil semua data pengguna dari database
        const [usersRows] = await connectdb.query('SELECT * FROM users');
        const users = usersRows;

        // console.log('Total Data:', totalData); // Log untuk debugging
        res.render('home', { totalData, users, user: req.session.user });
    } catch (err) {
        console.error('Error handling request: ' + err.stack);
        res.status(500).send('Internal Server Error');
    }
};

// Create new Users
const createUsers = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const data = {
            username,
            email,
            password
        };

        const sql = "INSERT INTO users SET ?";
        await connectdb.query(sql, data); // Assuming connectdb.query returns a promise

        res.redirect('/customers'); // Correct usage of res.redirect
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { users_id } = req.body;
        const sql = "DELETE FROM users WHERE users_id = ?";
        await connectdb.query(sql, users_id); // Assuming connectdb.query returns a promise

        res.redirect('/customers'); // Correct usage of res.redirect
    } catch (error) {
        next(error);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const { username, email, password } = req.body; // Ambil data update dari req.body

        // Ambil users_id dari sesi atau dari data yang telah diverifikasi pengguna
        const users_id = req.user.users_id; // Misalnya, ini adalah bagaimana Anda mengambil users_id dari sesi pengguna

        // Pastikan users_id ada
        if (!users_id) {
            return res.status(400).json({ error: 'Users ID is required' });
        }

        // Ambil data pengguna dari database berdasarkan users_id
        let [user] = await connectdb.query("SELECT * FROM users WHERE users_id = ?", [users_id]);

        // Pastikan pengguna ditemukan
        if (!user || user.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Persiapan query SQL untuk update
        let sql = "UPDATE users SET ";
        const values = [];

        // Tambahkan username jika tersedia
        if (username) {
            sql += "username = ?, ";
            values.push(username);
        }

        // Tambahkan email jika tersedia
        if (email) {
            sql += "email = ?, ";
            values.push(email);
        }

        // Tambahkan password jika tersedia
        if (password) {
            sql += "password = ?, ";
            values.push(password);
        }

        // Hapus koma terakhir dan tambahkan WHERE clause
        sql = sql.replace(/,\s*$/, " ") + "WHERE users_id = ?";
        values.push(users_id);

        // Eksekusi query untuk melakukan update
        const [result] = await connectdb.query(sql, values);

        // Periksa apakah ada baris yang diupdate
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found or no changes applied' });
        }

        // Redirect atau respons setelah berhasil melakukan update
        res.redirect('/customers');
    } catch (error) {
        console.error('Database error:', error);
        next(error);
    }
};




// const updateProduct = async (req, res, next) => {
//     try {
//         const { users_id, username, email, password } = req.body;

//         // Pastikan product_id ada
//         if (!users_id) {
//             return res.status(400).json({ error: 'Users ID is required' });
//         }

//         // Persiapan query SQL
//         let sql = "UPDATE users SET ";
//         const values = [];

//         // Tambahkan product_name jika tersedia
//         if (username) {
//             sql += "username = ?, ";
//             values.push(username);
//         }

//         // Tambahkan product_name jika tersedia
//         if (email) {
//             sql += "email = ?, ";
//             values.push(email);
//         }

//         // Tambahkan product_price jika tersedia dan valid
//         if (password && !isNaN(password)) {
//             sql += "password = ?, ";
//             values.push(password);
//         }

//         // Hapus koma terakhir dan tambahkan WHERE clause
//         sql = sql.replace(/,\s*$/, " ") + "WHERE users_id = ?";
//         values.push(users_id);

//         // Eksekusi query
//         const [result] = await connectdb.query(sql, values);

//         // Periksa apakah ada baris yang diupdate
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ error: 'Users not found or no changes applied' });
//         }

//         // Redirect setelah update berhasil
//         res.redirect('/customers');
//     } catch (error) {
//         console.error('Database error:', error);
//         next(error);
//     }
// };



module.exports = { getAllData, createUsers, deleteProduct, updateProduct, getPageData  };
