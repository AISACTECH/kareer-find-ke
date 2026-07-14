// Career Matching Engine for PathFinder KE
// Weights: Academics 40%, Interests 25%, Personality 20%, Hobbies 10%, Astrology 5%

const gradePoints = {
  'A': 12, 'A-': 11, 'B+': 10, 'B': 9, 'B-': 8,
  'C+': 7, 'C': 6, 'C-': 5, 'D+': 4, 'D': 3, 'D-': 2, 'E': 1
};

// Career database with requirements and matching criteria
const careerDatabase = [
  {
    id: 'software_developer',
    title: 'Software Developer',
    field: 'Technology & Computing',
    icon: '💻',
    requiredSubjects: { mathematics: 'B', english: 'C+', computer: 'B' },
    minMeanGrade: 'C+',
    interestMatch: ['technology'],
    hobbyMatch: ['coding', 'fixing', 'reading'],
    personalityFit: { practical_theoretical: [40, 100], people_task: [40, 100], structured_flexible: [0, 70] },
    zodiacBoost: ['Virgo', 'Aquarius', 'Capricorn'],
    universities: [
      { name: 'University of Nairobi', program: 'BSc Computer Science', cutoff: 'B+', type: 'public' },
      { name: 'JKUAT', program: 'BSc IT', cutoff: 'B', type: 'public' },
      { name: 'Strathmore University', program: 'BSc Informatics', cutoff: 'B', type: 'private' },
      { name: 'KCA University', program: 'BSc Software Engineering', cutoff: 'C+', type: 'private' }
    ],
    whyFits: ['Strong analytical thinking', 'Enjoys problem-solving', 'Comfortable with technology'],
    challenges: ['Requires continuous learning', 'Can involve long screen hours', 'Tight deadlines common'],
    requirements: ['Mathematics B+', 'English C+', 'Computer Studies preferred'],
    alternativePath: 'Start with a Diploma in IT from a TVET, then upgrade to degree while working.'
  },
  {
    id: 'mechanical_engineer',
    title: 'Mechanical Engineer',
    field: 'Engineering & Construction',
    icon: '⚙️',
    requiredSubjects: { mathematics: 'B+', physics: 'B', chemistry: 'C+' },
    minMeanGrade: 'B',
    interestMatch: ['engineering'],
    hobbyMatch: ['fixing', 'drawing'],
    personalityFit: { practical_theoretical: [0, 60], people_task: [30, 100], structured_flexible: [0, 60] },
    zodiacBoost: ['Capricorn', 'Virgo', 'Taurus'],
    universities: [
      { name: 'University of Nairobi', program: 'BSc Mechanical Engineering', cutoff: 'B+', type: 'public' },
      { name: 'JKUAT', program: 'BSc Mechanical Engineering', cutoff: 'B', type: 'public' },
      { name: 'TUK', program: 'BTech Mechanical Engineering', cutoff: 'B', type: 'public' },
      { name: 'KTTC', program: 'Diploma in Mechanical Engineering', cutoff: 'C', type: 'tvet' }
    ],
    whyFits: ['Loves hands-on work', 'Strong in mathematics and physics', 'Enjoys understanding how things work'],
    challenges: ['Heavy academic workload', 'Requires licensing after graduation', 'Initial salary may be moderate'],
    requirements: ['Mathematics B+', 'Physics B+', 'Chemistry B'],
    alternativePath: 'Consider Mechanical Craft at TVET → Diploma → Degree pathway if grades are lower.'
  },
  {
    id: 'doctor',
    title: 'Medical Doctor',
    field: 'Health & Medicine',
    icon: '🩺',
    requiredSubjects: { biology: 'A-', chemistry: 'A-', mathematics: 'B+', english: 'B' },
    minMeanGrade: 'A-',
    interestMatch: ['health'],
    hobbyMatch: ['helping', 'reading'],
    personalityFit: { practical_theoretical: [20, 80], people_task: [0, 60], structured_flexible: [0, 50] },
    zodiacBoost: ['Virgo', 'Scorpio', 'Cancer'],
    universities: [
      { name: 'University of Nairobi', program: 'MBChB', cutoff: 'A', type: 'public' },
      { name: 'Moi University', program: 'MBChB', cutoff: 'A-', type: 'public' },
      { name: 'JKUAT', program: 'MBChB', cutoff: 'A-', type: 'public' },
      { name: 'Mount Kenya University', program: 'MBChB', cutoff: 'B+', type: 'private' }
    ],
    whyFits: ['Strong desire to help others', 'Excellent in sciences', 'Can handle pressure'],
    challenges: ['6+ years of study', 'Emotionally demanding', 'Long working hours'],
    requirements: ['Biology A', 'Chemistry A', 'Mathematics B+', 'English B+'],
    alternativePath: 'Consider Clinical Medicine diploma, then upgrade to degree, or pursue Nursing as alternative.'
  },
  {
    id: 'accountant',
    title: 'Certified Accountant',
    field: 'Business & Finance',
    icon: '📊',
    requiredSubjects: { mathematics: 'B', english: 'C+', business: 'B' },
    minMeanGrade: 'C+',
    interestMatch: ['business'],
    hobbyMatch: ['organizing', 'reading'],
    personalityFit: { practical_theoretical: [30, 80], people_task: [40, 100], structured_flexible: [0, 50] },
    zodiacBoost: ['Taurus', 'Virgo', 'Capricorn'],
    universities: [
      { name: 'University of Nairobi', program: 'BCom Accounting', cutoff: 'B', type: 'public' },
      { name: 'Strathmore University', program: 'BCom Finance', cutoff: 'B+', type: 'private' },
      { name: 'KCA University', program: 'BCom Accounting', cutoff: 'C+', type: 'private' },
      { name: 'Kenya School of Revenue', program: 'CPA', cutoff: 'C', type: 'tvet' }
    ],
    whyFits: ['Good with numbers', 'Detail-oriented', 'Enjoys structured work'],
    challenges: ['Requires CPA certification', 'Can be repetitive', 'Busy during tax seasons'],
    requirements: ['Mathematics B', 'English C+', 'Business Studies recommended'],
    alternativePath: 'Start CPA directly after KCSE, work as junior accountant while pursuing degree.'
  },
  {
    id: 'lawyer',
    title: 'Advocate / Lawyer',
    field: 'Public Service & Law',
    icon: '⚖️',
    requiredSubjects: { english: 'B+', history: 'B', kiswahili: 'B' },
    minMeanGrade: 'B+',
    interestMatch: ['public_service'],
    hobbyMatch: ['debating', 'reading', 'writing'],
    personalityFit: { practical_theoretical: [40, 100], people_task: [0, 60], structured_flexible: [20, 70] },
    zodiacBoost: ['Libra', 'Leo', 'Scorpio'],
    universities: [
      { name: 'University of Nairobi', program: 'LLB', cutoff: 'A-', type: 'public' },
      { name: 'Moi University', program: 'LLB', cutoff: 'B+', type: 'public' },
      { name: 'Strathmore University', program: 'LLB', cutoff: 'B+', type: 'private' },
      { name: 'Riara University', program: 'LLB', cutoff: 'B', type: 'private' }
    ],
    whyFits: ['Strong communication skills', 'Enjoys debate and argument', 'Stands for justice'],
    challenges: ['4-year degree + 1-year Kenya School of Law', 'Competitive field', 'Long hours in court'],
    requirements: ['English B+', 'History/CRE B', 'Overall B+'],
    alternativePath: 'Consider Paralegal diploma, then upgrade to law degree while working in legal firm.'
  },
  {
    id: 'nurse',
    title: 'Registered Nurse',
    field: 'Health & Medicine',
    icon: '👩‍⚕️',
    requiredSubjects: { biology: 'B', chemistry: 'C+', english: 'C+', mathematics: 'C' },
    minMeanGrade: 'C+',
    interestMatch: ['health'],
    hobbyMatch: ['helping', 'organizing'],
    personalityFit: { practical_theoretical: [20, 70], people_task: [0, 50], structured_flexible: [0, 60] },
    zodiacBoost: ['Cancer', 'Pisces', 'Virgo'],
    universities: [
      { name: 'University of Nairobi', program: 'BSc Nursing', cutoff: 'B', type: 'public' },
      { name: 'KMTC', program: 'Diploma in Nursing', cutoff: 'C+', type: 'tvet' },
      { name: 'Mount Kenya University', program: 'BSc Nursing', cutoff: 'C+', type: 'private' },
      { name: 'Moi University', program: 'BSc Nursing', cutoff: 'B', type: 'public' }
    ],
    whyFits: ['Caring personality', 'Good with people', 'Handles stress well'],
    challenges: ['Shift work required', 'Emotionally demanding', 'Physically tiring'],
    requirements: ['Biology B', 'Chemistry C+', 'English C+'],
    alternativePath: 'Start with KMTC diploma, work for 2 years, then pursue BSc Nursing part-time.'
  },
  {
    id: 'graphic_designer',
    title: 'Graphic Designer',
    field: 'Creative Arts & Media',
    icon: '🎨',
    requiredSubjects: { english: 'C+', art: 'B' },
    minMeanGrade: 'C',
    interestMatch: ['creative'],
    hobbyMatch: ['drawing', 'photography'],
    personalityFit: { practical_theoretical: [0, 60], people_task: [30, 100], structured_flexible: [40, 100] },
    zodiacBoost: ['Pisces', 'Leo', 'Libra'],
    universities: [
      { name: 'University of Nairobi', program: 'BA Design', cutoff: 'C+', type: 'public' },
      { name: 'KCAU', program: 'BFA Graphic Design', cutoff: 'C', type: 'private' },
      { name: 'Zetech University', program: 'BSc Multimedia', cutoff: 'C', type: 'private' },
      { name: 'Buru Buru Institute', program: 'Diploma in Graphic Design', cutoff: 'D+', type: 'tvet' }
    ],
    whyFits: ['Creative mindset', 'Visual thinker', 'Enjoys artistic expression'],
    challenges: ['Freelance instability initially', 'Requires portfolio building', 'Software costs'],
    requirements: ['English C+', 'Art/Design appreciation'],
    alternativePath: 'Self-teach with online courses + build portfolio, then formalize with diploma.'
  },
  {
    id: 'teacher',
    title: 'Secondary School Teacher',
    field: 'Education & Research',
    icon: '📚',
    requiredSubjects: { english: 'C+' },
    minMeanGrade: 'C+',
    interestMatch: ['education'],
    hobbyMatch: ['helping', 'debating', 'reading'],
    personalityFit: { practical_theoretical: [30, 100], people_task: [0, 50], structured_flexible: [0, 60] },
    zodiacBoost: ['Sagittarius', 'Gemini', 'Leo'],
    universities: [
      { name: 'Kenyatta University', program: 'BEd', cutoff: 'C+', type: 'public' },
      { name: 'University of Nairobi', program: 'BEd', cutoff: 'B-', type: 'public' },
      { name: 'Maseno University', program: 'BEd', cutoff: 'C+', type: 'public' },
      { name: 'Teachers Training College', program: 'Diploma in Education', cutoff: 'C', type: 'tvet' }
    ],
    whyFits: ['Enjoys sharing knowledge', 'Patient with others', 'Good communicator'],
    challenges: ['Requires TSC registration', 'Managing large classes', 'Workload can be heavy'],
    requirements: ['English C+', 'Strong grades in teaching subjects'],
    alternativePath: 'Start with P1 certificate, teach primary, then upgrade to BEd part-time.'
  },
  {
    id: 'entrepreneur',
    title: 'Entrepreneur / Business Owner',
    field: 'Business & Finance',
    icon: '🚀',
    requiredSubjects: { english: 'C+', mathematics: 'C' },
    minMeanGrade: 'C',
    interestMatch: ['business'],
    hobbyMatch: ['business', 'organizing', 'debating'],
    personalityFit: { practical_theoretical: [0, 70], people_task: [0, 60], structured_flexible: [50, 100], risk_stable: [0, 50] },
    zodiacBoost: ['Aries', 'Leo', 'Sagittarius'],
    universities: [
      { name: 'Strathmore University', program: 'BCom Entrepreneurship', cutoff: 'B', type: 'private' },
      { name: 'USIU', program: 'BBA', cutoff: 'C+', type: 'private' },
      { name: 'KCA University', program: 'BCom', cutoff: 'C+', type: 'private' },
      { name: 'Youth Enterprise Fund', program: 'Business Training', cutoff: 'Any', type: 'tvet' }
    ],
    whyFits: ['Takes initiative', 'Risk-tolerant', 'Natural leader'],
    challenges: ['Financial risk', 'No guaranteed income', 'Requires multiple skills'],
    requirements: ['Business acumen matters more than grades'],
    alternativePath: 'Start small business while studying anything, grow from there.'
  },
  {
    id: 'agronomist',
    title: 'Agricultural Scientist / Agronomist',
    field: 'Agriculture & Environment',
    icon: '🌾',
    requiredSubjects: { biology: 'B', chemistry: 'C+', agriculture: 'B' },
    minMeanGrade: 'C+',
    interestMatch: ['agriculture'],
    hobbyMatch: ['farming', 'reading'],
    personalityFit: { practical_theoretical: [20, 80], people_task: [30, 100], structured_flexible: [20, 80] },
    zodiacBoost: ['Taurus', 'Virgo', 'Cancer'],
    universities: [
      { name: 'University of Nairobi', program: 'BSc Agriculture', cutoff: 'B', type: 'public' },
      { name: 'Egerton University', program: 'BSc Agronomy', cutoff: 'C+', type: 'public' },
      { name: 'JKUAT', program: 'BSc Agricultural Engineering', cutoff: 'B', type: 'public' },
      { name: 'Bukura Agricultural College', program: 'Diploma in Agriculture', cutoff: 'C', type: 'tvet' }
    ],
    whyFits: ['Connection to nature', 'Analytical mindset', 'Interested in food security'],
    challenges: ['May require fieldwork', 'Weather-dependent work', 'Rural posting possible'],
    requirements: ['Biology B', 'Chemistry C+', 'Agriculture preferred'],
    alternativePath: 'Diploma in Agriculture from TVET, work in agribusiness, then pursue degree.'
  },
  {
    id: 'journalist',
    title: 'Journalist / Media Professional',
    field: 'Creative Arts & Media',
    icon: '📰',
    requiredSubjects: { english: 'B', kiswahili: 'C+' },
    minMeanGrade: 'C+',
    interestMatch: ['creative'],
    hobbyMatch: ['writing', 'debating', 'photography'],
    personalityFit: { practical_theoretical: [30, 100], people_task: [0, 50], structured_flexible: [40, 100] },
    zodiacBoost: ['Gemini', 'Sagittarius', 'Leo'],
    universities: [
      { name: 'University of Nairobi', program: 'BA Journalism', cutoff: 'B', type: 'public' },
      { name: 'Daystar University', program: 'BA Communication', cutoff: 'C+', type: 'private' },
      { name: 'USIU', program: 'BA Journalism', cutoff: 'C+', type: 'private' },
      { name: 'Kenya Institute of Mass Communication', program: 'Diploma in Journalism', cutoff: 'C', type: 'tvet' }
    ],
    whyFits: ['Curious about the world', 'Strong communication', 'Enjoys storytelling'],
    challenges: ['Competitive industry', 'Deadline pressure', 'Job security concerns'],
    requirements: ['English B', 'Kiswahili C+'],
    alternativePath: 'Start blogging/vlogging, build audience, then formalize with media training.'
  },
  {
    id: 'civil_engineer',
    title: 'Civil Engineer',
    field: 'Engineering & Construction',
    icon: '🏗️',
    requiredSubjects: { mathematics: 'B+', physics: 'B', chemistry: 'C+' },
    minMeanGrade: 'B',
    interestMatch: ['engineering'],
    hobbyMatch: ['drawing', 'fixing'],
    personalityFit: { practical_theoretical: [20, 70], people_task: [30, 100], structured_flexible: [0, 60] },
    zodiacBoost: ['Capricorn', 'Taurus', 'Virgo'],
    universities: [
      { name: 'University of Nairobi', program: 'BSc Civil Engineering', cutoff: 'A-', type: 'public' },
      { name: 'JKUAT', program: 'BSc Civil Engineering', cutoff: 'B+', type: 'public' },
      { name: 'TUK', program: 'BTech Civil Engineering', cutoff: 'B', type: 'public' },
      { name: 'Kenya National Polytechnic', program: 'Diploma in Civil Engineering', cutoff: 'C+', type: 'tvet' }
    ],
    whyFits: ['Likes building things', 'Strong in maths and physics', 'Enjoys outdoor work'],
    challenges: ['Site work in harsh conditions', 'Project responsibility', 'Licensing required'],
    requirements: ['Mathematics B+', 'Physics B+', 'Chemistry B'],
    alternativePath: 'Start with Building Technology diploma, work as technician, upgrade to degree.'
  }
];

