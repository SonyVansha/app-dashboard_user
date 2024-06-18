const { getAllData, createUsers, deleteProduct, updateProduct, getPageData } = require('../controller/users');
const { createUserSignup, getUserLogin, getUserLogout, pageAdmin, postUserLogin, deleteUserLogin } = require('../controller/auth');
const { pageLogin, pageSignup } = require('../controller/auth-page');

const express = require('express');
const router = express.Router();

// Page routes
router.get('/home', getPageData);
router.get('/customers', getAllData);

// API routes
router.post('/save', createUsers);
router.post('/delete', deleteProduct);
router.post('/update', updateProduct);

// Auth routes
router.post('/signup', createUserSignup);
router.post('/login', getUserLogin);
router.get('/logout', getUserLogout);
// router.post('/users', getAllUserLogin)
router.post('/user', postUserLogin);
router.post('/remove', deleteUserLogin);

// Page routes auth
router.get('/', pageLogin);
router.get('/signup', pageSignup);
router.get('/admin', pageAdmin);

module.exports = router;