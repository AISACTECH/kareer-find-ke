import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Award, Target } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-[#0a0f1e] border border-[#1e3a5f]/40 rounded-xl p-3.5 text-center">
    <Icon className={`w-5 h-5 mx-auto mb-1.5 ${color}`} />
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-xs text-slate-400 mt-0.5">{label}</p>
  </div>
);

export default function PlacementStats({ summary, topPlacements }) {
  const pieData = [
    { name: 'Eligible', value: summary.placed, color: '#d4a853' },
    { name: 'Not Eligible', value: summary.unplaced, color: '#1e3a5f' }
  ];

  const barData = topPlacements.slice(0, 8).map(p => ({
    name: p.name.split(' ').slice(0, 2).join(' '),
    score: p.match_score,
    eligible: p.eligible
  }));

  return (
    <div className="space-y-4">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={Target} label="Placement Rate" value={`${summary.placementRate}%`} color="text-[#d4a853]" />
        <StatCard icon={Users} label="Eligible Courses" value={summary.placed} color="text-emerald-400" />
        <StatCard icon={Award} label="Avg Match Score" value={summary.avgScore} color="text-amber-400" />
        <StatCard icon={TrendingUp} label="Total Courses" value={summary.total} color="text-purple-400" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border border-[#1e3a5f]/40 bg-[#0d1526]">
          <CardContent className="p-4">
            <h4 className="text-sm font-semibold text-white mb-3">Eligibility Overview</h4>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#0d1526', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-1">
              {pieData.map((d, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs text-slate-400">{d.name}: {d.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#1e3a5f]/40 bg-[#0d1526]">
          <CardContent className="p-4">
            <h4 className="text-sm font-semibold text-white mb-3">Top Match Scores</h4>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={barData} layout="vertical" margin={{ left: 0, right: 10 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 9 }} width={80} />
                <Tooltip
                  contentStyle={{ background: '#0d1526', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#fff' }}
                  cursor={{ fill: '#1e3a5f20' }}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.eligible ? '#d4a853' : '#475569'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
