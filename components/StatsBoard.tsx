
import React, { useMemo } from 'react';
import { PoopPost, UserProfile } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Language, TRANSLATIONS } from '../translations';

interface StatsBoardProps {
  user: UserProfile;
  posts: PoopPost[];
  lang: Language;
}

const COLORS = ['#D97706', '#92400E', '#78350F', '#451A03', '#92400E', '#D97706', '#F59E0B'];

const StatsBoard: React.FC<StatsBoardProps> = ({ user, posts, lang }) => {
  const t = TRANSLATIONS[lang];
  const userPosts = posts.filter(p => p.userId === user.id);
  
  const stats = useMemo(() => {
    const counts: Record<number, number> = {};
    [1, 2, 3, 4, 5, 6, 7].forEach(t => counts[t] = 0);
    userPosts.forEach(p => {
      counts[p.bristolType] = (counts[p.bristolType] || 0) + 1;
    });
    
    return Object.entries(counts).map(([type, count]) => ({
      name: `${t.type} ${type}`,
      value: count
    }));
  }, [userPosts, t]);

  const activityData = useMemo(() => {
    const days = lang === 'zh' ? ['日', '一', '二', '三', '四', '五', '六'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.map(d => ({
      name: d,
      drops: Math.floor(Math.random() * 2) + (userPosts.length > 5 ? 1 : 0)
    }));
  }, [userPosts, lang]);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="bg-amber-900 rounded-3xl p-8 text-white flex items-center justify-between shadow-xl overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-1">{user.name}</h2>
          <p className="text-amber-200 font-bold text-lg mb-4">{t.masterLogician}</p>
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl">
              <span className="block text-[8px] uppercase font-black text-amber-300">{t.total}</span>
              <span className="text-2xl font-black">{user.totalLogs}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl">
              <span className="block text-[8px] uppercase font-black text-amber-300">{t.streak.split(' ')[0]}</span>
              <span className="text-2xl font-black">{user.streak}d</span>
            </div>
          </div>
        </div>
        <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-amber-700 relative z-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-sm">
          <h3 className="text-[10px] font-black text-amber-900 mb-4 uppercase tracking-widest">{t.qualityDistribution}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-sm">
          <h3 className="text-[10px] font-black text-amber-900 mb-4 uppercase tracking-widest">{t.weeklyFrequency}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="drops" fill="#92400E" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-sm">
        <h3 className="text-[10px] font-black text-amber-900 mb-6 uppercase tracking-widest">{t.leaderboard}</h3>
        <div className="space-y-4">
          {[
            { name: 'Sarah Pooper', score: 142, streak: 12 },
            { name: 'Log Master Mike', score: 98, streak: 8 },
            { name: 'You', score: user.totalLogs, streak: user.streak },
          ].sort((a, b) => b.score - a.score).map((competitor, i) => (
            <div key={competitor.name} className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/50">
              <div className="flex items-center gap-4">
                <span className="font-black text-amber-400 w-4">#{i+1}</span>
                <span className={`font-bold ${competitor.name === 'You' ? 'text-amber-800' : 'text-amber-950'}`}>{competitor.name === 'You' ? (lang === 'zh' ? '你自己' : 'You') : competitor.name}</span>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-xs font-bold text-amber-600">🔥 {competitor.streak}</span>
                <span className="text-sm font-black text-amber-900">{competitor.score} {t.totalLogs.split(' ')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBoard;
