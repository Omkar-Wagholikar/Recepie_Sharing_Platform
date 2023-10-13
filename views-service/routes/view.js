const path = require('path');

const express = require('express');

const router=express.Router();

const adminRoutes=require('../controllers/view');

const fetch = require('node-fetch');

router.get('/view',adminRoutes.makeranklist);



module.exports=router;