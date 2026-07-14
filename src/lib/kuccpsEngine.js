/ KUCCPS Cluster Point Calculation Engine
// Local computation — no external API needed

export const GRADE_POINTS = {
  'A': 12, 'A-': 11, 'B+': 10, 'B': 9, 'B-': 8,
  'C+': 7, 'C': 6, 'C-': 5, 'D+': 4, 'D': 3, 'D-': 2, 'E': 1
};

export const KCSE_GRADES = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E'];

// Core subject groups for cluster calculation
export const SUBJECT_CLUSTERS = {
  sciences: ['mathematics', 'biology', 'chemistry', 'physics'],
  technicals: ['mathematics', 'physics', 'geography', 'computer'],
  social_sciences: ['history', 'geography', 'cre', 'business'],
  languages: ['english', 'kiswahili', 'literature', 'french'],
  arts: ['kiswahili', 'literature', 'history', 'geography', 'cre']
};

// Course cluster requirements (historical KUCCPS cutoffs)
export const COURSE_CUTOFFS = [
  { id: 'medicine', name: 'Bachelor of Medicine & Surgery', cluster: 'sciences', min_points: 40, institutions: ['uon', 'moi', 'ku'], category: 'Health' },
  { id: 'pharmacy', name: 'Bachelor of Pharmacy', cluster: 'sciences', min_points: 36, institutions: ['uon', 'ku'], category: 'Health' },
  { id: 'nursing', name: 'Bachelor of Nursing', cluster: 'sciences', min_points: 32, institutions: ['uon', 'ku', 'mku'], category: 'Health' },
  { id: 'clinical_medicine', name: 'Clinical Medicine', cluster: 'sciences', min_points: 30, institutions: ['kmtc', 'mku'], category: 'Health' },
  { id: 'engineering', name: 'Bachelor of Engineering (Civil)', cluster: 'technicals', min_points: 35, institutions: ['uon', 'jkuat', 'tuk'], category: 'Engineering' },
  { id: 'mechanical_eng', name: 'Mechanical Engineering', cluster: 'technicals', min_points: 34, institutions: ['uon', 'jkuat', 'tuk'], category: 'Engineering' },
  { id: 'electrical_eng', name: 'Electrical Engineering', cluster: 'technicals', min_points: 33, institutions: ['uon', 'jkuat', 'tuk'], category: 'Engineering' },
  { id: 'software', name: 'Software Engineering', cluster: 'technicals', min_points: 32, institutions: ['jkuat', 'usiu', 'strathmore'], category: 'Technology' },
  { id: 'computer_science', name: 'Computer Science', cluster: 'technicals', min_points: 30, institutions: ['uon', 'jkuat', 'ku', 'usiu'], category: 'Technology' },
  { id: 'it', name: 'Information Technology', cluster: 'technicals', min_points: 28, institutions: ['jkuat', 'kca', 'zetech'], category: 'Technology' },
  { id: 'law', name: 'Bachelor of Laws (LLB)', cluster: 'languages', min_points: 38, institutions: ['uon', 'strathmore', 'riara'], category: 'Law' },
  { id: 'business_admin', name: 'Business Administration', cluster: 'social_sciences', min_points: 30, institutions: ['uon', 'ku', 'strathmore', 'kca'], category: 'Business' },
  { id: 'commerce', name: 'Bachelor of Commerce', cluster: 'social_sciences', min_points: 32, institutions: ['uon', 'ku', 'strathmore', 'kca'], category: 'Business' },
  { id: 'economics', name: 'Economics & Statistics', cluster: 'social_sciences', min_points: 31, institutions: ['uon', 'ku', 'mku'], category: 'Business' },
  { id: 'education_arts', name: 'Education (Arts)', cluster: 'arts', min_points: 26, institutions: ['ku', 'uon', 'mku', 'daystar'], category: 'Education' },
  { id: 'education_sciences', name: 'Education (Sciences)', cluster: 'sciences', min_points: 28, institutions: ['ku', 'uon', 'mku'], category: 'Education' },
  { id: 'journalism', name: 'Journalism & Mass Comm', cluster: 'languages', min_points: 28, institutions: ['kimc', 'daystar', 'usiu'], category: 'Media' },
  { id: 'agriculture', name: 'BSc Agriculture', cluster: 'sciences', min_points: 28, institutions: ['egerton', 'jkuat', 'uon'], category: 'Agriculture' },
  { id: 'horticulture', name: 'Horticulture', cluster: 'sciences', min_points: 26, institutions: ['egerton', 'jkuat'], category: 'Agriculture' },
  { id: 'tvet_electrical', name: 'Diploma in Electrical Eng', cluster: 'technicals', min_points: 20, institutions: ['knp', 'nyeri', 'kisumu', 'eldoret'], category: 'TVET' },
  { id: 'tvet_business', name: 'Diploma in Business', cluster: 'social_sciences', min_points: 18, institutions: ['knp', 'nyeri', 'kisumu'], category: 'TVET' },
  { id: 'tvet_mechanical', name: 'Diploma in Mechanical Eng', cluster: 'technicals', min_points: 20, institutions: ['knp', 'nyeri', 'eldoret'], category: 'TVET' },
  { id: 'tvet_medical', name: 'Diploma in Nursing (KMTC)', cluster: 'sciences', min_points: 22, institutions: ['kmtc'], category: 'TVET' },
  { id: 'tvet_it', name: 'Diploma in IT', cluster: 'technicals', min_points: 18, institutions: ['knp', 'kisumu', 'mombasa'], category: 'TVET' },
  { id: 'tvet_education', name: 'P1 Teaching Certificate', cluster: 'arts', min_points: 14, institutions: ['knp', 'nyeri'], category: 'TVET' },
];

