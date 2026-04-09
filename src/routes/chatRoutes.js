const express = require('express');

const {handleChat} = require('../controller/chatController')
const router = express.Router();

router.post('/chat',handleChat);
router.get('/check',(req,res)=>{
    console.log("checked");
    res.json({
        mssg: 'checked',
        
    })
})

module.exports = router;