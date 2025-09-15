const express = require('express');
const router = express.Router();
// For now we'll just log contact messages
router.post('/', (req,res)=>{
  console.log('Contact form submission:', req.body);
  // In production -> save to DB or send email with nodemailer
  res.json({ message: 'Received' });
});
module.exports = router;