// Calculate grade score
const getGradeScore = (grade) => gradePoints[grade] || 0;

// Calculate academic match
const calculateAcademicMatch = (academicData, career) => {
  let score = 0;
  let maxScore = 0;

  // Mean grade check
  const meanGradeScore = getGradeScore(academicData.meanGrade);
  const requiredMeanScore = getGradeScore(career.minMeanGrade);
  const meanGradeMatch = Math.min((meanGradeScore / requiredMeanScore) * 100, 100);
  score += meanGradeMatch * 0.4;
  maxScore += 40;

  // Subject requirements
  if (career.requiredSubjects) {
    const subjects = Object.entries(career.requiredSubjects);
    subjects.forEach(([subject, requiredGrade]) => {
      const studentGrade = academicData.subjects?.[subject];
      if (studentGrade) {
        const studentScore = getGradeScore(studentGrade);
        const requiredScore = getGradeScore(requiredGrade);
        const subjectMatch = Math.min((studentScore / requiredScore) * 100, 100);
        score += subjectMatch * (60 / subjects.length / 100);
        maxScore += 60 / subjects.length;
      } else {
        maxScore += 60 / subjects.length;
      }
    });
  }

  return maxScore > 0 ? (score / maxScore) * 100 : 50;
};

// Calculate interest match
const calculateInterestMatch = (interestData, career) => {
  if (!interestData.ratings || !career.interestMatch) return 50;
  
  let totalScore = 0;
  let count = 0;

  career.interestMatch.forEach(interest => {
    const rating = interestData.ratings[interest];
    if (rating === 'love') {
      totalScore += 100;
    } else if (rating === 'neutral') {
      totalScore += 50;
    } else if (rating === 'avoid') {
      totalScore += 10;
    } else {
      totalScore += 40;
    }
    count++;
  });

  return count > 0 ? totalScore / count : 50;
};

