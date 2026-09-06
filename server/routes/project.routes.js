const express = require('express');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  toggleArchiveProject,
  deleteProject,
} = require('../controllers/project.controller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Every project route requires a logged-in user.
router.use(protect);

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.patch('/:id/archive', toggleArchiveProject);
router.delete('/:id', deleteProject);

module.exports = router;
