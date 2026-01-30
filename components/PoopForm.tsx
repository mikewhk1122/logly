
import React, { useState, useRef } from 'react';
import { BristolScale, PoopPost, UserProfile } from '../types';
import { Language, TRANSLATIONS } from '../translations';
import { analyzePoopPost } from '../services/geminiService';

interface PoopFormProps {
  onPostCreated: (post: PoopPost) => void;
  onCancel: () => void;
  user: UserProfile;
  lang: Language;
}

const PoopForm: React.FC<PoopFormProps> = ({ onPostCreated, onCancel, user, lang }) => {
  const [bristolType, setBristolType] = useState<BristolScale>(BristolScale.Type4);
  const [note, setNote] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = TRANSLATIONS[lang];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const aiComment = await analyzePoopPost(note, bristolType, lang, image || undefined);

    const newPost: PoopPost = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      timestamp: Date.now(),
      bristolType,
      note,
      imageUrl: image || undefined,
      aiCommentary: aiComment,
      likes: 0,
      comments: 0,
    };

    onPostCreated(newPost);
    setIsSubmitting(false);
  };

  const getBristolDescription = (type: number) => {
    return t[`bristol${type}` as keyof typeof t];
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-amber-100 animate-in slide-in-from-bottom-10 duration-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-amber-900">{t.recordDrop}</h2>
        <button onClick={onCancel} className="text-amber-400 hover:text-amber-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-[10px] font-black text-amber-800 mb-3 uppercase tracking-widest">{t.bristolScale}</label>
          <div className="flex justify-between items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setBristolType(num as BristolScale)}
                className={`flex-shrink-0 w-12 h-12 rounded-2xl font-black transition-all flex items-center justify-center ${
                  bristolType === num 
                    ? 'bg-amber-800 text-white scale-110 shadow-lg' 
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-amber-700 italic font-medium leading-tight">
            {t.type} {bristolType}: <span className="font-bold">{getBristolDescription(bristolType)}</span>
          </p>
        </div>

        <div>
          <label className="block text-[10px] font-black text-amber-800 mb-2 uppercase tracking-widest">{t.publicNote}</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t.notePlaceholder}
            className="w-full bg-amber-50 border border-amber-100 rounded-2xl p-4 text-amber-950 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all resize-none h-24"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black text-amber-800 mb-2 uppercase tracking-widest">{t.proof}</label>
          {image ? (
            <div className="relative rounded-2xl overflow-hidden aspect-video border-2 border-amber-100 group">
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
              <button 
                type="button"
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-amber-200 rounded-2xl py-8 flex flex-col items-center justify-center gap-2 hover:border-amber-400 hover:bg-amber-50 transition-all text-amber-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-bold">{t.snapPhoto}</span>
            </button>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            className="hidden" 
          />
          <p className="mt-2 text-[9px] text-amber-500 uppercase font-black text-center tracking-widest">
            {t.blurredWarning}
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-800 text-white font-black py-5 rounded-2xl shadow-xl shadow-amber-900/20 hover:bg-amber-900 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>{t.analyzing}</span>
              </>
            ) : (
              <>
                <span>{t.dropIt}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3 text-amber-600 font-bold hover:text-amber-900 transition-colors"
          >
            {t.cancel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PoopForm;
