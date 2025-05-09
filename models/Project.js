const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  projectType: { type: String, required: true },
  budgetMin: { type: Number, required: true },
  budgetMax: { type: Number, required: true },
  projectDuration: { type: Number, required: true },
  experienceLevel: { type: String, required: true },
  skills: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);