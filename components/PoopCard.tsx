
import React, { useState } from 'react';
import { PoopPost } from '../types';
import { Language, TRANSLATIONS } from '../translations';

interface PoopCardProps {
  post: PoopPost;
  lang: Language;
}

const PoopCard: React.FC<PoopCardProps> = ({ post, lang }) => {
  const [liked, setLiked] = useState(false);
  const t = TRANSLATIONS[lang];
  
  const timeAgo = (ts: number) => {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return t.justNow;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ${t.ago}`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ${t.ago}`;
    return `${Math.floor(diff / 86400)}d ${t.ago}`;
  };

  const getEmoji = (type: number) => {
    if (type <= 2) return '🧱';
    if (type <= 4) return '🍩';
    if (type <= 6) return '☁️';
    return '🌊';
  };

  const getBristolDescription = (type: number) => {
    return t[`bristol${type}` as keyof typeof t];
  };

  return (
    <div className="bg-white rounded-3xl border border-amber-50 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4 flex items-center gap-3">
        <img src={post.userAvatar} alt={post.userName} className="w-10 h-10 rounded-full border border-amber-100" />
        <div>
          <h4 className="font-bold text-amber-950 text-sm leading-tight">{post.userName}</h4>
          <span className="text-xs text-amber-600/70">{timeAgo(post.timestamp)}</span>
        </div>
        <div className="ml-auto flex flex-col items-end">
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
            <span className="text-[10px] font-black text-amber-800 uppercase tracking-tighter">{t.bristol} {post.bristolType}</span>
            <span className="text-lg" title={getBristolDescription(post.bristolType)}>
              {getEmoji(post.bristolType)}
            </span>
          </div>
        </div>
      </div>

      {post.imageUrl && (
        <div className="px-4 pb-4">
          <div className="rounded-2xl overflow-hidden aspect-square border border-amber-100 relative group">
            <img src={post.imageUrl} alt="Poop proof" className="w-full h-full object-cover blur-md group-hover:blur-none transition-all duration-500" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none">
              <span className="text-white text-[10px] font-black uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full group-hover:hidden">{t.revealProof}</span>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 pb-2">
        {post.note && <p className="text-amber-900 text-sm italic mb-2">"{post.note}"</p>}
        
        {post.aiCommentary && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-2xl border border-amber-100 flex gap-3 items-start">
            <span className="text-xl">🤖</span>
            <div>
              <span className="block text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-0.5">{t.aiAnalysis}</span>
              <p className="text-xs text-amber-800 font-medium leading-relaxed">{post.aiCommentary}</p>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-3 border-t border-amber-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${liked ? 'text-red-500' : 'text-amber-700 hover:text-amber-900'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-xs font-bold">{post.likes + (liked ? 1 : 0)} {t.likes}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs font-bold">{post.comments} {t.comments}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoopCard;
