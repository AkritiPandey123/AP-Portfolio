const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const auth = require('../middleware/auth');

router.get('/', async (req,res)=> {
  const list = await BlogPost.find().sort({ createdAt: -1 });
  res.json(list);
});

router.post('/', auth, async (req,res)=> {
  const b = new BlogPost(req.body);
  await b.save();
  res.json(b);
});

router.put('/:id', auth, async (req,res)=> {
  const b = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(b);
});

router.delete('/:id', auth, async (req,res)=> {
  await BlogPost.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
