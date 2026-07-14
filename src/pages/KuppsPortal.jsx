import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Search, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { DEFAULT_WEIGHTS, calculateCourseEligibility, generatePlacementSummary } from '@/lib/kuccpsEngine';
import { calculateCareerMatches } from '@/components/CareerMatcher';
import { buildKuccpsContext } from '@/lib/careerCategoryMapper';
import AssessmentContext from '../components/kuccps/AssessmentContext';
import WeightAdjuster from '../components/kuccps/WeightAdjuster';
import ClusterBreakdown from '../components/kuccps/ClusterBreakdown';
import PlacementStats from '../components/kuccps/PlacementStats';
import PlacementTable from '../components/kuccps/PlacementTable';

export default function KuppsPortal() {
  const navigate = useNavigate();
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
  const [assessment, setAssessment] = useState(null);
  const [careerMatches, setCareerMatches] = useState([]);
  const [kuccpsContext, setKuccpsContext] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  const isWeightValid = Math.abs(totalWeight - 1) < 0.01;

  useEffect(() => {
    const stored = localStorage.getItem('pathfinder_assessment');
    if (stored) {
      const data = JSON.parse(stored);
      setAssessment(data);
      const matches = calculateCareerMatches(data);
      setCareerMatches(matches);
      const ctx = buildKuccpsContext(data, matches);
      setKuccpsContext(ctx);
    }
  }, []);

  const handleWeightChange = (key, value) => {
    setWeights(prev => ({ ...prev, [key]: value }));
  };

  const runPlacement = () => {
    if (!isWeightValid || !kuccpsContext) return;
    setLoading(true);
    setHasCalculated(false);

    setTimeout(() => {
      const placements = calculateCourseEligibility(
        kuccpsContext.subjects,
        kuccpsContext.preferredCategory,
        weights
      );
      setResults(placements);
      setLoading(false);
      setHasCalculated(true);
    }, 1200);
  };

  const handleSaveInstitution = async (course) => {
    const instId = course.institutions[0];
    if (!instId) return;
    const newSaved = {
      institution_id: instId,
      institution_name: course.name,
      program: course.name,
      career: course.category,
      notes: `Cluster: ${course.cluster_score}/48, Match: ${course.match_score}%`
    };
    try {
      await base44.entities.SavedInstitution.create(newSaved);
    } catch (e) {
      console.log('Save failed');
    }
    const saved = JSON.parse(localStorage.getItem('pathfinder_saved_institutions') || '[]');
    saved.push(newSaved);
    localStorage.setItem('pathfinder_saved_institutions', JSON.stringify(saved));
  };

  const summary = results ? generatePlacementSummary(results) : null;
  const hasAssessment = kuccpsContext && Object.values(kuccpsContext.subjects).filter(v => v).length >= 4;

  return (
    <div className="min-h-screen bg-[#0a0f1e] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#1e3a5f] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#d4a853]" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">KUCCPS Placement Filter</h1>
          <p className="text-slate-400 mt-1 text-sm">
            Assessment pre-filters your career — KUCCPS does the final knockout
          </p>
        </motion.div>

        {/* No Assessment State */}
        {!hasAssessment && (
          <div className="max-w-md mx-auto bg-[#0d1526] border border-[#1e3a5f]/40 rounded-2xl p-8 text-center">
            <Search className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <p className="text-white font-medium text-sm mb-1">No assessment data found</p>
            <p className="text-slate-400 text-xs mb-4">
              Take the career assessment first — your grades and top career matches will auto-fill here.
            </p>
            <button
              onClick={() => navigate(createPageUrl('Assessment'))}
              className="bg-[#d4a853] hover:bg-[#c49843] text-[#0a0f1e] font-semibold px-5 py-2.5 rounded-xl text-sm inline-flex items-center gap-2"
            >
              Take Assessment <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {hasAssessment && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Panel - Context + Weights */}
            <div className="lg:col-span-5 space-y-5">
              <AssessmentContext
                assessment={assessment}
                careerMatches={careerMatches}
                preferredCategory={kuccpsContext.preferredCategory}
              />
              <WeightAdjuster
                weights={weights}
                onChange={handleWeightChange}
                onRun={runPlacement}
                loading={loading}
                totalWeight={totalWeight}
              />
              {kuccpsContext.subjects && <ClusterBreakdown subjects={kuccpsContext.subjects} />}
            </div>

            {/* Right Panel - Results */}
            <div className="lg:col-span-7">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#d4a853]/10 border border-[#d4a853]/20 flex items-center justify-center">
                    <Loader2 className="w-7 h-7 text-[#d4a853] animate-spin" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-medium text-sm">Running KUCCPS knockout...</p>
                    <p className="text-slate-400 text-xs mt-1">Filtering courses by cluster points</p>
                  </div>
                </div>
              ) : hasCalculated && results && summary ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <PlacementStats summary={summary} topPlacements={results} />
                  <PlacementTable placements={results} onSaveInstitution={handleSaveInstitution} />
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4 bg-[#0d1526] border border-[#1e3a5f]/30 rounded-2xl">
                  <div className="w-14 h-14 rounded-2xl bg-[#1e3a5f]/20 border border-[#1e3a5f]/40 flex items-center justify-center">
                    <ShieldCheck className="w-7 h-7 text-[#d4a853]" />
                  </div>
                  <div className="text-center">
                    <p className="text-slate-300 font-medium text-sm">Ready to filter</p>
                    <p className="text-slate-500 text-xs mt-1 max-w-xs">
                      Your assessment data is loaded. Set placement weights and click Run to see eligible courses.
                    </p>
                  </div>
                  <button
                    onClick={runPlacement}
                    disabled={!isWeightValid}
                    className="bg-[#d4a853] hover:bg-[#c49843] disabled:opacity-40 text-[#0a0f1e] font-semibold px-6 py-2.5 rounded-xl text-sm"
                  >
                    Run KUCCPS Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
