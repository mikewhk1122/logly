import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header.tsx';
import PoopFeed from './components/PoopFeed.tsx';
import PoopForm from './components/PoopForm.tsx';
import StatsBoard from './components/StatsBoard.tsx';
import Login from './components/Login.tsx';
import { PoopPost, UserProfile } from './types.ts';
import { MOCK_USERS } from './constants.ts';
import { Language } from './translations.ts';
import { subscribeToPosts, savePoopPost } from './services/firebaseService.ts';

const App: React.FC = () => {
  const [view, setView] = useState<'feed' | 'log' | 'stats'>('feed');
  const [lang, setLang] = useState<Language>('zh');
  const [posts, setPosts] = useState<PoopPost[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const savedLang = localStorage.getItem('logly_lang') as Language;
    const savedUserId = localStorage.getItem('logly_user_id');
    if (savedLang) setLang(savedLang);
    if (savedUserId) {
      const foundUser = MOCK_USERS.find(u => u.id === savedUserId);
      if (foundUser) setUser(foundUser);
    }

    const unsubscribe = subscribeToPosts((firebasePosts) => {
      if (firebasePosts && firebasePosts.length >= 0) {
        setPosts(firebasePosts);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLanguageToggle = () => {
    const newLang = lang === 'zh' ? 'en' : 'zh';
    setLang(newLang);
    localStorage.setItem('logly_lang', newLang);
  };

  const handleLogin = (selectedUser: UserProfile) => {
    setUser(selectedUser);
    localStorage.setItem('logly_user_id', selectedUser.id);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('logly_user_id');
    setView('feed');
  };

  const handleNewPost = useCallback(async (newPost: PoopPost) => {
    await savePoopPost(newPost);
    if (user) {
      setUser(prev => prev ? ({
        ...prev,
        totalLogs: prev.totalLogs + 1,
        streak: prev.streak + (Math.random() > 0.8 ? 1 : 0)
      }) : null);
    }
    setView('feed');
  }, [user]);

  if (!user) {
    return <Login onLogin={handleLogin} lang={lang} />;
  }

  return (
    <div className="min-h-screen pb-24 bg-[#fdf8f6]">
      <Header 
        user={user} 
        setView={setView} 
        currentView={view} 
        lang={lang} 
        onToggleLang={handleLanguageToggle} 
        onLogout={handleLogout}
      />
      
      <main className="max-w-2xl mx-auto px-4 pt-6">
        {view === 'feed' && <PoopFeed posts={posts} lang={lang} />}
        {view === 'log' && (
          <PoopForm 
            onPostCreated={handleNewPost} 
            user={user} 
            onCancel={() => setView('feed')} 
            lang={lang} 
          />
        )}
        {view === 'stats' && <StatsBoard user={user} posts={posts} lang={lang} />}
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur-md border border-amber-100 p-2 rounded-full shadow-2xl z-50">
        <button 
          onClick={() => setView('feed')}
          className={`p-4 rounded-full transition-all ${view === 'feed' ? 'bg-amber-600 text-white shadow-lg scale-110' : 'text-amber-900 hover:bg-amber-50'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v4a2 2 0 002 2h4" />
          </svg>
        </button>
        <button 
          onClick={() => setView('log')}
          className={`p-5 rounded-full transition-all ${view === 'log' ? 'bg-amber-600 text-white shadow-lg scale-125' : 'bg-amber-800 text-white hover:bg-amber-700 shadow-xl scale-110'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button 
          onClick={() => setView('stats')}
          className={`p-4 rounded-full transition-all ${view === 'stats' ? 'bg-amber-600 text-white shadow-lg scale-110' : 'text-amber-900 hover:bg-amber-50'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default App;