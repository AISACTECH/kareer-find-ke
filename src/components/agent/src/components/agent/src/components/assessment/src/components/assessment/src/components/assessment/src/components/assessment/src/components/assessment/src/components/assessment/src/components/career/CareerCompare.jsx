import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Plus, ArrowLeftRight, GraduationCap, TrendingUp, 
  AlertCircle, CheckCircle, Building2, DollarSign, Clock,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const careerData = {
  software_developer: {
    title: 'Software Developer',
    icon: '💻',
    field: 'Technology',
    salaryRange: 'KES 80,000 - 350,000/month',
    growthRate: 'Very High',
    jobAvailability: 85,
    workLifeBalance: 70,
    educationYears: '4 years',
    requirements: ['Mathematics B+', 'Computer Studies', 'Problem-solving skills'],
    pros: ['High demand', 'Remote work options', 'Good salary', 'Creative problem solving', 'Continuous learning'],
    cons: ['Long screen hours', 'Tight deadlines', 'Rapid tech changes', 'Can be sedentary'],
    dailyTasks: ['Writing code', 'Debugging', 'Team meetings', 'Code reviews', 'Learning new tech'],
    topEmployers: ['Safaricom', 'Equity Bank', 'Andela', 'Microsoft', 'Google']
  },
  doctor: {
    title: 'Medical Doctor',
    icon: '🩺',
    field: 'Healthcare',
    salaryRange: 'KES 150,000 - 500,000/month',
    growthRate: 'High',
    jobAvailability: 75,
    workLifeBalance: 40,
    educationYears: '6+ years',
    requirements: ['Biology A', 'Chemistry A', 'Mathematics B+', 'English B+'],
    pros: ['Saves lives', 'Respected profession', 'Job security', 'Good income', 'Meaningful work'],
    cons: ['Long study period', 'Stressful', 'Long hours', 'Emotional toll', 'High responsibility'],
    dailyTasks: ['Patient consultations', 'Diagnoses', 'Surgeries/Procedures', 'Documentation', 'Continuous education'],
    topEmployers: ['KNH', 'Aga Khan', 'Nairobi Hospital', 'County Hospitals', 'Private Practice']
  },
  accountant: {
    title: 'Certified Accountant',
    icon: '📊',
    field: 'Finance',
    salaryRange: 'KES 60,000 - 250,000/month',
    growthRate: 'Moderate',
    jobAvailability: 70,
    workLifeBalance: 65,
    educationYears: '4 years + CPA',
    requirements: ['Mathematics B', 'Business Studies', 'Attention to detail'],
    pros: ['Stable career', 'Clear progression', 'Work in any industry', 'Good salary', 'Respected'],
    cons: ['Can be repetitive', 'Busy tax seasons', 'Requires certification', 'Desk job'],
    dailyTasks: ['Financial reporting', 'Auditing', 'Tax preparation', 'Budget analysis', 'Compliance'],
    topEmployers: ['Big 4 Firms', 'Banks', 'KRA', 'NGOs', 'Corporations']
  },
  mechanical_engineer: {
    title: 'Mechanical Engineer',
    icon: '⚙️',
    field: 'Engineering',
    salaryRange: 'KES 70,000 - 280,000/month',
    growthRate: 'Moderate',
    jobAvailability: 60,
    workLifeBalance: 60,
    educationYears: '5 years',
    requirements: ['Mathematics A-', 'Physics A-', 'Chemistry B+'],
    pros: ['Hands-on work', 'Problem solving', 'Variety of industries', 'Good salary', 'Innovation'],
    cons: ['Site work conditions', 'Licensing required', 'Project pressure', 'Physical demands'],
    dailyTasks: ['Design work', 'Project management', 'Testing', 'Site visits', 'Documentation'],
    topEmployers: ['KenGen', 'KETRACO', 'Manufacturing firms', 'Construction', 'Consultancies']
  },
  lawyer: {
    title: 'Advocate / Lawyer',
    icon: '⚖️',
    field: 'Law',
    salaryRange: 'KES 80,000 - 400,000/month',
    growthRate: 'Moderate',
    jobAvailability: 55,
    workLifeBalance: 45,
    educationYears: '5 years + KSL',
    requirements: ['English A-', 'History/CRE B+', 'Strong communication'],
    pros: ['Prestigious', 'Fight for justice', 'Intellectual challenge', 'Private practice option', 'Networking'],
    cons: ['Long hours', 'Competitive', 'Stressful cases', 'Continuous study', 'Expensive education'],
    dailyTasks: ['Court appearances', 'Client meetings', 'Legal research', 'Document drafting', 'Negotiations'],
    topEmployers: ['Law firms', 'Judiciary', 'Corporates', 'Government', 'NGOs']
  },
  nurse: {
    title: 'Registered Nurse',
    icon: '👩‍⚕️',
    field: 'Healthcare',
    salaryRange: 'KES 45,000 - 150,000/month',
    growthRate: 'High',
    jobAvailability: 80,
    workLifeBalance: 50,
    educationYears: '3-4 years',
    requirements: ['Biology B', 'Chemistry C+', 'Caring personality'],
    pros: ['High demand', 'Meaningful work', 'Job security', 'International opportunities', 'Helping others'],
    cons: ['Shift work', 'Emotionally demanding', 'Physical strain', 'Understaffed facilities'],
    dailyTasks: ['Patient care', 'Medication administration', 'Monitoring vitals', 'Documentation', 'Patient education'],
    topEmployers: ['Public hospitals', 'Private hospitals', 'Clinics', 'NGOs', 'International organizations']
  },
  teacher: {
    title: 'Secondary Teacher',
    icon: '📚',
    field: 'Education',
    salaryRange: 'KES 35,000 - 120,000/month',
    growthRate: 'Stable',
    jobAvailability: 65,
    workLifeBalance: 70,
    educationYears: '4 years',
    requirements: ['English C+', 'Teaching subjects B+', 'Patience'],
    pros: ['School holidays', 'Shaping future', 'Job security (TSC)', 'Respect', 'Regular hours'],
    cons: ['Large classes', 'Low starting salary', 'Marking workload', 'Limited resources'],
    dailyTasks: ['Teaching', 'Lesson planning', 'Marking', 'Student counseling', 'Extracurricular activities'],
    topEmployers: ['TSC', 'Private schools', 'International schools', 'Tutoring centers']
  },
  entrepreneur: {
    title: 'Entrepreneur',
    icon: '🚀',
    field: 'Business',
    salaryRange: 'Variable (KES 0 - Unlimited)',
    growthRate: 'Variable',
    jobAvailability: 100,
    workLifeBalance: 35,
    educationYears: 'Variable',
    requirements: ['Business acumen', 'Risk tolerance', 'Resilience', 'Creativity'],
    pros: ['Be your own boss', 'Unlimited potential', 'Flexibility', 'Create jobs', 'Follow passion'],
    cons: ['Financial risk', 'No guaranteed income', 'Long hours', 'High stress', 'Many failures'],
    dailyTasks: ['Business development', 'Networking', 'Problem solving', 'Team management', 'Sales'],
    topEmployers: ['Self-employed', 'Startups', 'Family business']
  },
  civil_engineer: {
    title: 'Civil Engineer',
    icon: '🏗️',
    field: 'Engineering',
    salaryRange: 'KES 80,000 - 300,000/month',
    growthRate: 'Moderate',
    jobAvailability: 60,
    workLifeBalance: 55,
    educationYears: '5 years',
    requirements: ['Mathematics A-', 'Physics B+', 'Chemistry B'],
    pros: ['Build infrastructure', 'Good salary', 'Project variety', 'Problem solving', 'Outdoor work'],
    cons: ['Site conditions', 'Licensing required', 'Project deadlines', 'Regulatory compliance'],
    dailyTasks: ['Site supervision', 'Design review', 'Project planning', 'Client meetings', 'Documentation'],
    topEmployers: ['KeNHA', 'County governments', 'Construction firms', 'Consultancies', 'Real estate']
  },
  agronomist: {
    title: 'Agricultural Scientist',
    icon: '🌾',
    field: 'Agriculture',
    salaryRange: 'KES 50,000 - 180,000/month',
    growthRate: 'Moderate',
    jobAvailability: 55,
    workLifeBalance: 65,
    educationYears: '4 years',
    requirements: ['Biology B', 'Chemistry C+', 'Agriculture B'],
    pros: ['Food security impact', 'Outdoor work', 'Research opportunities', 'Rural development'],
    cons: ['Weather dependent', 'Rural postings', 'Seasonal work', 'Infrastructure challenges'],
    dailyTasks: ['Field research', 'Soil analysis', 'Farmer training', 'Crop monitoring', 'Report writing'],
    topEmployers: ['KALRO', 'NGOs', 'Agribusiness firms', 'County governments', 'Universities']
  },
  journalist: {
    title: 'Journalist',
    icon: '📰',
    field: 'Media',
    salaryRange: 'KES 40,000 - 200,000/month',
    growthRate: 'Moderate',
    jobAvailability: 50,
    workLifeBalance: 45,
    educationYears: '4 years',
    requirements: ['English B', 'Kiswahili C+', 'Communication skills'],
    pros: ['Public impact', 'Variety', 'Meet interesting people', 'Creative expression', 'Travel'],
    cons: ['Deadline pressure', 'Job insecurity', 'Low starting pay', 'Safety risks'],
    dailyTasks: ['Research', 'Interviews', 'Writing/editing', 'Broadcasting', 'Social media'],
    topEmployers: ['Nation Media', 'Standard Group', 'Citizen TV', 'BBC', 'Freelance']
  },
  graphic_designer: {
    title: 'Graphic Designer',
    icon: '🎨',
    field: 'Creative Arts',
    salaryRange: 'KES 40,000 - 180,000/month',
    growthRate: 'High',
    jobAvailability: 70,
    workLifeBalance: 65,
    educationYears: '3-4 years',
    requirements: ['English C+', 'Art/Design appreciation', 'Creativity'],
    pros: ['Creative freedom', 'Freelance options', 'Growing demand', 'Remote work', 'Portfolio building'],
    cons: ['Competitive', 'Client revisions', 'Software costs', 'Deadline pressure'],
    dailyTasks: ['Design creation', 'Client meetings', 'Revisions', 'Brand development', 'Software skills'],
    topEmployers: ['Agencies', 'Tech companies', 'Media houses', 'Freelance', 'Marketing firms']
  }
};

