import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  RefreshCw, Download, Share2, ArrowLeft, 
  Printer, AlertCircle, Loader2, Bookmark, CheckCircle,
  ArrowLeftRight, Quote, Clock, Play, Layers, Building2, ShieldCheck, ArrowRight
} from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createPageUrl } from "@/utils";
import { base44 } from '@/api/base44Client';

import ResultsSummary from '../components/results/ResultsSummary';
import CareerMatchCard from '../components/results/CareerMatchCard';
import AstrologyInsight from '../components/results/AstrologyInsight';
import InstitutionModal from '../components/results/InstitutionModal';
import CareerCompare from '../components/career/CareerCompare';
import ProfessionalTestimonials from '../components/career/ProfessionalTestimonials';
import DayInLifeSimulation from '../components/career/DayInLifeSimulation';
import ClusterExplorer from '../components/career/ClusterExplorer';
import InstitutionFinder from '../components/institutions/InstitutionFinder';
import { mapPersonalityToRIASEC } from '../components/data/CareerClusters';
import { calculateCareerMatches, generateAssessmentSummary } from '../components/CareerMatcher';

// Sample assessment data for demo purposes
const sampleAssessment = {
  student_name: 'Sample Student',
  academic_data: {
    examType: 'kcse',
    meanGrade: 'B',
    subjects: {
      mathematics: 'B+',
      english: 'B',
      physics: 'B',
      chemistry: 'B-',
      biology: 'C+',
      kiswahili: 'B-',
      computer: 'A-'
    }
  },
  hobbies_background: {
    selectedHobbies: ['coding', 'fixing', 'reading', 'business'],
    background: {
      location: 'Urban/City',
      computerAccess: 'Yes, at home',
      familyBusiness: 'No family business'
    }
  },
  personality_scores: {
    axes: {
      practical_theoretical: 65,
      people_task: 55,
      structured_flexible: 40,
      risk_stable: 45
    }
  },
  interest_ratings: {
    ratings: {
      technology: 'love',
      business: 'love',
      engineering: 'neutral',
      health: 'neutral',
      creative: 'neutral',
      education: 'avoid',
      agriculture: 'avoid',
      public_service: 'neutral',
      hospitality: 'avoid'
    }
  },
  astrology_data: {
    birthDate: '1998-08-15',
    zodiacSign: 'Leo'
  }
};

