const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

router.get('/', async (req,res)=> {
  const list = await Project.find().sort({ createdAt: -1 });
  res.json(list);
});

router.post('/', auth, async (req,res)=> {
  const p = new Project(req.body);
  await p.save();
  res.json(p);
});

router.put('/:id', auth, async (req,res)=> {
  const p = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
});

router.delete('/:id', auth, async (req,res)=> {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
