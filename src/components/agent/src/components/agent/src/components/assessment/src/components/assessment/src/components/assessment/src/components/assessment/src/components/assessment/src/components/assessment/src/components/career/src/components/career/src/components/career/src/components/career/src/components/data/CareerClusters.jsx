// Kenya Career Cluster Data
// RIASEC Personality Types: Realistic, Investigative, Artistic, Social, Enterprising, Conventional

export const careerClusters = [
  {
    id: 'legal_services',
    name: 'Legal Services',
    overview: 'Justice, law enforcement, advocacy, interpretation of laws, protection of rights.',
    personalities: ['Enterprising', 'Social', 'Investigative'],
    riasec: ['E', 'S', 'I'],
    skills: ['Communication', 'Critical thinking', 'Argumentation', 'Research', 'Ethics and integrity'],
    icon: '⚖️',
    color: 'bg-amber-100 text-amber-700'
  },
  {
    id: 'business_entrepreneurship',
    name: 'Business & Entrepreneurship',
    overview: 'Starting and managing businesses, trade, leadership, profit-making ventures.',
    personalities: ['Enterprising', 'Conventional'],
    riasec: ['E', 'C'],
    skills: ['Management', 'Financial literacy', 'Negotiation', 'Decision-making', 'Risk analysis'],
    icon: '💼',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: 'media_communication',
    name: 'Media & Communication',
    overview: 'Information sharing, storytelling, journalism, public relations, broadcasting.',
    personalities: ['Artistic', 'Social'],
    riasec: ['A', 'S'],
    skills: ['Writing', 'Public speaking', 'Creativity', 'Media production', 'Communication'],
    icon: '📺',
    color: 'bg-purple-100 text-purple-700'
  },
  {
    id: 'education_training',
    name: 'Education & Training',
    overview: 'Teaching, mentoring, training, curriculum development, knowledge transfer.',
    personalities: ['Social', 'Conventional'],
    riasec: ['S', 'C'],
    skills: ['Teaching methods', 'Patience', 'Communication', 'Mentorship', 'Organization'],
    icon: '📚',
    color: 'bg-green-100 text-green-700'
  },
  {
    id: 'engineering_built_environment',
    name: 'Engineering & Built Environment',
    overview: 'Designing, constructing, fixing, innovating physical systems and structures.',
    personalities: ['Realistic', 'Investigative'],
    riasec: ['R', 'I'],
    skills: ['Mathematics', 'Technical design', 'Problem-solving', 'Spatial thinking', 'Precision'],
    icon: '🏗️',
    color: 'bg-orange-100 text-orange-700'
  },
  {
    id: 'information_technology',
    name: 'Information Technology (ICT)',
    overview: 'Computing, software, data, networks, digital solutions.',
    personalities: ['Investigative', 'Realistic'],
    riasec: ['I', 'R'],
    skills: ['Programming', 'Logical thinking', 'Data analysis', 'Systems troubleshooting', 'Innovation'],
    icon: '💻',
    color: 'bg-cyan-100 text-cyan-700'
  },
  {
    id: 'mathematics_statistics',
    name: 'Mathematics, Statistics & Actuarial Science',
    overview: 'Numbers, data modeling, forecasting, risk assessment.',
    personalities: ['Investigative', 'Conventional'],
    riasec: ['I', 'C'],
    skills: ['Advanced mathematics', 'Statistical analysis', 'Modeling', 'Accuracy', 'Logical reasoning'],
    icon: '📐',
    color: 'bg-indigo-100 text-indigo-700'
  },
  {
    id: 'laboratory_sciences',
    name: 'Laboratory & Physical Sciences',
    overview: 'Scientific research, experiments, laboratory testing, analysis.',
    personalities: ['Investigative', 'Realistic'],
    riasec: ['I', 'R'],
    skills: ['Observation', 'Data recording', 'Experimentation', 'Analysis', 'Laboratory safety'],
    icon: '🔬',
    color: 'bg-violet-100 text-violet-700'
  },
  {
    id: 'environmental_sciences',
    name: 'Environmental & Earth Sciences',
    overview: 'Environment protection, climate, geography, natural resources.',
    personalities: ['Investigative', 'Realistic'],
    riasec: ['I', 'R'],
    skills: ['Environmental analysis', 'Field research', 'Data collection', 'Reporting', 'Sustainability planning'],
    icon: '🌍',
    color: 'bg-emerald-100 text-emerald-700'
  },
  {
    id: 'finance_accounting',
    name: 'Finance, Accounting & Economics',
    overview: 'Money management, auditing, banking, financial planning.',
    personalities: ['Conventional', 'Enterprising'],
    riasec: ['C', 'E'],
    skills: ['Numerical accuracy', 'Financial analysis', 'Record keeping', 'Compliance', 'Risk management'],
    icon: '📊',
    color: 'bg-slate-100 text-slate-700'
  },
  {
    id: 'medicine_surgery',
    name: 'Medicine & Surgery',
    overview: 'Diagnosis, treatment, saving lives, advanced healthcare.',
    personalities: ['Investigative', 'Social'],
    riasec: ['I', 'S'],
    skills: ['Diagnosis', 'Decision-making', 'Empathy', 'Scientific reasoning', 'Stress management'],
    icon: '🩺',
    color: 'bg-red-100 text-red-700'
  },
  {
    id: 'nursing_midwifery',
    name: 'Nursing & Midwifery',
    overview: 'Patient care, maternal health, community healthcare support.',
    personalities: ['Social', 'Realistic'],
    riasec: ['S', 'R'],
    skills: ['Patient care', 'Communication', 'Empathy', 'Observation', 'Teamwork'],
    icon: '👩‍⚕️',
    color: 'bg-pink-100 text-pink-700'
  },
  {
    id: 'clinical_public_health',
    name: 'Clinical & Public Health Services',
    overview: 'Community health, disease prevention, health research.',
    personalities: ['Investigative', 'Social'],
    riasec: ['I', 'S'],
    skills: ['Health analysis', 'Research', 'Data interpretation', 'Community engagement', 'Reporting'],
    icon: '🏥',
    color: 'bg-rose-100 text-rose-700'
  },
  {
    id: 'pharmaceutical_biomedical',
    name: 'Pharmaceutical & Biomedical Sciences',
    overview: 'Drug development, testing, pharmacy services.',
    personalities: ['Investigative', 'Conventional'],
    riasec: ['I', 'C'],
    skills: ['Drug analysis', 'Precision', 'Research', 'Quality control', 'Ethics'],
    icon: '💊',
    color: 'bg-teal-100 text-teal-700'
  },
  {
    id: 'agriculture_agribusiness',
    name: 'Agriculture & Agribusiness',
    overview: 'Farming, food production, agribusiness, rural development.',
    personalities: ['Realistic', 'Enterprising'],
    riasec: ['R', 'E'],
    skills: ['Farming techniques', 'Problem-solving', 'Business planning', 'Resource management', 'Sustainability'],
    icon: '🌾',
    color: 'bg-lime-100 text-lime-700'
  },
  {
    id: 'veterinary_animal_sciences',
    name: 'Veterinary & Animal Sciences',
    overview: 'Animal health, wildlife, livestock production.',
    personalities: ['Investigative', 'Realistic'],
    riasec: ['I', 'R'],
    skills: ['Animal care', 'Diagnosis', 'Observation', 'Empathy', 'Fieldwork'],
    icon: '🐾',
    color: 'bg-amber-100 text-amber-700'
  },
  {
    id: 'logistics_supply_chain',
    name: 'Logistics, Supply Chain & Procurement',
    overview: 'Movement of goods, storage, planning, procurement.',
    personalities: ['Conventional', 'Enterprising'],
    riasec: ['C', 'E'],
    skills: ['Planning', 'Organization', 'Inventory control', 'Data analysis', 'Negotiation'],
    icon: '🚚',
    color: 'bg-gray-100 text-gray-700'
  },
  {
    id: 'creative_arts_design',
    name: 'Creative Arts & Design',
    overview: 'Art, music, fashion, design, self-expression.',
    personalities: ['Artistic', 'Enterprising'],
    riasec: ['A', 'E'],
    skills: ['Creativity', 'Design', 'Visual thinking', 'Innovation', 'Expression'],
    icon: '🎨',
    color: 'bg-fuchsia-100 text-fuchsia-700'
  },
  {
    id: 'social_sciences_community',
    name: 'Social Sciences & Community Development',
    overview: 'Human behavior, counseling, social welfare, community work.',
    personalities: ['Social', 'Investigative'],
    riasec: ['S', 'I'],
    skills: ['Counseling', 'Empathy', 'Communication', 'Research', 'Problem-solving'],
    icon: '🤝',
    color: 'bg-sky-100 text-sky-700'
  },
  {
    id: 'security_disaster_management',
    name: 'Security, Safety & Disaster Management',
    overview: 'Protection, emergency response, safety planning, risk control.',
    personalities: ['Realistic', 'Social'],
    riasec: ['R', 'S'],
    skills: ['Risk assessment', 'Leadership', 'Decision-making', 'Crisis management', 'Discipline'],
    icon: '🛡️',
    color: 'bg-stone-100 text-stone-700'
  }
];

