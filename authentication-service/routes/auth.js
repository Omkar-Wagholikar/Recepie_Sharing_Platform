const path = require('path');

const express = require('express');

const router=express.Router();

const adminRoutes=require('../controller/auth');

router.post('/register',adminRoutes.postregister);

router.post('/login',adminRoutes.postlogin);

router.get('/refresh', adminRoutes.getRefresh);

module.exports=router;