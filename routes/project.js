const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// POST a new project
router.post('/create', projectController.createProject);

// GET all projects
router.get('/', projectController.getAllProjects);

// GET a single project by ID
router.get('/:id', projectController.getProjectById);

module.exports = router;