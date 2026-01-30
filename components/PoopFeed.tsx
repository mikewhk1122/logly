
import React from 'react';
import { PoopPost } from '../types';
import PoopCard from './PoopCard';
import { Language, TRANSLATIONS } from '../translations';

interface PoopFeedProps {
  posts: PoopPost[];
  lang: Language;
}

const PoopFeed: React.FC<PoopFeedProps> = ({ posts, lang }) => {
  const t = TRANSLATIONS[lang];

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">🧻</div>
        <h3 className="text-xl font-bold text-amber-900">{t.emptyFeed}</h3>
        <p className="text-amber-700">{t.emptyFeedSub}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-amber-900">{t.recentDrops}</h2>
        <div className="text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-1 rounded-full uppercase tracking-wider">
          {t.liveFeed}
        </div>
      </div>
      {posts.map(post => (
        <PoopCard key={post.id} post={post} lang={lang} />
      ))}
    </div>
  );
};

export default PoopFeed;
