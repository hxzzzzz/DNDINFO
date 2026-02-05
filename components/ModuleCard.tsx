import React from 'react';
import { Layers, MapPin, Clock } from 'lucide-react';
import { ModuleData } from '../types';

interface ModuleCardProps {
  module: ModuleData;
  onClick: (module: ModuleData) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, onClick }) => {
  // Extract first 3 tags from styleLabel for preview
  const previewTags = module.styleLabel.split('，').slice(0, 3);

  return (
    <div 
      onClick={() => onClick(module)}
      className="bg-dnd-card border border-slate-700 rounded-xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col h-full group active:scale-[0.98] active:border-amber-600 sm:hover:shadow-amber-900/20 sm:hover:border-amber-700 sm:hover:scale-[1.02] cursor-pointer"
    >
      {/* Image Header */}
      <div className="relative h-40 overflow-hidden bg-slate-800">
        <img 
          src={module.imageUrl} 
          alt={module.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 sm:group-hover:scale-110 opacity-100 sm:opacity-90 sm:group-hover:opacity-100"
        />
        <div className="absolute top-0 right-0 bg-black/70 text-amber-500 px-3 py-1 rounded-bl-lg backdrop-blur-sm font-heading font-bold flex items-center gap-1 text-sm">
          <Layers size={14} />
          {module.minLevel}-{module.maxLevel} 级
        </div>
        
        {module.fvtt && (
          <div className="absolute bottom-2 right-2 bg-indigo-600/90 text-white text-[10px] px-2 py-0.5 rounded shadow-sm border border-indigo-400/50 backdrop-blur-md">
            FVTT
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-lg font-heading font-bold text-slate-100 leading-tight sm:group-hover:text-amber-500 transition-colors line-clamp-2">
            {module.title}
          </h3>
        </div>

        {/* Mini Meta */}
        <div className="flex items-center gap-3 text-slate-400 text-xs mb-3">
          <div className="flex items-center gap-1">
             <Clock size={12} />
             <span>{module.duration}</span>
          </div>
          <div className="flex items-center gap-1 truncate max-w-[50%]">
             <MapPin size={12} />
             <span className="truncate">{module.setting}</span>
          </div>
        </div>

        {/* Style Tags (Preview) */}
        <div className="flex flex-wrap gap-1.5 mb-3 mt-auto">
          {previewTags.map((tag, idx) => (
            <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700/50">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="text-center text-amber-600/80 text-xs font-bold mt-2 pt-2 border-t border-slate-700/50 group-hover:text-amber-500 transition-colors">
            查看详情 & 下载资源
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;