export const DEFAULT_WEIGHTS = {
  cluster_points: 0.40,
  subject_relevance: 0.25,
  mean_grade: 0.20,
  course_preference: 0.15
};

// Convert grade to points
export const gradeToPoints = (grade) => GRADE_POINTS[grade] || 0;

// Calculate mean grade points from all subjects
export const calculateMeanPoints = (subjects) => {
  const points = Object.values(subjects).map(g => gradeToPoints(g)).filter(p => p > 0);
  if (points.length === 0) return 0;
  return points.reduce((a, b) => a + b, 0) / points.length;
};

// Calculate cluster points for a specific cluster
// KUCCPS formula: sum of 4 best subjects in cluster ÷ 48 × 48 (simplified)
export const calculateClusterPoints = (subjects, clusterKey) => {
  const clusterSubjects = SUBJECT_CLUSTERS[clusterKey] || [];
  const clusterGrades = clusterSubjects
    .map(subj => gradeToPoints(subjects[subj]))
    .filter(p => p > 0)
    .sort((a, b) => b - a)
    .slice(0, 4);

  if (clusterGrades.length === 0) return 0;
  const sum = clusterGrades.reduce((a, b) => a + b, 0);
  // Scale to 0-48 range (4 subjects × 12 max points each)
  return Math.round((sum / 48) * 48);
};

// Get all cluster scores
export const calculateAllClusters = (subjects) => {
  const clusters = {};
  Object.keys(SUBJECT_CLUSTERS).forEach(key => {
    clusters[key] = calculateClusterPoints(subjects, key);
  });
  return clusters;
};

// Mean grade from points
export const pointsToMeanGrade = (avgPoints) => {
  if (avgPoints >= 11.5) return 'A';
  if (avgPoints >= 10.5) return 'A-';
  if (avgPoints >= 9.5) return 'B+';
  if (avgPoints >= 8.5) return 'B';
  if (avgPoints >= 7.5) return 'B-';
  if (avgPoints >= 6.5) return 'C+';
  if (avgPoints >= 5.5) return 'C';
  if (avgPoints >= 4.5) return 'C-';
  if (avgPoints >= 3.5) return 'D+';
  if (avgPoints >= 2.5) return 'D';
  if (avgPoints >= 1.5) return 'D-';
  return 'E';
};

// Check course eligibility and calculate match score
export const calculateCourseEligibility = (subjects, preferredCategory, weights) => {
  const clusterScores = calculateAllClusters(subjects);
  const meanPoints = calculateMeanPoints(subjects);
  const meanGrade = pointsToMeanGrade(meanPoints);
  const w = weights || DEFAULT_WEIGHTS;

  return COURSE_CUTOFFS.map(course => {
    const clusterScore = clusterScores[course.cluster] || 0;
    const eligible = clusterScore >= course.min_points;

    // Weighted match score (0-100)
    const clusterPct = Math.min(clusterScore / 48, 1) * 100;
    const subjectRelevance = Math.min(clusterScore / course.min_points, 1) * 100;
    const meanPct = (meanPoints / 12) * 100;
    const preferenceBonus = preferredCategory === course.category ? 100 : 50;

    const matchScore = Math.round(
      clusterPct * w.cluster_points +
      subjectRelevance * w.subject_relevance +
      meanPct * w.mean_grade +
      preferenceBonus * w.course_preference
    );

    return {
      ...course,
      cluster_score: clusterScore,
      eligible,
      match_score: Math.min(matchScore, 100),
      margin: clusterScore - course.min_points
    };
  }).sort((a, b) => b.match_score - a.match_score);
};

// Generate placement summary
export const generatePlacementSummary = (results) => {
  const eligible = results.filter(r => r.eligible);
  const total = results.length;
  const placed = eligible.length;
  const placementRate = total > 0 ? Math.round((placed / total) * 100) : 0;
  const avgScore = eligible.length > 0
    ? Math.round(eligible.reduce((sum, r) => sum + r.match_score, 0) / eligible.length)
    : 0;

  return { total, placed, unplaced: total - placed, placementRate, avgScore };
};