// Calculate personality match
const calculatePersonalityMatch = (personalityData, career) => {
  if (!personalityData.axes || !career.personalityFit) return 50;

  let totalScore = 0;
  let count = 0;

  Object.entries(career.personalityFit).forEach(([axis, [min, max]]) => {
    const value = personalityData.axes[axis];
    if (value !== undefined) {
      if (value >= min && value <= max) {
        totalScore += 100;
      } else {
        const distance = value < min ? min - value : value - max;
        totalScore += Math.max(0, 100 - distance * 2);
      }
      count++;
    }
  });

  return count > 0 ? totalScore / count : 50;
};

// Calculate hobby match
const calculateHobbyMatch = (hobbiesData, career) => {
  if (!hobbiesData.selectedHobbies || !career.hobbyMatch) return 50;

  const matches = career.hobbyMatch.filter(hobby => 
    hobbiesData.selectedHobbies.includes(hobby)
  ).length;

  return Math.min((matches / career.hobbyMatch.length) * 120, 100);
};

// Calculate astrology boost
const calculateAstrologyBoost = (astrologyData, career) => {
  if (!astrologyData.zodiacSign || !career.zodiacBoost) return 50;

  return career.zodiacBoost.includes(astrologyData.zodiacSign) ? 80 : 50;
};

// Main matching function
export const calculateCareerMatches = (assessmentData) => {
  const { academic_data, hobbies_background, personality_scores, interest_ratings, astrology_data } = assessmentData;

  const matches = careerDatabase.map(career => {
    const academicScore = calculateAcademicMatch(academic_data || {}, career);
    const interestScore = calculateInterestMatch(interest_ratings || {}, career);
    const personalityScore = calculatePersonalityMatch(personality_scores || {}, career);
    const hobbyScore = calculateHobbyMatch(hobbies_background || {}, career);
    const astrologyScore = calculateAstrologyBoost(astrology_data || {}, career);

    // Weighted calculation
    const matchScore = Math.round(
      (academicScore * 0.40) +
      (interestScore * 0.25) +
      (personalityScore * 0.20) +
      (hobbyScore * 0.10) +
      (astrologyScore * 0.05)
    );

    return {
      ...career,
      matchScore,
      breakdown: [
        { factor: 'Academics (40%)', score: Math.round(academicScore) },
        { factor: 'Interests (25%)', score: Math.round(interestScore) },
        { factor: 'Personality (20%)', score: Math.round(personalityScore) },
        { factor: 'Hobbies (10%)', score: Math.round(hobbyScore) },
        { factor: 'Astrology (5%)', score: Math.round(astrologyScore) }
      ]
    };
  });

  // Sort by match score
  return matches.sort((a, b) => b.matchScore - a.matchScore);
};

