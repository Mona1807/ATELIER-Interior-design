export const PROJECT_TYPES = ['Residential', 'Commercial', 'Apartment', 'Office', 'Other'];

export function formatDate(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
