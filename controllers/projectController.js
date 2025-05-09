const Project = require('../models/Project');

// POST: Create a new project
exports.createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      projectType,
      budgetMin,
      budgetMax,
      projectDuration,
      experienceLevel,
      skills
    } = req.body;

    const newProject = new Project({
      title,
      description,
      projectType,
      budgetMin,
      budgetMax,
      projectDuration,
      experienceLevel,
      skills
    });

    await newProject.save();
    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (error) {
    console.error('Error creating project:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET: Retrieve all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET: Retrieve a single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
