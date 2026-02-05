import React, { useState, useEffect } from 'react';
import { X, Download, Users, Map, Music, BookOpen, PenTool, BrainCircuit, ShieldCheck, Star, MessageSquare, Send, Loader2 } from 'lucide-react';
import { ModuleData, Review } from '../types';
import * as api from '../services/api';

interface ModuleDetailsModalProps {
  module: ModuleData;
  onClose: () => void;
}

const ScoreBar: React.FC<{ label: string; score: number; icon: React.ReactNode }> = ({ label, score, icon }) => (
  <div className="flex items-center gap-3 mb-2">
    <div className="w-8 text-slate-400">{icon}</div>
    <div className="flex-1">
      <div className="flex justify-between text-xs text-slate-300 mb-1">
        <span>{label}</span>
        <span className="font-bold text-amber-500">{score}/5</span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-amber-600 to-amber-500 rounded-full" 
          style={{ width: `${(score / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  </div>
);

const ModuleDetailsModal: React.FC<ModuleDetailsModalProps> = ({ module, onClose }) => {
  // 评论功能逻辑保留，但界面暂时隐藏
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [newRating, setNewRating] = useState(5);
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');

  // Load reviews on mount
  useEffect(() => {
    const loadReviews = async () => {
      setLoadingReviews(true);
      try {
        const data = await api.fetchReviews(module.id);
        setReviews(data);
      } catch (e) {
        console.error("Failed to load reviews", e);
      } finally {
        setLoadingReviews(false);
      }
    };
    loadReviews();
  }, [module.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !comment.trim()) return;
    
    setSubmitting(true);
    try {
      const newReviewData: Review = {
        id: Date.now().toString(), // Backend usually handles IDs
        moduleId: module.id,
        username,
        rating: newRating,
        content: comment,
        date: new Date().toISOString().split('T')[0]
      };

      const savedReview = await api.postReview(newReviewData);
      setReviews(prev => [savedReview, ...prev]);
      
      // Reset form
      setComment('');
      setUsername('');
    } catch (e) {
      alert("提交失败，请重试");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        {/* Header Image */}
        <div className="relative h-40 sm:h-60 shrink-0">
          <img 
            src={module.imageUrl} 
            alt={module.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md z-10"
          >
            <X size={20} />
          </button>
          
          <div className="absolute bottom-3 left-4 right-4">
             <div className="flex flex-wrap gap-2 mb-2">
                 {module.fvtt && (
                   <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold bg-indigo-600 text-white border border-indigo-400 shadow-sm">
                     FVTT 支持
                   </span>
                 )}
                 {module.hasMusic && (
                   <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold bg-pink-600 text-white border border-pink-400 shadow-sm flex items-center gap-1">
                     <Music size={10} /> 包含音乐
                   </span>
                 )}
             </div>
             <h2 className="text-xl sm:text-4xl font-heading font-bold text-white shadow-black drop-shadow-md leading-tight">
               {module.title}
             </h2>
          </div>
        </div>

        {/* Scrollable Content (Two Columns on Desktop) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            
            {/* Left Column: Details */}
            <div className="flex-1 space-y-5 sm:space-y-6">
               {/* Basic Info Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-slate-800/50 p-2.5 sm:p-3 rounded-lg border border-slate-700">
                  <div className="text-slate-400 text-xs mb-1">等级</div>
                  <div className="text-white font-bold text-sm sm:text-base">{module.minLevel}-{module.maxLevel}</div>
                </div>
                <div className="bg-slate-800/50 p-2.5 sm:p-3 rounded-lg border border-slate-700">
                  <div className="text-slate-400 text-xs mb-1">完团次数</div>
                  <div className="text-white font-bold text-sm sm:text-base">{module.duration}</div>
                </div>
                <div className="bg-slate-800/50 p-2.5 sm:p-3 rounded-lg border border-slate-700 col-span-2">
                  <div className="text-slate-400 text-xs mb-1">世设/场景</div>
                  <div className="text-white font-bold flex items-center gap-1 text-sm sm:text-base">
                    <Map size={14} className="text-amber-500 shrink-0"/> 
                    <span className="truncate">{module.setting}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-amber-500 mb-2 font-heading">模组概况</h3>
                <p className="text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
                  {module.summary}
                </p>
                <div className="bg-slate-800 p-3 sm:p-4 rounded-lg border border-slate-700/50">
                  <span className="text-slate-400 text-xs uppercase tracking-wider font-bold block mb-2">模组风格</span>
                  <div className="flex flex-wrap gap-2">
                    {module.styleLabel.split('，').map((tag, i) => (
                      <span key={i} className="text-xs sm:text-sm text-slate-200 bg-slate-700 px-2 py-1 rounded">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ratings */}
              <div>
                <h3 className="text-lg font-bold text-amber-500 mb-3 font-heading">详细评分</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  <ScoreBar label="美术资源" score={module.artScore} icon={<PenTool size={18} />} />
                  <ScoreBar label="故事连贯性" score={module.storyScore} icon={<BookOpen size={18} />} />
                  <ScoreBar label="DM友好度" score={module.dmFriendlyScore} icon={<ShieldCheck size={18} />} />
                  <ScoreBar label="故事复杂度" score={module.complexityScore} icon={<BrainCircuit size={18} />} />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 space-y-3">
                <a 
                  href={module.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 sm:py-3.5 rounded-xl transition-all shadow-lg shadow-amber-900/40 active:scale-[0.98] text-sm sm:text-base"
                >
                  <Download size={20} />
                  获取模组资源
                </a>
                {module.qqGroup && (
                  <div className="flex items-center justify-center gap-2 text-slate-400 text-xs sm:text-sm bg-slate-800 py-2 rounded-lg border border-dashed border-slate-600">
                    <Users size={16} />
                    <span>DM交流群: <span className="text-slate-200 font-mono select-all">{module.qqGroup}</span></span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Reviews (暂时隐藏) */}
            {/* 
            <div className="flex-1 lg:border-l lg:border-slate-700 lg:pl-8 flex flex-col min-h-[300px] sm:min-h-[400px] mt-6 lg:mt-0 border-t border-slate-700 lg:border-t-0 pt-6 lg:pt-0">
               <div className="flex items-center gap-2 mb-4">
                 <MessageSquare size={20} className="text-amber-500" />
                 <h3 className="text-lg font-bold text-white font-heading">玩家点评</h3>
                 <span className="bg-slate-700 text-xs text-slate-300 px-2 py-0.5 rounded-full">{reviews.length}</span>
               </div>

               <div className="flex-1 overflow-y-auto space-y-4 mb-6 max-h-[300px] sm:max-h-[400px] pr-2 custom-scrollbar relative">
                 {loadingReviews ? (
                   <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 z-10">
                     <Loader2 className="animate-spin text-amber-500" size={24} />
                   </div>
                 ) : reviews.length === 0 ? (
                   <div className="text-center py-10 text-slate-500 border border-dashed border-slate-700 rounded-lg">
                     <p className="text-sm">暂无评论，来抢沙发吧！</p>
                   </div>
                 ) : (
                   reviews.map(review => (
                     <div key={review.id} className="bg-slate-800/50 p-3 sm:p-4 rounded-lg border border-slate-700/50">
                       <div className="flex justify-between items-start mb-2">
                         <div className="font-bold text-slate-200 text-xs sm:text-sm">{review.username}</div>
                         <div className="flex items-center text-amber-500 text-xs">
                           {[...Array(5)].map((_, i) => (
                             <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-slate-600"} />
                           ))}
                         </div>
                       </div>
                       <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-2">{review.content}</p>
                       <div className="text-slate-500 text-[10px] sm:text-xs text-right">{review.date}</div>
                     </div>
                   ))
                 )}
               </div>

               <div className="bg-slate-800 p-3 sm:p-4 rounded-xl border border-slate-700 mt-auto">
                 <h4 className="text-sm font-bold text-slate-300 mb-3">发表评价</h4>
                 <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="你的昵称" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={submitting}
                        className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:border-amber-500 outline-none w-0 disabled:opacity-50" 
                      />
                      <select 
                        value={newRating} 
                        onChange={(e) => setNewRating(Number(e.target.value))}
                        disabled={submitting}
                        className="bg-slate-900 border border-slate-600 rounded-lg px-2 py-2 text-xs sm:text-sm text-white outline-none shrink-0 disabled:opacity-50"
                      >
                        <option value="5">⭐⭐⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="1">⭐</option>
                      </select>
                    </div>
                    <textarea 
                      placeholder="分享你的体验..." 
                      rows={2}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      disabled={submitting}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:border-amber-500 outline-none resize-none disabled:opacity-50"
                    ></textarea>
                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-2 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      {submitting ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />} 
                      {submitting ? '提交中...' : '发布评论'}
                    </button>
                 </form>
               </div>
            </div>
            */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetailsModal;