import { useState } from 'react';
import { PROJECT_TYPES } from '../utils/projectConstants';
import './ProjectFormModal.css';

const EMPTY_FORM = {
  name: '',
  description: '',
  type: 'Residential',
  width: '',
  length: '',
  unit: 'ft',
  numberOfFloors: 1,
};

/**
 * Used for both creating and editing a project.
 * Pass `initialProject` to pre-fill the form for editing; omit it to
 * create a new project.
 */
export default function ProjectFormModal({ initialProject, onSubmit, onCancel }) {
  const isEditing = Boolean(initialProject);

  const [form, setForm] = useState(() =>
    initialProject
      ? {
          name: initialProject.name,
          description: initialProject.description || '',
          type: initialProject.type,
          width: initialProject.plotDimensions?.width ?? '',
          length: initialProject.plotDimensions?.length ?? '',
          unit: initialProject.plotDimensions?.unit || 'ft',
          numberOfFloors: initialProject.numberOfFloors,
        }
      : EMPTY_FORM
  );
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await onSubmit({
        name: form.name,
        description: form.description,
        type: form.type,
        plotDimensions: {
          width: Number(form.width),
          length: Number(form.length),
          unit: form.unit,
        },
        numberOfFloors: Number(form.numberOfFloors),
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>{isEditing ? 'Edit project' : 'New project'}</h2>

        {error && <div className="form-banner error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="name">Project name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Riverside Apartment"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="A short note about this project…"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="field-group">
            <label htmlFor="type">Project type</label>
            <select id="type" name="type" value={form.type} onChange={handleChange} required>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="field-group">
              <label htmlFor="width">Plot width</label>
              <input
                id="width"
                name="width"
                type="number"
                min="0"
                step="0.01"
                value={form.width}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="length">Plot length</label>
              <input
                id="length"
                name="length"
                type="number"
                min="0"
                step="0.01"
                value={form.length}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="field-group">
              <label htmlFor="unit">Unit</label>
              <select id="unit" name="unit" value={form.unit} onChange={handleChange}>
                <option value="ft">feet</option>
                <option value="m">meters</option>
              </select>
            </div>
            <div className="field-group">
              <label htmlFor="numberOfFloors">Number of floors</label>
              <input
                id="numberOfFloors"
                name="numberOfFloors"
                type="number"
                min="1"
                value={form.numberOfFloors}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Saving…' : isEditing ? 'Save changes' : 'Create project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
