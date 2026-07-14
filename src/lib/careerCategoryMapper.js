Maps CareerMatcher fields to KUCCPS course categories
export const FIELD_TO_CATEGORY = {
  'Technology & Computing': 'Technology',
  'Engineering & Construction': 'Engineering',
  'Health & Medicine': 'Health',
  'Business & Finance': 'Business',
  'Public Service & Law': 'Law',
  'Creative Arts & Media': 'Media',
  'Education & Research': 'Education',
  'Agriculture & Environment': 'Agriculture'
};

export const careerFieldToCategory = (field) => FIELD_TO_CATEGORY[field] || 'TVET';

// Get preferred category from top career matches
export const getPreferredCategoryFromMatches = (careerMatches) => {
  if (!careerMatches || careerMatches.length === 0) return '';
  // Use the top 3 matches to find the most common category
  const topThree = careerMatches.slice(0, 3);
  const categories = topThree.map(c => careerFieldToCategory(c.field)).filter(Boolean);
  if (categories.length === 0) return '';
  // Return the most frequent category
  const freq = {};
  categories.forEach(cat => { freq[cat] = (freq[cat] || 0) + 1; });
  return Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b);
};

// Build assessment context for KUCCPS
export const buildKuccpsContext = (assessment, careerMatches) => {
  const subjects = assessment?.academic_data?.subjects || {};
  const meanGrade = assessment?.academic_data?.meanGrade || '';
  const studentName = assessment?.student_name || '';
  const preferredCategory = getPreferredCategoryFromMatches(careerMatches);
  const topCareers = careerMatches.slice(0, 5).map(c => ({
    title: c.title,
    field: c.field,
    matchScore: c.matchScore,
    category: careerFieldToCategory(c.field)
  }));

  return { subjects, meanGrade, studentName, preferredCategory, topCareers };
};