// RIASEC personality mapping
export const riasecTypes = {
  R: {
    name: 'Realistic',
    description: 'Practical, hands-on, mechanical',
    traits: ['Physical', 'Athletic', 'Practical', 'Tool-oriented']
  },
  I: {
    name: 'Investigative',
    description: 'Analytical, intellectual, scientific',
    traits: ['Research', 'Problem-solving', 'Curious', 'Precise']
  },
  A: {
    name: 'Artistic',
    description: 'Creative, intuitive, expressive',
    traits: ['Creative', 'Original', 'Independent', 'Imaginative']
  },
  S: {
    name: 'Social',
    description: 'Helpful, cooperative, supportive',
    traits: ['Friendly', 'Helpful', 'Idealistic', 'Empathetic']
  },
  E: {
    name: 'Enterprising',
    description: 'Persuasive, energetic, ambitious',
    traits: ['Adventurous', 'Ambitious', 'Competitive', 'Leader']
  },
  C: {
    name: 'Conventional',
    description: 'Organized, detail-oriented, methodical',
    traits: ['Organized', 'Thorough', 'Persistent', 'Practical']
  }
};

// Map personality axes to RIASEC
export const mapPersonalityToRIASEC = (personalityScores) => {
  if (!personalityScores?.axes) return [];
  
  const { practical_theoretical, people_task, structured_flexible, risk_stable } = personalityScores.axes;
  const types = [];
  
  // Realistic: practical, task-oriented, structured
  if (practical_theoretical < 40 && people_task > 50 && structured_flexible < 50) {
    types.push('R');
  }
  
  // Investigative: theoretical, task-oriented
  if (practical_theoretical > 60 && people_task > 40) {
    types.push('I');
  }
  
  // Artistic: flexible, creative
  if (structured_flexible > 60) {
    types.push('A');
  }
  
  // Social: people-oriented
  if (people_task < 40) {
    types.push('S');
  }
  
  // Enterprising: risk-taking, people-oriented
  if (risk_stable < 50 && people_task < 60) {
    types.push('E');
  }
  
  // Conventional: structured, stable
  if (structured_flexible < 40 && risk_stable > 50) {
    types.push('C');
  }
  
  return types.length > 0 ? types : ['S', 'C']; // Default
};

// Get matching clusters for RIASEC types
export const getMatchingClusters = (riasecTypes) => {
  return careerClusters.filter(cluster => 
    cluster.riasec.some(type => riasecTypes.includes(type))
  ).map(cluster => ({
    ...cluster,
    matchStrength: cluster.riasec.filter(type => riasecTypes.includes(type)).length
  })).sort((a, b) => b.matchStrength - a.matchStrength);
};

// Get cluster by ID
export const getClusterById = (clusterId) => {
  return careerClusters.find(c => c.id === clusterId);
};
