import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Star, Info } from 'lucide-react';

const zodiacCareerInsights = {
  'Aries': {
    environment: 'Fast-paced, competitive environments',
    strengths: 'Leadership, initiative, pioneering roles',
    avoid: 'Routine desk jobs with little autonomy',
    careers: ['Entrepreneur', 'Sales Manager', 'Emergency Services', 'Sports Coach']
  },
  'Taurus': {
    environment: 'Stable, well-structured workplaces',
    strengths: 'Patience, reliability, attention to detail',
    avoid: 'High-risk, unstable ventures',
    careers: ['Accountant', 'Banker', 'Agricultural Manager', 'Chef']
  },
  'Gemini': {
    environment: 'Dynamic, social environments',
    strengths: 'Communication, versatility, networking',
    avoid: 'Isolated, repetitive tasks',
    careers: ['Journalist', 'Marketing', 'Teacher', 'Sales Representative']
  },
  'Cancer': {
    environment: 'Supportive, family-oriented workplaces',
    strengths: 'Nurturing, intuition, emotional intelligence',
    avoid: 'Cold, impersonal corporate environments',
    careers: ['Nurse', 'Social Worker', 'Teacher', 'Hotel Manager']
  },
  'Leo': {
    environment: 'Visible roles with recognition opportunities',
    strengths: 'Leadership, creativity, public presence',
    avoid: 'Behind-the-scenes, anonymous work',
    careers: ['Manager', 'Entertainer', 'PR Specialist', 'Entrepreneur']
  },
  'Virgo': {
    environment: 'Organized, detail-oriented settings',
    strengths: 'Analysis, precision, problem-solving',
    avoid: 'Chaotic, unstructured environments',
    careers: ['Data Analyst', 'Doctor', 'Editor', 'Quality Assurance']
  },
  'Libra': {
    environment: 'Collaborative, harmonious teams',
    strengths: 'Diplomacy, fairness, aesthetics',
    avoid: 'Conflict-heavy, solitary roles',
    careers: ['Lawyer', 'HR Manager', 'Designer', 'Diplomat']
  },
  'Scorpio': {
    environment: 'Research-intensive, investigative settings',
    strengths: 'Deep focus, research, transformation',
    avoid: 'Superficial, shallow work',
    careers: ['Researcher', 'Detective', 'Surgeon', 'Psychologist']
  },
  'Sagittarius': {
    environment: 'Travel, learning, diverse experiences',
    strengths: 'Vision, optimism, cultural awareness',
    avoid: 'Confined, routine-bound positions',
    careers: ['Tour Guide', 'Lecturer', 'Import/Export', 'Pilot']
  },
  'Capricorn': {
    environment: 'Hierarchical, goal-oriented organizations',
    strengths: 'Ambition, discipline, management',
    avoid: 'Unstructured, chaotic startups',
    careers: ['CEO', 'Engineer', 'Accountant', 'Government Official']
  },
  'Aquarius': {
    environment: 'Innovative, forward-thinking organizations',
    strengths: 'Innovation, independence, humanitarian',
    avoid: 'Traditional, rigid corporate structures',
    careers: ['Tech Developer', 'NGO Worker', 'Scientist', 'Social Entrepreneur']
  },
  'Pisces': {
    environment: 'Creative, empathetic workplaces',
    strengths: 'Creativity, intuition, compassion',
    avoid: 'Harsh, competitive environments',
    careers: ['Artist', 'Counselor', 'Nurse', 'Filmmaker']
  }
};

export default function AstrologyInsight({ zodiacSign }) {
  const insight = zodiacCareerInsights[zodiacSign];

  if (!insight) return null;

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <Star className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-[#1e3a5f]">Astrology Insight: {zodiacSign}</h3>
            <p className="text-xs text-gray-500">Supporting factor (5% weight)</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-3 rounded-xl bg-white/60">
            <p className="text-xs text-gray-500 mb-1">Best Work Environment</p>
            <p className="text-sm font-medium text-[#1e3a5f]">{insight.environment}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/60">
            <p className="text-xs text-gray-500 mb-1">Your Strengths</p>
            <p className="text-sm font-medium text-[#1e3a5f]">{insight.strengths}</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-amber-50/60 mb-4">
          <p className="text-xs text-amber-600 mb-1">May Want to Avoid</p>
          <p className="text-red-500 text-sm font-medium">{insight.avoid}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-gray-500 mr-2">Suggested careers:</span>
          {insight.careers.map((career, idx) =>
          <span key={idx} className="text-xs px-2 py-1 bg-white rounded-full text-indigo-600 border border-indigo-100">
              {career}
            </span>
          )}
        </div>

        <Alert className="mt-4 border-indigo-200 bg-indigo-50/50">
          <Info className="h-4 w-4 text-indigo-600" />
          <AlertDescription className="text-xs text-indigo-700">
            This insight supports but does not override your academic and interest-based recommendations.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>);

}