// Generate assessment summary
export const generateAssessmentSummary = (assessmentData) => {
  const { academic_data, hobbies_background, personality_scores, interest_ratings, astrology_data } = assessmentData;

  // Find top interest
  let topInterest = 'Not specified';
  if (interest_ratings?.ratings) {
    const lovedInterests = Object.entries(interest_ratings.ratings)
      .filter(([_, rating]) => rating === 'love')
      .map(([interest]) => interest.replace(/_/g, ' '));
    if (lovedInterests.length > 0) {
      topInterest = lovedInterests[0].charAt(0).toUpperCase() + lovedInterests[0].slice(1);
    }
  }

  // Determine work style from personality
  let workStyle = 'Balanced';
  if (personality_scores?.axes) {
    const { people_task, structured_flexible } = personality_scores.axes;
    if (people_task < 40) workStyle = 'Team Player';
    else if (people_task > 60) workStyle = 'Independent';
    if (structured_flexible < 40) workStyle = 'Structured ' + workStyle;
    else if (structured_flexible > 60) workStyle = 'Flexible ' + workStyle;
  }

  // Top hobby
  const hobbyNames = {
    fixing: 'Fixing things',
    drawing: 'Design',
    debating: 'Communication',
    farming: 'Agriculture',
    coding: 'Technology',
    helping: 'Helping others',
    reading: 'Research',
    sports: 'Sports',
    music: 'Music',
    cooking: 'Culinary',
    business: 'Business',
    writing: 'Writing',
    photography: 'Photography',
    organizing: 'Organization'
  };
  const topHobby = hobbies_background?.selectedHobbies?.[0] 
    ? hobbyNames[hobbies_background.selectedHobbies[0]] || hobbies_background.selectedHobbies[0]
    : 'Not specified';

  // Strengths based on academics
  const strengths = [];
  if (academic_data?.subjects) {
    const goodSubjects = Object.entries(academic_data.subjects)
      .filter(([_, grade]) => getGradeScore(grade) >= 9)
      .map(([subject]) => subject.charAt(0).toUpperCase() + subject.slice(1));
    strengths.push(...goodSubjects.slice(0, 3));
  }
  if (hobbies_background?.selectedHobbies?.includes('coding')) strengths.push('Tech Skills');
  if (hobbies_background?.selectedHobbies?.includes('debating')) strengths.push('Communication');
  if (hobbies_background?.selectedHobbies?.includes('helping')) strengths.push('Empathy');

  return {
    meanGrade: academic_data?.meanGrade || 'N/A',
    topInterest,
    workStyle,
    topHobby,
    zodiac: astrology_data?.zodiacSign || 'N/A',
    strengths: strengths.length > 0 ? strengths : ['Determination', 'Curiosity', 'Growth Mindset']
  };
};
