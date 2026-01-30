
import React from 'react';
import { MOCK_USERS } from '../constants';
import { UserProfile } from '../types';
import { Language, TRANSLATIONS } from '../translations';

interface LoginProps {
  onLogin: (user: UserProfile) => void;
  lang: Language;
}

const Login: React.FC<LoginProps> = ({ onLogin, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="fixed inset-0 z-[100] bg-[#fdf8f6] flex flex-col items-center justify-center px-6">
      <div className="mb-12 text-center">
        <div className="bg-amber-800 p-4 rounded-3xl text-white inline-block mb-4 shadow-2xl shadow-amber-900/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2A10,10,0,0,0,2,12c0,3.31,1.61,6.25,4.09,8.09L5,22H19l-1.09-1.91C20.39,18.25,22,15.31,22,12A10,10,0,0,0,12,2ZM12,20a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"/>
          </svg>
        </div>
        <h1 className="text-4xl font-black text-amber-900 tracking-tight">{t.appName}</h1>
        <p className="text-amber-700 font-medium mt-2">{t.appTagline}</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-[40px] p-8 shadow-xl border border-amber-100">
        <h2 className="text-xl font-black text-amber-950 mb-8 text-center">{t.selectProfile}</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {MOCK_USERS.map((user) => (
            <button
              key={user.id}
              onClick={() => onLogin(user)}
              className="group flex items-center gap-4 p-4 rounded-3xl border-2 border-transparent bg-amber-50/50 hover:bg-amber-100 hover:border-amber-200 transition-all text-left"
            >
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-14 h-14 rounded-full border-2 border-white shadow-sm group-hover:scale-110 transition-transform" 
              />
              <div className="flex-1">
                <h3 className="font-bold text-amber-950">{user.name}</h3>
                <p className="text-xs text-amber-600 font-medium">🔥 {user.streak}{t.streak} • {user.totalLogs} logs</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-300 group-hover:text-amber-600 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
