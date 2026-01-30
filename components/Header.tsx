
import React from 'react';
import { UserProfile } from '../types';
import { Language, TRANSLATIONS } from '../translations';

interface HeaderProps {
  user: UserProfile;
  currentView: string;
  setView: (v: 'feed' | 'log' | 'stats') => void;
  lang: Language;
  onToggleLang: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, currentView, setView, lang, onToggleLang, onLogout }) => {
  const t = TRANSLATIONS[lang];
  
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-lg border-b border-amber-100 px-4 py-3 shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('feed')}>
          <div className="bg-amber-800 p-2 rounded-xl text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,2A10,10,0,0,0,2,12c0,3.31,1.61,6.25,4.09,8.09L5,22H19l-1.09-1.91C20.39,18.25,22,15.31,22,12A10,10,0,0,0,12,2ZM12,20a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-black text-amber-900 tracking-tight">{t.appName}</h1>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleLang}
            className="hidden sm:block px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-[10px] font-black text-amber-800 uppercase tracking-widest hover:bg-amber-100 transition-colors"
          >
            {lang === 'zh' ? 'EN' : 'ZH'}
          </button>

          <button 
            onClick={onLogout}
            className="p-2 text-amber-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title={t.logout}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
          
          <button 
            onClick={() => setView('stats')}
            className="flex items-center gap-3 pl-2 border-l border-amber-100 hover:opacity-80 transition-opacity"
          >
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-black text-amber-900">{user.name}</span>
              <span className="text-[10px] text-amber-600 font-bold tracking-tighter uppercase">🔥 {user.streak}{t.streak}</span>
            </div>
            <div className="w-9 h-9 rounded-full border-2 border-amber-200 overflow-hidden shadow-sm">
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
