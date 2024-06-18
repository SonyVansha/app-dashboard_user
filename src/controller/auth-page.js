// Page login
const pageLogin = async (req, res) => {
    res.render('login');
};

// Page signup
const pageSignup = async (req, res) => {
    res.render('signup');
}

// Page home
// const pageHome = async (req, res) => {
//     // Pastikan ada session yang berisi informasi user client
//     if (!req.session.user) {
//         return res.redirect('/');
//     }
//     res.render('home', { user: req.session.user });
// };

// const pageAdmin = async (req, res) => {
//     // Pastikan ada session yang berisi informasi user admin
//     if (!req.session.user || req.session.user.username !== 'admin') {
//         return res.redirect('/');
//     }
//     res.render('admin');
// };



module.exports = { pageLogin, pageSignup };