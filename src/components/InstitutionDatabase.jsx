// Comprehensive Kenyan Institution Database
// Includes universities, TVETs with detailed information

export const institutionDatabase = {
  // PUBLIC UNIVERSITIES
  'uon': {
    id: 'uon',
    name: 'University of Nairobi',
    shortName: 'UoN',
    type: 'public',
    location: 'Nairobi',
    established: 1970,
    website: 'https://www.uonbi.ac.ke',
    admissionsUrl: 'https://admissions.uonbi.ac.ke',
    applicationPortal: 'https://smis.uonbi.ac.ke',
    logo: '🏛️',
    description: 'Kenya\'s premier and largest university, offering world-class education across multiple disciplines.',
    campusLife: {
      housing: 'On-campus hostels available (limited slots, apply early). Options include Hall 1-12 with varying amenities.',
      clubs: '100+ student organizations including drama, debate, cultural clubs, and sports teams',
      facilities: 'Modern libraries, sports complex, health center, research labs, and student center',
      transport: 'Main campus in Nairobi CBD with satellite campuses. Public transport easily accessible.'
    },
    scholarships: [
      { name: 'Government HELB Loan', type: 'Loan/Bursary', coverage: 'Tuition + upkeep', deadline: 'August annually' },
      { name: 'UoN Merit Scholarship', type: 'Merit-based', coverage: 'Full tuition', deadline: 'Upon admission' },
      { name: 'Equity Wings to Fly', type: 'Need-based', coverage: 'Full scholarship', deadline: 'January' },
      { name: 'MasterCard Foundation Scholars', type: 'Need + Merit', coverage: 'Full support', deadline: 'February' }
    ],
    applicationDeadlines: {
      regular: 'April 30 (KUCCPS)',
      selfSponsored: 'Rolling admissions',
      postgraduate: 'March & September'
    },
    fees: {
      range: 'KES 70,000 - 150,000 per year (government sponsored)',
      selfSponsored: 'KES 150,000 - 400,000 per year'
    },
    contact: {
      phone: '+254 20 318262',
      email: 'enquiries@uonbi.ac.ke',
      address: 'P.O. Box 30197-00100, Nairobi'
    }
  },

  'jkuat': {
    id: 'jkuat',
    name: 'Jomo Kenyatta University of Agriculture and Technology',
    shortName: 'JKUAT',
    type: 'public',
    location: 'Juja, Kiambu County',
    established: 1994,
    website: 'https://www.jkuat.ac.ke',
    admissionsUrl: 'https://admissions.jkuat.ac.ke',
    applicationPortal: 'https://portal.jkuat.ac.ke',
    logo: '🌱',
    description: 'Leading university in technology, engineering, and agricultural sciences with strong industry linkages.',
    campusLife: {
      housing: 'Modern hostels on the expansive Juja campus. Both single and shared rooms available.',
      clubs: 'Active tech clubs, innovation hubs (JKUAT Fab Lab), agricultural societies, and sports teams',
      facilities: 'Innovation and incubation center, modern labs, large farm for practical learning, sports facilities',
      transport: 'Located along Thika Superhighway. University shuttles and matatus available.'
    },
    scholarships: [
      { name: 'HELB Loan', type: 'Government Loan', coverage: 'Tuition + upkeep', deadline: 'August' },
      { name: 'JKUAT Work Study Program', type: 'Work-based', coverage: 'Partial fees', deadline: 'Ongoing' },
      { name: 'Japanese Government Scholarship', type: 'Merit', coverage: 'Full + stipend', deadline: 'April' },
      { name: 'DAAD Scholarship', type: 'Merit', coverage: 'Full support', deadline: 'October' }
    ],
    applicationDeadlines: {
      regular: 'April 30 (KUCCPS)',
      selfSponsored: 'January, May, September',
      postgraduate: 'March & August'
    },
    fees: {
      range: 'KES 60,000 - 120,000 per year (government sponsored)',
      selfSponsored: 'KES 120,000 - 350,000 per year'
    },
    contact: {
      phone: '+254 67 5870001',
      email: 'info@jkuat.ac.ke',
      address: 'P.O. Box 62000-00200, Nairobi'
    }
  },

  'ku': {
    id: 'ku',
    name: 'Kenyatta University',
    shortName: 'KU',
    type: 'public',
    location: 'Kahawa, Nairobi',
    established: 1985,
    website: 'https://www.ku.ac.ke',
    admissionsUrl: 'https://admissions.ku.ac.ke',
    applicationPortal: 'https://studentportal.ku.ac.ke',
    logo: '📚',
    description: 'Renowned for education and humanities programs with a beautiful, expansive campus.',
    campusLife: {
      housing: 'Multiple hostel blocks with 24-hour security. Both on-campus and nearby private hostels.',
      clubs: 'Strong in drama (travelling theatre), music, sports, and academic societies',
      facilities: 'Post-modern library, gymnasium, swimming pool, conference center, and health unit',
      transport: 'Along Thika Road. Well-connected by public transport and university buses.'
    },
    scholarships: [
      { name: 'HELB Loan', type: 'Government', coverage: 'Tuition + upkeep', deadline: 'August' },
      { name: 'KU Excellence Award', type: 'Merit', coverage: '50% tuition', deadline: 'Upon admission' },
      { name: 'CDF Bursary', type: 'Need-based', coverage: 'Partial', deadline: 'Varies by constituency' },
      { name: 'Private Sponsors', type: 'Various', coverage: 'Varies', deadline: 'Various' }
    ],
    applicationDeadlines: {
      regular: 'April 30 (KUCCPS)',
      selfSponsored: 'Rolling',
      postgraduate: 'April & October'
    },
    fees: {
      range: 'KES 50,000 - 100,000 per year (government sponsored)',
      selfSponsored: 'KES 100,000 - 280,000 per year'
    },
    contact: {
      phone: '+254 20 8710901',
      email: 'registrar@ku.ac.ke',
      address: 'P.O. Box 43844-00100, Nairobi'
    }
  },

  'moi': {
    id: 'moi',
    name: 'Moi University',
    shortName: 'MU',
    type: 'public',
    location: 'Eldoret, Uasin Gishu County',
    established: 1984,
    website: 'https://www.mu.ac.ke',
    admissionsUrl: 'https://admissions.mu.ac.ke',
    applicationPortal: 'https://studentportal.mu.ac.ke',
    logo: '🏔️',
    description: 'Premier university in the Rift Valley known for medicine, engineering, and agriculture.',
    campusLife: {
      housing: 'Hostels at main campus and town campus. Cool highland climate.',
      clubs: 'Athletics club (produces champions), cultural groups, religious societies',
      facilities: 'Teaching hospital (MTRH), agricultural farms, modern lecture halls',
      transport: 'Main campus 35km from Eldoret town. University transport available.'
    },
    scholarships: [
      { name: 'HELB Loan', type: 'Government', coverage: 'Tuition + upkeep', deadline: 'August' },
      { name: 'Moi University Bursary', type: 'Need-based', coverage: 'Partial', deadline: 'Semester start' },
      { name: 'County Bursaries', type: 'Need-based', coverage: 'Partial', deadline: 'Varies' }
    ],
    applicationDeadlines: {
      regular: 'April 30 (KUCCPS)',
      selfSponsored: 'January, May, September',
      postgraduate: 'March & August'
    },
    fees: {
      range: 'KES 55,000 - 130,000 per year (government sponsored)',
      selfSponsored: 'KES 130,000 - 380,000 per year'
    },
    contact: {
      phone: '+254 53 4343 5000',
      email: 'info@mu.ac.ke',
      address: 'P.O. Box 3900-30100, Eldoret'
    }
  },

  'tuk': {
    id: 'tuk',
    name: 'Technical University of Kenya',
    shortName: 'TUK',
    type: 'public',
    location: 'Nairobi CBD',
    established: 2013,
    website: 'https://www.tukenya.ac.ke',
    admissionsUrl: 'https://admissions.tukenya.ac.ke',
    applicationPortal: 'https://smis.tukenya.ac.ke',
    logo: '⚙️',
    description: 'Specialized in technical and applied sciences, ideal for hands-on learners.',
    campusLife: {
      housing: 'Limited on-campus housing. Most students live in nearby areas.',
      clubs: 'Engineering societies, innovation clubs, sports teams',
      facilities: 'Well-equipped engineering workshops, computer labs, modern classrooms',
      transport: 'Central Nairobi location, easily accessible by all transport.'
    },
    scholarships: [
      { name: 'HELB Loan', type: 'Government', coverage: 'Tuition + upkeep', deadline: 'August' },
      { name: 'TUK Merit Award', type: 'Merit', coverage: 'Partial tuition', deadline: 'Upon admission' }
    ],
    applicationDeadlines: {
      regular: 'April 30 (KUCCPS)',
      selfSponsored: 'Rolling admissions',
      postgraduate: 'Twice yearly'
    },
    fees: {
      range: 'KES 60,000 - 100,000 per year',
      selfSponsored: 'KES 100,000 - 250,000 per year'
    },
    contact: {
      phone: '+254 20 2219929',
      email: 'info@tukenya.ac.ke',
      address: 'P.O. Box 52428-00200, Nairobi'
    }
  },

  'egerton': {
    id: 'egerton',
    name: 'Egerton University',
    shortName: 'Egerton',
    type: 'public',
    location: 'Njoro, Nakuru County',
    established: 1987,
    website: 'https://www.egerton.ac.ke',
    admissionsUrl: 'https://admissions.egerton.ac.ke',
    applicationPortal: 'https://portal.egerton.ac.ke',
    logo: '🌾',
    description: 'Kenya\'s agricultural flagship university with extensive research farms.',
    campusLife: {
      housing: 'On-campus hostels in serene rural setting. Affordable and peaceful.',
      clubs: 'Agricultural clubs, environmental societies, sports (especially rugby)',
      facilities: '14,000-acre campus with farms, dairy, modern labs, and research centers',
      transport: '25km from Nakuru town. Regular matatu services.'
    },
    scholarships: [
      { name: 'HELB Loan', type: 'Government', coverage: 'Full', deadline: 'August' },
      { name: 'Egerton Alumni Scholarship', type: 'Merit', coverage: 'Partial', deadline: 'March' },
      { name: 'Agricultural Scholarships', type: 'Field-specific', coverage: 'Varies', deadline: 'Varies' }
    ],
    applicationDeadlines: {
      regular: 'April 30 (KUCCPS)',
      selfSponsored: 'January, May, September',
      postgraduate: 'March & August'
    },
    fees: {
      range: 'KES 45,000 - 90,000 per year',
      selfSponsored: 'KES 90,000 - 200,000 per year'
    },
    contact: {
      phone: '+254 51 2217808',
      email: 'registrar@egerton.ac.ke',
      address: 'P.O. Box 536-20115, Egerton'
    }
  },

  'maseno': {
    id: 'maseno',
    name: 'Maseno University',
    shortName: 'Maseno',
    type: 'public',
    location: 'Maseno, Kisumu County',
    established: 1991,
    website: 'https://www.maseno.ac.ke',
    admissionsUrl: 'https://admissions.maseno.ac.ke',
    applicationPortal: 'https://studentportal.maseno.ac.ke',
    logo: '🌅',
    description: 'Leading university in Western Kenya with strong programs in sciences and education.',
    campusLife: {
      housing: 'Affordable hostels with lake-region hospitality.',
      clubs: 'Music and cultural groups, sports, academic societies',
      facilities: 'Libraries, labs, sports grounds, health center',
      transport: '20km from Kisumu. Regular public transport.'
    },
    scholarships: [
      { name: 'HELB Loan', type: 'Government', coverage: 'Full', deadline: 'August' },
      { name: 'Maseno Needy Students Fund', type: 'Need-based', coverage: 'Partial', deadline: 'Ongoing' }
    ],
    applicationDeadlines: {
      regular: 'April 30 (KUCCPS)',
      selfSponsored: 'Rolling',
      postgraduate: 'April & September'
    },
    fees: {
      range: 'KES 50,000 - 95,000 per year',
      selfSponsored: 'KES 95,000 - 220,000 per year'
    },
    contact: {
      phone: '+254 57 351622',
      email: 'registrar@maseno.ac.ke',
      address: 'P.O. Box 333-40105, Maseno'
    }
  },

  // PRIVATE UNIVERSITIES
  'strathmore': {
    id: 'strathmore',
    name: 'Strathmore University',
    shortName: 'Strathmore',
    type: 'private',
    location: 'Madaraka, Nairobi',
    established: 1961,
    website: 'https://www.strathmore.edu',
    admissionsUrl: 'https://admissions.strathmore.edu',
    applicationPortal: 'https://sues.strathmore.edu',
    logo: '🎓',
    description: 'Premier private university known for business, law, and IT programs with strong ethics focus.',
    campusLife: {
      housing: 'No on-campus housing but assists with finding accommodation nearby.',
      clubs: 'Debating society, business clubs, tech incubator (@iBizAfrica), community service',
      facilities: 'State-of-art facilities, business incubator, modern library, chapel',
      transport: 'Located in Madaraka Estate, accessible by public transport.'
    },
    scholarships: [
      { name: 'Strathmore Scholarship Fund', type: 'Need + Merit', coverage: 'Up to 100%', deadline: 'March' },
      { name: 'HELB for Private Unis', type: 'Government', coverage: 'Partial', deadline: 'August' },
      { name: 'Corporate Scholarships', type: 'Merit', coverage: 'Varies', deadline: 'Various' },
      { name: 'Work-Study Program', type: 'Work-based', coverage: 'Partial fees', deadline: 'Ongoing' }
    ],
    applicationDeadlines: {
      regular: 'Rolling (January, May, September intakes)',
      earlyBird: 'Get discounts for early application',
      postgraduate: 'Rolling'
    },
    fees: {
      range: 'KES 250,000 - 550,000 per year',
      note: 'Payment plans available'
    },
    contact: {
      phone: '+254 703 034000',
      email: 'admissions@strathmore.edu',
      address: 'P.O. Box 59857-00200, Nairobi'
    }
  },

  'usiu': {
    id: 'usiu',
    name: 'United States International University - Africa',
    shortName: 'USIU-Africa',
    type: 'private',
    location: 'Kasarani, Nairobi',
    established: 1969,
    website: 'https://www.usiu.ac.ke',
    admissionsUrl: 'https://www.usiu.ac.ke/admissions',
    applicationPortal: 'https://apply.usiu.ac.ke',
    logo: '🌍',
    description: 'American-style education with diverse international student body and flexible credit system.',
    campusLife: {
      housing: 'Modern on-campus hostels and apartments available.',
      clubs: '50+ clubs including Model UN, drama, entrepreneurship, and cultural groups',
      facilities: 'American-style campus, sports complex, cafeterias, counseling center',
      transport: 'Kasarani area, university shuttles and public transport available.'
    },
    scholarships: [
      { name: 'USIU Merit Scholarship', type: 'Merit', coverage: 'Up to 50%', deadline: 'Before semester' },
      { name: 'USIU-Africa Scholarship Fund', type: 'Need-based', coverage: 'Varies', deadline: 'Ongoing' },
      { name: 'Athletic Scholarships', type: 'Sports', coverage: 'Partial', deadline: 'Tryout based' }
    ],
    applicationDeadlines: {
      regular: 'Rolling (3 semesters per year)',
      fall: 'August',
      spring: 'January',
      summer: 'May'
    },
    fees: {
      range: 'KES 300,000 - 600,000 per year',
      note: 'Credit-based system, pay per credit'
    },
    contact: {
      phone: '+254 730 116000',
      email: 'admissions@usiu.ac.ke',
      address: 'P.O. Box 14634-00800, Nairobi'
    }
  },

  'kca': {
    id: 'kca',
    name: 'KCA University',
    shortName: 'KCAU',
    type: 'private',
    location: 'Ruaraka, Nairobi',
    established: 1989,
    website: 'https://www.kcau.ac.ke',
    admissionsUrl: 'https://admissions.kcau.ac.ke',
    applicationPortal: 'https://portal.kcau.ac.ke',
    logo: '📊',
    description: 'Specialized in business, accounting, and IT with strong professional body affiliations.',
    campusLife: {
      housing: 'Hostel facilities available on campus.',
      clubs: 'Accounting clubs, IT society, business forums, sports',
      facilities: 'Computer labs, library, auditorium, sports facilities',
      transport: 'Ruaraka along Thika Road, easily accessible.'
    },
    scholarships: [
      { name: 'KCAU Academic Excellence', type: 'Merit', coverage: 'Up to 50%', deadline: 'Upon admission' },
      { name: 'HELB Loan', type: 'Government', coverage: 'Partial', deadline: 'August' },
      { name: 'Corporate Partnerships', type: 'Sponsored', coverage: 'Varies', deadline: 'Various' }
    ],
    applicationDeadlines: {
      regular: 'Rolling (Jan, May, Sep)',
      professional: 'Aligned with KASNEB dates'
    },
    fees: {
      range: 'KES 150,000 - 280,000 per year',
      note: 'Affordable private option'
    },
    contact: {
      phone: '+254 20 2719019',
      email: 'admissions@kcau.ac.ke',
      address: 'P.O. Box 56808-00200, Nairobi'
    }
  },

  'mku': {
    id: 'mku',
    name: 'Mount Kenya University',
    shortName: 'MKU',
    type: 'private',
    location: 'Thika (Main), Multiple Campuses',
    established: 1996,
    website: 'https://www.mku.ac.ke',
    admissionsUrl: 'https://admissions.mku.ac.ke',
    applicationPortal: 'https://studentportal.mku.ac.ke',
    logo: '🏔️',
    description: 'Fast-growing university with campuses across Kenya and East Africa.',
    campusLife: {
      housing: 'Hostels available at main campus and some satellite campuses.',
      clubs: 'Various student organizations across all campuses',
      facilities: 'Modern facilities, medical school with hospital, law school with moot court',
      transport: 'Main campus in Thika, campuses in major towns for convenience.'
    },
    scholarships: [
      { name: 'MKU Scholarship', type: 'Merit', coverage: 'Up to 30%', deadline: 'Upon admission' },
      { name: 'HELB Loan', type: 'Government', coverage: 'Partial', deadline: 'August' },
      { name: 'Work-Study', type: 'Work-based', coverage: 'Partial', deadline: 'Ongoing' }
    ],
    applicationDeadlines: {
      regular: 'Rolling (multiple intakes)',
      main: 'January, May, September'
    },
    fees: {
      range: 'KES 120,000 - 350,000 per year',
      note: 'Flexible payment plans'
    },
    contact: {
      phone: '+254 20 2878000',
      email: 'info@mku.ac.ke',
      address: 'P.O. Box 342-01000, Thika'
    }
  },

  'daystar': {
    id: 'daystar',
    name: 'Daystar University',
    shortName: 'Daystar',
    type: 'private',
    location: 'Athi River, Machakos',
    established: 1974,
    website: 'https://www.daystar.ac.ke',
    admissionsUrl: 'https://admissions.daystar.ac.ke',
    applicationPortal: 'https://portal.daystar.ac.ke',
    logo: '⭐',
    description: 'Christian university known for communication, peace studies, and community development.',
    campusLife: {
      housing: 'Mandatory on-campus living for first years. Beautiful serene campus.',
      clubs: 'Chapel programs, community outreach, media clubs, sports',
      facilities: 'Modern media studios, chapel, library, sports facilities, health center',
      transport: 'Athi River campus, university transport to Nairobi available.'
    },
    scholarships: [
      { name: 'Daystar Scholarship Fund', type: 'Need + Merit', coverage: 'Up to 100%', deadline: 'March' },
      { name: 'Work-Study Program', type: 'Work-based', coverage: 'Partial', deadline: 'Ongoing' },
      { name: 'Church Sponsorships', type: 'Partner churches', coverage: 'Varies', deadline: 'Various' }
    ],
    applicationDeadlines: {
      regular: 'January, May, September intakes',
      earlyApplication: 'Recommended 2 months before'
    },
    fees: {
      range: 'KES 180,000 - 320,000 per year',
      note: 'Includes some campus living costs'
    },
    contact: {
      phone: '+254 45 6622601',
      email: 'admissions@daystar.ac.ke',
      address: 'P.O. Box 44400-00100, Nairobi'
    }
  },

  'riara': {
    id: 'riara',
    name: 'Riara University',
    shortName: 'Riara',
    type: 'private',
    location: 'Mbagathi, Nairobi',
    established: 2012,
    website: 'https://www.riarauniversity.ac.ke',
    admissionsUrl: 'https://www.riarauniversity.ac.ke/admissions',
    applicationPortal: 'https://apply.riarauniversity.ac.ke',
    logo: '⚖️',
    description: 'Boutique university known for quality law and business programs with personalized attention.',
    campusLife: {
      housing: 'Off-campus housing assistance provided.',
      clubs: 'Moot court society, business club, community service groups',
      facilities: 'Modern law library, moot court, computer labs, student lounge',
      transport: 'Mbagathi area, accessible by public transport.'
    },
    scholarships: [
      { name: 'Riara Academic Scholarship', type: 'Merit', coverage: 'Up to 50%', deadline: 'Upon admission' },
      { name: 'HELB Loan', type: 'Government', coverage: 'Partial', deadline: 'August' }
    ],
    applicationDeadlines: {
      regular: 'Rolling admissions',
      main: 'January, May, September'
    },
    fees: {
      range: 'KES 200,000 - 380,000 per year'
    },
    contact: {
      phone: '+254 20 2501162',
      email: 'admissions@riarauniversity.ac.ke',
      address: 'P.O. Box 49940-00100, Nairobi'
    }
  },

  'zetech': {
    id: 'zetech',
    name: 'Zetech University',
    shortName: 'Zetech',
    type: 'private',
    location: 'Ruiru, Kiambu',
    established: 1999,
    website: 'https://www.zetech.ac.ke',
    admissionsUrl: 'https://admissions.zetech.ac.ke',
    applicationPortal: 'https://portal.zetech.ac.ke',
    logo: '💡',
    description: 'Technology-focused university with strong emphasis on practical skills and innovation.',
    campusLife: {
      housing: 'Hostel facilities available.',
      clubs: 'Tech clubs, innovation hub, sports, cultural activities',
      facilities: 'Modern computer labs, innovation center, library, sports ground',
      transport: 'Ruiru town, accessible via Thika Superhighway.'
    },
    scholarships: [
      { name: 'Zetech Scholarship', type: 'Merit', coverage: 'Up to 40%', deadline: 'Upon admission' },
      { name: 'HELB Loan', type: 'Government', coverage: 'Partial', deadline: 'August' }
    ],
    applicationDeadlines: {
      regular: 'Rolling (Jan, May, Sep)',
      diploma: 'More flexible dates'
    },
    fees: {
      range: 'KES 100,000 - 220,000 per year',
      note: 'Affordable with quality education'
    },
    contact: {
      phone: '+254 20 2329104',
      email: 'admissions@zetech.ac.ke',
      address: 'P.O. Box 2768-00200, Nairobi'
    }
  },

  // TVETs AND POLYTECHNICS
  'kmtc': {
    id: 'kmtc',
    name: 'Kenya Medical Training College',
    shortName: 'KMTC',
    type: 'tvet',
    location: 'Multiple Campuses (70+ countrywide)',
    established: 1927,
    website: 'https://www.kmtc.ac.ke',
    admissionsUrl: 'https://www.kmtc.ac.ke/admissions',
    applicationPortal: 'https://portal.kmtc.ac.ke',
    logo: '🏥',
    description: 'Premier medical training institution producing nurses, clinical officers, and allied health professionals.',
    campusLife: {
      housing: 'Hostels at most campuses, especially main Nairobi campus.',
      clubs: 'Health outreach programs, sports, religious groups',
      facilities: 'Simulation labs, clinical attachments at hospitals, libraries',
      transport: 'Campuses in all counties for convenience.'
    },
    scholarships: [
      { name: 'HELB Loan', type: 'Government', coverage: 'Full', deadline: 'August' },
      { name: 'County Government Sponsorship', type: 'County-based', coverage: 'Full/Partial', deadline: 'Varies' },
      { name: 'NGO Health Scholarships', type: 'Various', coverage: 'Full', deadline: 'Various' }
    ],
    applicationDeadlines: {
      regular: 'February-April annually',
      note: 'Single annual intake for most programs'
    },
    fees: {
      range: 'KES 45,000 - 70,000 per year',
      note: 'Government subsidized, very affordable'
    },
    contact: {
      phone: '+254 20 2725711',
      email: 'info@kmtc.ac.ke',
      address: 'P.O. Box 30195-00100, Nairobi'
    }
  },

  'knp': {
    id: 'knp',
    name: 'Kenya National Polytechnic',
    shortName: 'KNP',
    type: 'tvet',
    location: 'Nairobi CBD',
    established: 1961,
    website: 'https://www.knp.ac.ke',
    admissionsUrl: 'https://www.knp.ac.ke/admissions',
    applicationPortal: 'https://portal.knp.ac.ke',
    logo: '🔧',
    description: 'Leading technical institution offering engineering, business, and applied sciences programs.',
    campusLife: {
      housing: 'Limited. Most students commute or find accommodation nearby.',
      clubs: 'Engineering societies, business clubs, sports teams',
      facilities: 'Well-equipped workshops, computer labs, library',
      transport: 'Central Nairobi location, excellent public transport access.'
    },
    scholarships: [
      { name: 'HELB Loan', type: 'Government', coverage: 'Full', deadline: 'August' },
      { name: 'TVET Fund', type: 'Government', coverage: 'Partial', deadline: 'Ongoing' }
    ],
    applicationDeadlines: {
      regular: 'January, May, September',
      note: 'Three intakes per year'
    },
    fees: {
      range: 'KES 35,000 - 55,000 per year',
      note: 'Very affordable government rates'
    },
    contact: {
      phone: '+254 20 2218940',
      email: 'info@knp.ac.ke',
      address: 'P.O. Box 30091-00100, Nairobi'
    }
  },

  'nyeri': {
    id: 'nyeri',
    name: 'Nyeri National Polytechnic',
    shortName: 'NNP',
    type: 'tvet',
    location: 'Nyeri Town',
    established: 1960,
    website: 'https://www.nyeripoly.ac.ke',
    admissionsUrl: 'https://www.nyeripoly.ac.ke/admissions',
    applicationPortal: 'https://portal.nyeripoly.ac.ke',
    logo: '🏭',
    description: 'Established polytechnic in Central Kenya offering technical and business courses.',
    campusLife: {
      housing: 'Hostels available at affordable rates.',
      clubs: 'Technical clubs, sports, religious groups',
      facilities: 'Workshops, labs, library, sports facilities',
      transport: 'Nyeri town, well-connected to surrounding areas.'
    },
    scholarships: [
      { name: 'HELB Loan', type: 'Government', coverage: 'Full', deadline: 'August' },
      { name: 'Nyeri County Bursary', type: 'County', coverage: 'Partial', deadline: 'Varies' }
    ],
    applicationDeadlines: {
      regular: 'January, May, September',
      note: 'Apply 2 months before intake'
    },
    fees: {
      range: 'KES 30,000 - 50,000 per year'
    },
    contact: {
      phone: '+254 61 2030135',
      email: 'info@nyeripoly.ac.ke',
      address: 'P.O. Box 796-10100, Nyeri'
    }
  },

  'kisumu': {
    id: 'kisumu',
    name: 'Kisumu National Polytechnic',
    shortName: 'KsNP',
    type: 'tvet',
    location: 'Kisumu City',
    established: 1949,
    website: 'https://www.kisumupoly.ac.ke',
    admissionsUrl: 'https://www.kisumupoly.ac.ke/admissions',
    applicationPortal: 'https://portal.kisumupoly.ac.ke',
    logo: '🌊',
    description: 'Major polytechnic in Western Kenya with strong technical programs.',
    campusLife: {
      housing: 'Hostel facilities for students.',
      clubs: 'Technical societies, cultural groups, sports',
      facilities: 'Workshops, computer labs, library, health unit',
      transport: 'Kisumu city, accessible by various means.'
    },
    scholarships: [
      { name: 'HELB Loan', type: 'Government', coverage: 'Full', deadline: 'August' },
      { name: 'Kisumu County Bursary', type: 'County', coverage: 'Partial', deadline: 'Varies' }
    ],
    applicationDeadlines: {
      regular: 'January, May, September'
    },
    fees: {
      range: 'KES 32,000 - 52,000 per year'
    },
    contact: {
      phone: '+254 57 2022491',
      email: 'info@kisumupoly.ac.ke',
      address: 'P.O. Box 143-40100, Kisumu'
    }
  },

  'eldoret': {
    id: 'eldoret',
    name: 'Eldoret National Polytechnic',
    shortName: 'ENP',
    type: 'tvet',
    location: 'Eldoret, Uasin Gishu',
    established: 1973,
    website: 'https://www.eldoretpoly.ac.ke',
    admissionsUrl: 'https://www.eldoretpoly.ac.ke/admissions',
    applicationPortal: 'https://portal.eldoretpoly.ac.ke',
    logo: '🏃',
    description: 'Technical polytechnic in the athletics capital, known for engineering and building programs.',
    campusLife: {
      housing: 'Hostel available with cool highland climate.',
      clubs: 'Athletics (strong tradition), technical clubs, cultural',
      facilities: 'Engineering workshops, construction training site, library',
      transport: 'Eldoret town, good public transport network.'
    },
    scholarships: [
      { name: 'HELB Loan', type: 'Government', coverage: 'Full', deadline: 'August' },
      { name: 'Uasin Gishu Bursary', type: 'County', coverage: 'Partial', deadline: 'Varies' }
    ],
    applicationDeadlines: {
      regular: 'January, May, September'
    },
    fees: {
      range: 'KES 30,000 - 48,000 per year'
    },
    contact: {
      phone: '+254 53 2062055',
      email: 'info@eldoretpoly.ac.ke',
      address: 'P.O. Box 4461-30100, Eldoret'
    }
  },

  'mombasa': {
    id: 'mombasa',
    name: 'Mombasa Technical Training Institute',
    shortName: 'MTTI',
    type: 'tvet',
    location: 'Mombasa',
    established: 1950,
    website: 'https://www.mombasatti.ac.ke',
    admissionsUrl: 'https://www.mombasatti.ac.ke/admissions',
    applicationPortal: 'https://portal.mombasatti.ac.ke',
    logo: '⚓',
    description: 'Coastal region\'s premier technical institute with maritime and port-related courses.',
    campusLife: {
      housing: 'Limited hostel facilities.',
      clubs: 'Maritime club, technical societies, cultural groups',
      facilities: 'Marine workshops, engineering labs, computer center',
      transport: 'Mombasa Island, well-connected.'
    },
    scholarships: [
      { name: 'HELB Loan', type: 'Government', coverage: 'Full', deadline: 'August' },
      { name: 'Mombasa County Bursary', type: 'County', coverage: 'Partial', deadline: 'Varies' }
    ],
    applicationDeadlines: {
      regular: 'January, May, September'
    },
    fees: {
      range: 'KES 32,000 - 55,000 per year'
    },
    contact: {
      phone: '+254 41 2315267',
      email: 'info@mombasatti.ac.ke',
      address: 'P.O. Box 90420-80100, Mombasa'
    }
  },

  'kimc': {
    id: 'kimc',
    name: 'Kenya Institute of Mass Communication',
    shortName: 'KIMC',
    type: 'tvet',
    location: 'South B, Nairobi',
    established: 1961,
    website: 'https://www.kimc.ac.ke',
    admissionsUrl: 'https://www.kimc.ac.ke/admissions',
    applicationPortal: 'https://portal.kimc.ac.ke',
    logo: '📺',
    description: 'Premier media training institute producing journalists, filmmakers, and PR professionals.',
    campusLife: {
      housing: 'Limited. Most students find accommodation nearby.',
      clubs: 'Film club, journalism society, photography club',
      facilities: 'TV & radio studios, editing suites, computer labs, library',
      transport: 'South B Nairobi, accessible by public transport.'
    },
    scholarships: [
      { name: 'HELB Loan', type: 'Government', coverage: 'Full', deadline: 'August' },
      { name: 'Media House Sponsorships', type: 'Industry', coverage: 'Varies', deadline: 'Various' }
    ],
    applicationDeadlines: {
      regular: 'January, May, September'
    },
    fees: {
      range: 'KES 40,000 - 65,000 per year'
    },
    contact: {
      phone: '+254 20 2602928',
      email: 'info@kimc.ac.ke',
      address: 'P.O. Box 42422-00100, Nairobi'
    }
  },

  'bukura': {
    id: 'bukura',
    name: 'Bukura Agricultural College',
    shortName: 'BAC',
    type: 'tvet',
    location: 'Kakamega County',
    established: 1926,
    website: 'https://www.bukura.ac.ke',
    admissionsUrl: 'https://www.bukura.ac.ke/admissions',
    applicationPortal: 'https://portal.bukura.ac.ke',
    logo: '🚜',
    description: 'Historic agricultural training college with extensive practical farms.',
    campusLife: {
      housing: 'On-campus hostels in rural, peaceful setting.',
      clubs: 'Agricultural clubs, environmental groups, sports',
      facilities: 'Large training farms, livestock units, food processing labs',
      transport: 'Bukura area, regular transport to Kakamega town.'
    },
    scholarships: [
      { name: 'HELB Loan', type: 'Government', coverage: 'Full', deadline: 'August' },
      { name: 'Agricultural Scholarships', type: 'Various', coverage: 'Full/Partial', deadline: 'Various' }
    ],
    applicationDeadlines: {
      regular: 'January, September'
    },
    fees: {
      range: 'KES 35,000 - 50,000 per year'
    },
    contact: {
      phone: '+254 56 30069',
      email: 'info@bukura.ac.ke',
      address: 'P.O. Box 23-50105, Bukura'
    }
  },

  'ksr': {
    id: 'ksr',
    name: 'Kenya School of Revenue Administration',
    shortName: 'KESRA',
    type: 'tvet',
    location: 'Nairobi',
    established: 2017,
    website: 'https://www.kesra.ac.ke',
    admissionsUrl: 'https://www.kesra.ac.ke/admissions',
    applicationPortal: 'https://portal.kesra.ac.ke',
    logo: '💰',
    description: 'Specialized institution for tax, customs, and revenue administration training.',
    campusLife: {
      housing: 'Day programs mostly. Some residential options for intensive courses.',
      clubs: 'Professional networking, finance clubs',
      facilities: 'Modern classrooms, computer labs, conference facilities',
      transport: 'Nairobi location, accessible.'
    },
    scholarships: [
      { name: 'KRA Sponsorship', type: 'Employer', coverage: 'Full', deadline: 'As advertised' },
      { name: 'HELB Loan', type: 'Government', coverage: 'Partial', deadline: 'August' }
    ],
    applicationDeadlines: {
      regular: 'Rolling for short courses',
      diploma: 'January, May, September'
    },
    fees: {
      range: 'KES 50,000 - 80,000 per year'
    },
    contact: {
      phone: '+254 20 281 7000',
      email: 'info@kesra.ac.ke',
      address: 'P.O. Box 48240-00100, Nairobi'
    }
  },

  'nita': {
    id: 'nita',
    name: 'National Industrial Training Authority',
    shortName: 'NITA',
    type: 'tvet',
    location: 'Industrial Area, Nairobi',
    established: 1960,
    website: 'https://www.nita.go.ke',
    admissionsUrl: 'https://www.nita.go.ke/training',
    applicationPortal: 'https://portal.nita.go.ke',
    logo: '🏗️',
    description: 'Government agency offering industrial attachments and trade testing certification.',
    campusLife: {
      housing: 'Day programs, no residential facilities.',
      clubs: 'Trade-specific groups',
      facilities: 'Industrial workshops, testing centers',
      transport: 'Industrial Area Nairobi, accessible.'
    },
    scholarships: [
      { name: 'NITA Levy Fund', type: 'Industry-funded', coverage: 'Training costs', deadline: 'Ongoing' }
    ],
    applicationDeadlines: {
      tradeTesting: 'Quarterly',
      training: 'Ongoing'
    },
    fees: {
      range: 'KES 5,000 - 20,000 per course',
      note: 'Affordable skill certification'
    },
    contact: {
      phone: '+254 20 559 3750',
      email: 'info@nita.go.ke',
      address: 'P.O. Box 74494-00200, Nairobi'
    }
  }
};

// Get institution by ID
export const getInstitution = (id) => {
  return institutionDatabase[id] || null;
};

// Get all institutions
export const getAllInstitutions = () => {
  return Object.values(institutionDatabase);
};

// Filter institutions by type
export const getInstitutionsByType = (type) => {
  return Object.values(institutionDatabase).filter(inst => inst.type === type);
};

// Search institutions
export const searchInstitutions = (query) => {
  const lowerQuery = query.toLowerCase();
  return Object.values(institutionDatabase).filter(inst => 
    inst.name.toLowerCase().includes(lowerQuery) ||
    inst.shortName.toLowerCase().includes(lowerQuery) ||
    inst.location.toLowerCase().includes(lowerQuery)
  );
};