export default function CareerCompare({ 
  isOpen, 
  onClose, 
  initialCareers = [],
  availableCareers = Object.keys(careerData)
}) {
  const [selectedCareers, setSelectedCareers] = useState(initialCareers.slice(0, 3));
  const [showSelector, setShowSelector] = useState(false);
  const [expandedSection, setExpandedSection] = useState('overview');

  const addCareer = (careerId) => {
    if (selectedCareers.length < 3 && !selectedCareers.includes(careerId)) {
      setSelectedCareers([...selectedCareers, careerId]);
    }
    setShowSelector(false);
  };

  const removeCareer = (careerId) => {
    setSelectedCareers(selectedCareers.filter(c => c !== careerId));
  };

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'requirements', label: 'Requirements' },
    { id: 'proscons', label: 'Pros & Cons' },
    { id: 'daily', label: 'Daily Life' },
    { id: 'employers', label: 'Employers' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#1e3a5f]">
            <ArrowLeftRight className="w-5 h-5" />
            Compare Careers
          </DialogTitle>
        </DialogHeader>

        {/* Career Selection */}
        <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
          {selectedCareers.map(careerId => {
            const career = careerData[careerId];
            return (
              <div 
                key={careerId}
                className="flex items-center gap-2 px-3 py-2 bg-[#1e3a5f]/10 rounded-lg flex-shrink-0"
              >
                <span className="text-xl">{career.icon}</span>
                <span className="font-medium text-[#1e3a5f]">{career.title}</span>
                <button 
                  onClick={() => removeCareer(careerId)}
                  className="ml-1 text-gray-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
          
          {selectedCareers.length < 3 && (
            <Button
              variant="outline"
              onClick={() => setShowSelector(true)}
              className="flex-shrink-0 gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Career ({3 - selectedCareers.length} left)
            </Button>
          )}
        </div>

        {/* Career Selector Dropdown */}
        <AnimatePresence>
          {showSelector && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-32 left-4 right-4 z-10 bg-white rounded-xl shadow-xl border p-4 max-h-60 overflow-y-auto"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {availableCareers.filter(c => !selectedCareers.includes(c)).map(careerId => {
                  const career = careerData[careerId];
                  if (!career) return null;
                  return (
                    <button
                      key={careerId}
                      onClick={() => addCareer(careerId)}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 text-left"
                    >
                      <span className="text-xl">{career.icon}</span>
                      <span className="text-sm font-medium">{career.title}</span>
                    </button>
                  );
                })}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSelector(false)}
                className="mt-2 w-full"
              >
                Cancel
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Tabs */}
        <div className="flex gap-1 border-b overflow-x-auto">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setExpandedSection(section.id)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                expandedSection === section.id
                  ? 'text-[#1e3a5f] border-b-2 border-[#d4a853]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Comparison Content */}
        <div className="flex-1 overflow-y-auto mt-4">
          {selectedCareers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ArrowLeftRight className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>Select careers to compare</p>
            </div>
          ) : (
            <div className={`grid gap-4 ${
              selectedCareers.length === 1 ? 'grid-cols-1' :
              selectedCareers.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
            }`}>
              {selectedCareers.map(careerId => {
                const career = careerData[careerId];
                if (!career) return null;

                return (
                  <Card key={careerId} className="border-t-4 border-t-[#d4a853]">
                    <CardContent className="p-4">
                      {/* Header */}
                      <div className="text-center mb-4">
                        <span className="text-4xl">{career.icon}</span>
                        <h3 className="font-bold text-[#1e3a5f] mt-2">{career.title}</h3>
                        <Badge variant="secondary">{career.field}</Badge>
                      </div>

                      {/* Overview Section */}
                      {expandedSection === 'overview' && (
                        <div className="space-y-3">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                              <DollarSign className="w-4 h-4" />
                              Salary Range
                            </div>
                            <p className="font-medium text-[#1e3a5f]">{career.salaryRange}</p>
                          </div>
                          
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                              <TrendingUp className="w-4 h-4" />
                              Growth Rate
                            </div>
                            <p className="font-medium text-[#1e3a5f]">{career.growthRate}</p>
                          </div>

                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                              <Clock className="w-4 h-4" />
                              Education Duration
                            </div>
                            <p className="font-medium text-[#1e3a5f]">{career.educationYears}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-600 mb-2">Job Availability</p>
                            <Progress value={career.jobAvailability} className="h-2" />
                            <p className="text-xs text-right text-gray-500 mt-1">{career.jobAvailability}%</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-600 mb-2">Work-Life Balance</p>
                            <Progress value={career.workLifeBalance} className="h-2" />
                            <p className="text-xs text-right text-gray-500 mt-1">{career.workLifeBalance}%</p>
                          </div>
                        </div>
                      )}

                      {/* Requirements Section */}
                      {expandedSection === 'requirements' && (
                        <div className="space-y-2">
                          {career.requirements.map((req, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                              <GraduationCap className="w-4 h-4 text-blue-600" />
                              <span className="text-sm text-blue-800">{req}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Pros & Cons Section */}
                      {expandedSection === 'proscons' && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-emerald-700 mb-2 flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" /> Pros
                            </h4>
                            <ul className="space-y-1">
                              {career.pros.map((pro, idx) => (
                                <li key={idx} className="text-xs text-emerald-700 flex items-start gap-1">
                                  <span className="mt-1">✓</span> {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" /> Cons
                            </h4>
                            <ul className="space-y-1">
                              {career.cons.map((con, idx) => (
                                <li key={idx} className="text-xs text-red-700 flex items-start gap-1">
                                  <span className="mt-1">✗</span> {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Daily Life Section */}
                      {expandedSection === 'daily' && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Typical Daily Tasks</h4>
                          {career.dailyTasks.map((task, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                              <span className="w-6 h-6 rounded-full bg-[#d4a853]/20 text-[#d4a853] text-xs flex items-center justify-center font-medium">
                                {idx + 1}
                              </span>
                              <span className="text-sm text-gray-700">{task}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Employers Section */}
                      {expandedSection === 'employers' && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <Building2 className="w-4 h-4" /> Top Employers
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {career.topEmployers.map((employer, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {employer}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