export default function Results() {
  const [assessment, setAssessment] = useState(null);
  const [careerMatches, setCareerMatches] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [usingSample, setUsingSample] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [savedInstitutions, setSavedInstitutions] = useState([]);
  const [saveNotification, setSaveNotification] = useState(null);
  
  // Career exploration modals
  const [showCompare, setShowCompare] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [showDayInLife, setShowDayInLife] = useState(false);
  const [showClusters, setShowClusters] = useState(false);
  const [showInstitutionFinder, setShowInstitutionFinder] = useState(false);
  const [selectedCareerForExplore, setSelectedCareerForExplore] = useState(null);
  
  // Calculate user's RIASEC types
  const userRiasec = assessment?.personality_scores ? mapPersonalityToRIASEC(assessment.personality_scores) : [];

  useEffect(() => {
    loadAssessment();
    loadSavedInstitutions();
  }, []);

  const loadSavedInstitutions = () => {
    const saved = localStorage.getItem('pathfinder_saved_institutions');
    if (saved) {
      setSavedInstitutions(JSON.parse(saved));
    }
  };

  const handleViewInstitution = (institutionId, program) => {
    setSelectedInstitution(institutionId);
    setSelectedProgram(program);
  };

  const handleSaveInstitution = async (institutionId, institutionName, program, career) => {
    // Check if already saved
    if (savedInstitutions.some(s => s.institution_id === institutionId)) {
      setSaveNotification({ type: 'info', message: 'Already saved!' });
      setTimeout(() => setSaveNotification(null), 2000);
      return;
    }

    const newSaved = {
      institution_id: institutionId,
      institution_name: institutionName,
      program: program,
      career: career,
      notes: ''
    };

    const updated = [...savedInstitutions, newSaved];
    setSavedInstitutions(updated);
    localStorage.setItem('pathfinder_saved_institutions', JSON.stringify(updated));

    // Try to save to database
    try {
      await base44.entities.SavedInstitution.create(newSaved);
    } catch (error) {
      console.log('Offline - saved locally');
    }

    setSaveNotification({ type: 'success', message: `${institutionName} saved!` });
    setTimeout(() => setSaveNotification(null), 2000);
  };

  const handleSaveFromModal = (institution, program, notes) => {
    const newSaved = {
      institution_id: institution.id,
      institution_name: institution.name,
      program: program,
      career: '',
      notes: notes
    };

    const updated = [...savedInstitutions, newSaved];
    setSavedInstitutions(updated);
    localStorage.setItem('pathfinder_saved_institutions', JSON.stringify(updated));

    // Try to save to database
    try {
      base44.entities.SavedInstitution.create(newSaved);
    } catch (error) {
      console.log('Offline - saved locally');
    }
  };

  const handleRemoveFromModal = async (institutionId) => {
    const updated = savedInstitutions.filter(s => s.institution_id !== institutionId);
    setSavedInstitutions(updated);
    localStorage.setItem('pathfinder_saved_institutions', JSON.stringify(updated));

    try {
      const toDelete = savedInstitutions.find(s => s.institution_id === institutionId);
      if (toDelete?.id) {
        await base44.entities.SavedInstitution.delete(toDelete.id);
      }
    } catch (error) {
      console.log('Offline - removed locally');
    }
  };

  const loadAssessment = () => {
    setIsLoading(true);
    
    // Try to load from local storage first
    const stored = localStorage.getItem('pathfinder_assessment');
    
    if (stored) {
      const data = JSON.parse(stored);
      setAssessment(data);
      const matches = calculateCareerMatches(data);
      setCareerMatches(matches);
      setSummary(generateAssessmentSummary(data));
      setUsingSample(false);
    } else {
      // Use sample data for demo
      setAssessment(sampleAssessment);
      const matches = calculateCareerMatches(sampleAssessment);
      setCareerMatches(matches);
      setSummary(generateAssessmentSummary(sampleAssessment));
      setUsingSample(true);
    }
    
    setIsLoading(false);
    setExpandedCard(0); // Expand first card by default
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My PathFinder KE Career Results',
          text: `I took the PathFinder KE career assessment! My top match is ${careerMatches[0]?.title} at ${careerMatches[0]?.matchScore}%`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#1e3a5f] mx-auto mb-4" />
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] py-8 px-4 print:bg-white print:py-0">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 print:hidden">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="flex gap-2">
            <Link to={createPageUrl('Assessment')}>
              <Button variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Retake
              </Button>
            </Link>
            <Button variant="outline" onClick={handlePrint} className="gap-2">
              <Printer className="w-4 h-4" />
              Print
            </Button>
            {navigator.share && (
              <Button variant="outline" onClick={handleShare} className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            )}
          </div>
        </div>

        {/* Save Notification */}
        {saveNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 ${
              saveNotification.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            {saveNotification.message}
          </motion.div>
        )}

        {/* Saved Institutions Quick Access */}
        {savedInstitutions.length > 0 && (
          <Card className="mb-6 border border-[#d4a853]/20 shadow-md bg-[#0d1526] print:hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bookmark className="w-5 h-5 text-[#d4a853]" />
                  <span className="font-medium text-white">
                    {savedInstitutions.length} institution{savedInstitutions.length !== 1 ? 's' : ''} saved
                  </span>
                </div>
                <Link to={createPageUrl('SavedInstitutions')}>
                  <Button variant="outline" size="sm" className="gap-2">
                    View Saved
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sample Data Notice */}
        {usingSample && (
          <Alert className="mb-6 border-amber-200 bg-amber-50 print:hidden">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Demo Mode:</strong> These are sample results. 
              <Link to={createPageUrl('Assessment')} className="underline ml-1 font-medium">
                Take the assessment
              </Link> to get your personalized career matches.
            </AlertDescription>
          </Alert>
        )}

        {/* Results Summary */}
        {summary && (
          <ResultsSummary 
            studentName={assessment?.student_name || 'Student'} 
            assessmentSummary={summary}
          />
        )}

        {/* Career Exploration Tools */}
        <Card className="mb-6 border border-[#1e3a5f]/30 bg-[#0d1526] shadow-md print:hidden">
          <CardContent className="p-4">
            <h3 className="font-semibold text-white mb-3">🔍 Explore Careers</h3>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => setShowCompare(true)}
                className="gap-2"
              >
                <ArrowLeftRight className="w-4 h-4" />
                Compare Careers
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowTestimonials(true)}
                className="gap-2"
              >
                <Quote className="w-4 h-4" />
                Professional Insights
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDayInLife(true)}
                className="gap-2"
              >
                <Clock className="w-4 h-4" />
                Day in the Life Quiz
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowClusters(true)}
                className="gap-2"
              >
                <Layers className="w-4 h-4" />
                Career Clusters (20)
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowInstitutionFinder(true)}
                className="gap-2"
              >
                <Building2 className="w-4 h-4" />
                Find Institutions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* KUCCPS Filter CTA */}
        {!usingSample && careerMatches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="border border-[#d4a853]/30 bg-gradient-to-r from-[#0d1526] to-[#1e3a5f]/30 shadow-lg overflow-hidden">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#d4a853]/20 border border-[#d4a853]/30 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-6 h-6 text-[#d4a853]" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-white text-base">Final Step: KUCCPS Placement Filter</h3>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Your top career is <strong className="text-[#d4a853]">{careerMatches[0]?.title}</strong>. 
                      Now filter eligible courses and institutions by cluster points.
                    </p>
                  </div>
                  <Link to={createPageUrl('KuppsPortal')}>
                    <Button className="bg-[#d4a853] hover:bg-[#c49843] text-[#0a0f1e] font-semibold gap-2 whitespace-nowrap">
                      Run KUCCPS Filter
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Career Matches */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Your Career Matches
          </h2>
          <p className="text-slate-400 mb-6">
            Based on your assessment, here are the careers that best match your profile. 
            Click each card to see detailed information.
          </p>

          <div className="space-y-4">
            {careerMatches.slice(0, 8).map((career, index) => (
              <CareerMatchCard
                key={career.id}
                career={career}
                rank={index + 1}
                isExpanded={expandedCard === index}
                onToggle={() => setExpandedCard(expandedCard === index ? null : index)}
                onViewInstitution={handleViewInstitution}
                savedInstitutions={savedInstitutions}
                onSaveInstitution={handleSaveInstitution}
              />
            ))}
          </div>
        </div>

        {/* Astrology Insight */}
        {assessment?.astrology_data?.zodiacSign && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Astrology Insight
            </h2>
            <AstrologyInsight zodiacSign={assessment.astrology_data.zodiacSign} />
          </div>
        )}

        {/* Parent Summary */}
        <Card className="border border-[#1e3a5f]/30 bg-[#0d1526] shadow-lg mb-8 print:shadow-none print:border">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              👨‍👩‍👧 Parent-Friendly Summary
            </h2>
            <div className="prose prose-sm max-w-none text-slate-300">
              <p className="mb-4">
                <strong>{assessment?.student_name || 'Your child'}</strong> has completed a comprehensive 
                career assessment that analyzed academic performance, personality traits, interests, 
                and hobbies.
              </p>
              
              {careerMatches[0] && (
                <p className="mb-4">
                  The top career recommendation is <strong>{careerMatches[0].title}</strong> with a 
                  {' '}<strong>{careerMatches[0].matchScore}% match</strong>. This is based primarily on 
                  academic abilities (40% weight), career interests (25%), personality fit (20%), 
                  hobbies (10%), and work style preferences (5%).
                </p>
              )}

              <p className="mb-4">
                <strong>Key Strengths Identified:</strong> {summary?.strengths?.join(', ') || 'Determination, Curiosity'}
              </p>

              <p className="mb-4">
                <strong>Recommended Next Steps:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Discuss these results together as a family</li>
                <li>Research the top 2-3 career options in more detail</li>
                <li>Visit recommended universities or TVET institutions</li>
                <li>Connect with professionals in these fields if possible</li>
                <li>Consider work attachment or volunteer opportunities</li>
              </ol>

              <div className="mt-6 p-4 rounded-xl bg-emerald-900/20 border border-emerald-700/30">
                <p className="text-emerald-400 text-sm">
                  <strong>Note:</strong> These recommendations are based on a comprehensive assessment 
                  but should be used as guidance alongside other factors such as family circumstances, 
                  available opportunities, and personal aspirations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center py-8 print:hidden">
          <p className="text-slate-400 mb-4">
            Not satisfied with your results? You can always retake the assessment.
          </p>
          <Link to={createPageUrl('Assessment')}>
            <Button className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white">
              Take Assessment Again
            </Button>
          </Link>
        </div>

        {/* Print Footer */}
        <div className="hidden print:block text-center py-4 border-t mt-8">
          <p className="text-sm text-gray-500">
            Generated by PathFinder KE — Your Trusted Career Mentor
          </p>
          <p className="text-xs text-gray-400 mt-1">
            pathfinder.ke | {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Institution Modal */}
      <InstitutionModal
        isOpen={!!selectedInstitution}
        onClose={() => setSelectedInstitution(null)}
        institutionId={selectedInstitution}
        program={selectedProgram}
        isSaved={savedInstitutions.some(s => s.institution_id === selectedInstitution)}
        onSave={handleSaveFromModal}
        onRemove={handleRemoveFromModal}
      />

      {/* Career Compare Modal */}
      <CareerCompare
        isOpen={showCompare}
        onClose={() => setShowCompare(false)}
        initialCareers={careerMatches.slice(0, 2).map(c => c.id)}
        availableCareers={careerMatches.map(c => c.id)}
      />

      {/* Professional Testimonials Modal */}
      <ProfessionalTestimonials
        isOpen={showTestimonials}
        onClose={() => setShowTestimonials(false)}
        careerId={careerMatches[0]?.id}
      />

      {/* Day in Life Simulation Modal */}
      <DayInLifeSimulation
        isOpen={showDayInLife}
        onClose={() => setShowDayInLife(false)}
        careerId={careerMatches[0]?.id === 'software_developer' ? 'software_developer' : 
                  careerMatches[0]?.id === 'doctor' ? 'doctor' : 
                  careerMatches[0]?.id === 'entrepreneur' ? 'entrepreneur' : 'software_developer'}
      />

      {/* Career Clusters Explorer */}
      <ClusterExplorer
        isOpen={showClusters}
        onClose={() => setShowClusters(false)}
        userRiasec={userRiasec}
      />

      {/* Institution Finder */}
      <InstitutionFinder
        isOpen={showInstitutionFinder}
        onClose={() => setShowInstitutionFinder(false)}
        savedInstitutions={savedInstitutions}
        onSaveInstitution={handleSaveInstitution}
        onViewDetails={(id) => {
          setShowInstitutionFinder(false);
          handleViewInstitution(id, '');
        }}
      />
    </div>
  );
}
