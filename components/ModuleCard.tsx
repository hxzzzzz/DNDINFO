import React from 'react';
import { ExternalLink, User, Tag, Layers } from 'lucide-react';
import { ModuleData } from '../types';

interface ModuleCardProps {
  module: ModuleData;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  return (
    <div className="bg-dnd-card border border-slate-700 rounded-xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col h-full group active:scale-[0.98] active:border-amber-600 sm:hover:shadow-amber-900/20 sm:hover:border-amber-700 sm:hover:scale-[1.02]">
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden bg-slate-800">
        <img 
          src={module.imageUrl} 
          alt={module.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 sm:group-hover:scale-110 opacity-100 sm:opacity-80 sm:group-hover:opacity-100"
        />
        <div className="absolute top-0 right-0 bg-black/70 text-amber-500 px-3 py-1 rounded-bl-lg backdrop-blur-sm font-heading font-bold flex items-center gap-1">
          <Layers size={14} />
          {module.minLevel}-{module.maxLevel} 级
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-heading font-bold text-slate-100 mb-1 sm:group-hover:text-amber-500 transition-colors">
          {module.title}
        </h3>
        
        <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
          <User size={14} />
          <span>{module.author}</span>
        </div>

        <p className="text-slate-300 text-sm mb-4 flex-grow leading-relaxed">
          {module.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {module.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-md border border-slate-700">
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>

        {/* Action */}
        <a 
          href={module.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-auto w-full bg-amber-700 hover:bg-amber-600 active:bg-amber-800 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors touch-manipulation"
        >
          <span>打开模组</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
};

export default ModuleCard;