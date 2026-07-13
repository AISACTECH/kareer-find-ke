import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, AlertCircle } from 'lucide-react';
import { pointsToMeanGrade, SUBJECT_CLUSTERS } from '@/lib/kuccpsEngine';

const CLUSTER_LABELS = {
  sciences: { label: 'Sciences', icon: '🧬', subjects: 'Math, Bio, Chem, Physics' },
  technicals: { label: 'Technicals', icon: '⚙️', subjects: 'Math, Physics, Geo, Computer' },
  social_sciences: { label: 'Social Sciences', icon: '📊', subjects: 'History, Geo, CRE, Business' },
  languages: { label: 'Languages', icon: '📖', subjects: 'English, Kiswahili, Lit, French' },
  arts: { label: 'Arts', icon: '🎨', subjects: 'Kiswahili, Lit, History, Geo, CRE' }
};

export default function ClusterBreakdown({ subjects }) {
  if (!subjects || Object.keys(subjects).length === 0) return null;

  const calculateCluster = (clusterKey) => {
    const clusterSubjects = SUBJECT_CLUSTERS[clusterKey] || [];
    const grades = clusterSubjects
      .map(subj => {
        const grade = subjects[subj];
        const points = { A:12,'A-':11,'B+':10,B:9,'B-':8,'C+':7,C:6,'C-':5,'D+':4,D:3,'D-':2,E:1 }[grade] || 0;
        return { subj, grade, points };
      })
      .filter(g => g.points > 0)
      .sort((a, b) => b.points - a.points)
      .slice(0, 4);
    if (grades.length === 0) return { score: 0, subjects: [] };
    const sum = grades.reduce((a, b) => a + b.points, 0);
    return { score: Math.round((sum / 48) * 48), subjects: grades };
  };

  const allPoints = Object.values(subjects).map(g => ({ A:12,'A-':11,'B+':10,B:9,'B-':8,'C+':7,C:6,'C-':5,'D+':4,D:3,'D-':2,E:1 }[g] || 0)).filter(p => p > 0);
  const meanPoints = allPoints.length > 0 ? allPoints.reduce((a, b) => a + b, 0) / allPoints.length : 0;
  const meanGrade = pointsToMeanGrade(meanPoints);

  return (
    <Card className="border border-[#1e3a5f]/40 bg-[#0d1526]">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="w-4 h-4 text-[#d4a853]" />
          <h3 className="text-sm font-semibold text-white">Cluster Point Breakdown</h3>
        </div>

        <div className="mb-3 p-2.5 rounded-lg bg-[#0a0f1e] border border-[#1e3a5f]/30 flex items-center justify-between">
          <span className="text-xs text-slate-400">Calculated Mean Grade</span>
          <span className="text-lg font-bold text-[#d4a853]">{meanGrade}</span>
        </div>

        <div className="space-y-2">
          {Object.keys(SUBJECT_CLUSTERS).map(key => {
            const info = CLUSTER_LABELS[key];
            const result = calculateCluster(key);
            const pct = (result.score / 48) * 100;
            return (
              <div key={key} className="bg-[#0a0f1e] rounded-lg p-2.5 border border-[#1e3a5f]/30">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span>{info.icon}</span>
                    <span className="text-xs font-medium text-slate-200">{info.label}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{result.score}/48</span>
                </div>
                <div className="w-full h-1.5 bg-[#1e3a5f]/30 rounded-full overflow-hidden mb-1.5">
                  <div
                    className={`h-full rounded-full ${result.score >= 30 ? 'bg-emerald-500' : result.score >= 20 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                {result.subjects.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {result.subjects.map(s => (
                      <span key={s.subj} className="text-xs px-1.5 py-0.5 rounded bg-[#1e3a5f]/30 text-slate-400">
                        {s.subj}: <strong className="text-white">{s.grade}</strong>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-600">No subjects for this cluster</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-3 p-2.5 rounded-lg bg-[#d4a853]/10 border border-[#d4a853]/20 flex gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-[#d4a853] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300">
            Cluster points use the 4 best subjects per cluster group. Higher scores unlock more competitive courses.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
