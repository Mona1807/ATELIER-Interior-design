const Project = require('../models/project.model');
const { validateProjectInput } = require('../utils/validators');

/**
 * Shared helper: fetches a project by id and confirms the current user is
 * its owner. Returns { project } on success, or { errorResponse } if the
 * caller should stop and send that response instead.
 *
 * NOTE: "authorized members" access (per the project brief) will extend
 * this check once team collaboration exists. For now, ownership is the
 * only authorization rule, by design for this phase.
 */
async function findOwnedProjectOr404(projectId, userId) {
  const project = await Project.findById(projectId);

  if (!project) {
    return { errorResponse: { status: 404, message: 'Project not found.' } };
  }

  if (String(project.owner) !== String(userId)) {
    // 404 rather than 403 here so we don't reveal that a project with this
    // id exists but belongs to someone else.
    return { errorResponse: { status: 404, message: 'Project not found.' } };
  }

  return { project };
}

/**
 * POST /api/projects
 */
async function createProject(req, res, next) {
  try {
    const { name, description, type, plotDimensions, numberOfFloors } = req.body;

    const errors = validateProjectInput({ name, type, plotDimensions, numberOfFloors });
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: errors.join(' ') });
    }

    const project = await Project.create({
      name: name.trim(),
      description: description?.trim() || '',
      type,
      plotDimensions,
      numberOfFloors,
      owner: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: { project },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/projects
 * Lists projects owned by the current user. Supports an optional
 * ?status=active|archived filter (defaults to returning both).
 */
async function getProjects(req, res, next) {
  try {
    const filter = { owner: req.user._id };

    if (req.query.status === 'active' || req.query.status === 'archived') {
      filter.status = req.query.status;
    }

    const projects = await Project.find(filter).sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      data: { projects },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/projects/:id
 */
async function getProjectById(req, res, next) {
  try {
    const { project, errorResponse } = await findOwnedProjectOr404(req.params.id, req.user._id);
    if (errorResponse) {
      return res.status(errorResponse.status).json({ success: false, message: errorResponse.message });
    }

    return res.status(200).json({ success: true, data: { project } });
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/projects/:id
 */
async function updateProject(req, res, next) {
  try {
    const { project, errorResponse } = await findOwnedProjectOr404(req.params.id, req.user._id);
    if (errorResponse) {
      return res.status(errorResponse.status).json({ success: false, message: errorResponse.message });
    }

    const { name, description, type, plotDimensions, numberOfFloors } = req.body;

    const errors = validateProjectInput(
      { name, type, plotDimensions, numberOfFloors },
      { isUpdate: true }
    );
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: errors.join(' ') });
    }

    if (name !== undefined) project.name = name.trim();
    if (description !== undefined) project.description = description.trim();
    if (type !== undefined) project.type = type;
    if (plotDimensions !== undefined) project.plotDimensions = plotDimensions;
    if (numberOfFloors !== undefined) project.numberOfFloors = numberOfFloors;

    await project.save();

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      data: { project },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/projects/:id/archive
 * Toggles a project between 'active' and 'archived' (soft delete/restore).
 */
async function toggleArchiveProject(req, res, next) {
  try {
    const { project, errorResponse } = await findOwnedProjectOr404(req.params.id, req.user._id);
    if (errorResponse) {
      return res.status(errorResponse.status).json({ success: false, message: errorResponse.message });
    }

    project.status = project.status === 'active' ? 'archived' : 'active';
    await project.save();

    return res.status(200).json({
      success: true,
      message: project.status === 'archived' ? 'Project archived.' : 'Project restored.',
      data: { project },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/projects/:id
 * Permanently removes the project. This is distinct from archiving above.
 */
async function deleteProject(req, res, next) {
  try {
    const { project, errorResponse } = await findOwnedProjectOr404(req.params.id, req.user._id);
    if (errorResponse) {
      return res.status(errorResponse.status).json({ success: false, message: errorResponse.message });
    }

    await project.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Project deleted permanently.',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  toggleArchiveProject,
  deleteProject,
};
