import React, { useState, useMemo } from 'react';
import { X, Calculator, RotateCcw, ChevronUp, ChevronDown, Check } from 'lucide-react';

interface PointBuyModalProps {
  onClose: () => void;
}

type Attribute = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

const ATTRIBUTES: { key: Attribute; label: string; fullLabel: string }[] = [
  { key: 'str', label: 'STR', fullLabel: '力量 (Strength)' },
  { key: 'dex', label: 'DEX', fullLabel: '敏捷 (Dexterity)' },
  { key: 'con', label: 'CON', fullLabel: '体质 (Constitution)' },
  { key: 'int', label: 'INT', fullLabel: '智力 (Intelligence)' },
  { key: 'wis', label: 'WIS', fullLabel: '感知 (Wisdom)' },
  { key: 'cha', label: 'CHA', fullLabel: '魅力 (Charisma)' },
];

const POINT_COSTS: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9
};

const PointBuyModal: React.FC<PointBuyModalProps> = ({ onClose }) => {
  const [baseScores, setBaseScores] = useState<Record<Attribute, number>>({
    str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8
  });
  const [racialBonuses, setRacialBonuses] = useState<Record<Attribute, number>>({
    str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0
  });

  // Calculate Points Used
  const pointsUsed = useMemo(() => {
    return (Object.values(baseScores) as number[]).reduce((acc, score) => acc + (POINT_COSTS[score] || 0), 0);
  }, [baseScores]);

  const pointsRemaining = 27 - pointsUsed;

  // Handlers
  const updateBaseScore = (attr: Attribute, delta: number) => {
    const current = baseScores[attr];
    const next = current + delta;
    if (next < 8 || next > 15) return;
    setBaseScores(prev => ({ ...prev, [attr]: next }));
  };

  const updateBonus = (attr: Attribute, val: number) => {
    if (val < 0 || val > 10) return; // Basic sanity check
    setRacialBonuses(prev => ({ ...prev, [attr]: val }));
  };

  const resetAll = () => {
    setBaseScores({ str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 });
    setRacialBonuses({ str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 });
  };

  const getModifier = (score: number) => Math.floor((score - 10) / 2);
  const formatMod = (mod: number) => (mod >= 0 ? `+${mod}` : `${mod}`);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-800/50">
          <div className="flex items-center gap-2 text-amber-500">
            <Calculator size={24} />
            <h2 className="font-heading font-bold text-lg text-white">购点计算器 (27 Point Buy)</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full text-slate-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Dashboard */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-950 rounded-xl border border-slate-800 shadow-inner relative">
             <div className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-1">剩余点数</div>
             <div className={`text-6xl font-heading font-bold drop-shadow-lg transition-colors duration-300 ${
               pointsRemaining < 0 ? 'text-red-500' : 
               pointsRemaining === 0 ? 'text-green-500' : 'text-amber-500'
             }`}>
               {pointsRemaining}
             </div>
             <div className="text-xs text-slate-600 mt-2">总预算: 27 点</div>
             
             <button 
               onClick={resetAll} 
               className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
               title="重置"
             >
               <RotateCcw size={16} />
             </button>
          </div>

          {/* Attributes Grid */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 bg-slate-900 p-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-center items-center border-b border-slate-800">
              <div className="col-span-2 sm:col-span-2 text-left pl-2">属性</div>
              <div className="col-span-4 sm:col-span-3">基础数值 (8-15)</div>
              <div className="hidden sm:block col-span-1">花费</div>
              <div className="col-span-3 sm:col-span-2">种族加值</div>
              <div className="col-span-3 sm:col-span-2">最终值</div>
              <div className="hidden sm:block col-span-2">调整值</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-800">
              {ATTRIBUTES.map((attr) => {
                const base = baseScores[attr.key];
                const bonus = racialBonuses[attr.key];
                const total = base + bonus;
                const mod = getModifier(total);
                const cost = POINT_COSTS[base];

                return (
                  <div key={attr.key} className="grid grid-cols-12 gap-2 p-3 items-center hover:bg-slate-800 transition-colors">
                    {/* Label */}
                    <div className="col-span-2 sm:col-span-2 font-bold text-slate-200 pl-2 text-sm sm:text-base">
                      {attr.label}
                    </div>

                    {/* Base Control */}
                    <div className="col-span-4 sm:col-span-3 flex items-center justify-center gap-1 sm:gap-2">
                      <button 
                        onClick={() => updateBaseScore(attr.key, -1)}
                        disabled={base <= 8}
                        className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded bg-slate-900 border border-slate-700 hover:border-amber-500 disabled:opacity-30 disabled:hover:border-slate-700 transition-colors"
                      >
                        <ChevronDown size={14} />
                      </button>
                      <span className={`w-6 sm:w-8 text-center font-mono font-bold ${base === 15 ? 'text-amber-500' : 'text-white'}`}>
                        {base}
                      </span>
                      <button 
                        onClick={() => updateBaseScore(attr.key, 1)}
                        disabled={base >= 15}
                        className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded bg-slate-900 border border-slate-700 hover:border-amber-500 disabled:opacity-30 disabled:hover:border-slate-700 transition-colors"
                      >
                        <ChevronUp size={14} />
                      </button>
                    </div>

                    {/* Cost (Desktop) */}
                    <div className="hidden sm:block col-span-1 text-center text-xs text-slate-500">
                      {cost}
                    </div>

                    {/* Racial Bonus Input */}
                    <div className="col-span-3 sm:col-span-2 flex justify-center">
                       <input 
                         type="number" 
                         min="0" 
                         max="10"
                         value={bonus}
                         onChange={(e) => updateBonus(attr.key, parseInt(e.target.value) || 0)}
                         className="w-12 sm:w-14 bg-slate-900 border border-slate-700 rounded px-1 py-1 text-center text-white focus:border-amber-500 outline-none text-sm"
                       />
                    </div>

                    {/* Total */}
                    <div className="col-span-3 sm:col-span-2 text-center">
                      <span className="font-heading font-bold text-lg sm:text-xl text-white">
                        {total}
                      </span>
                      {/* Mobile Modifier Display */}
                      <span className="sm:hidden block text-[10px] text-slate-400">
                        {formatMod(mod)}
                      </span>
                    </div>

                    {/* Modifier (Desktop) */}
                    <div className="hidden sm:block col-span-2 text-center">
                      <div className="inline-block bg-slate-900 rounded px-2 py-0.5 border border-slate-700 min-w-[3rem]">
                        <span className={`font-mono font-bold text-sm ${mod > 0 ? 'text-green-400' : mod < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                          {formatMod(mod)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Validation Message */}
          {pointsRemaining < 0 && (
             <div className="p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-center text-red-400 text-sm">
               你超出了 {Math.abs(pointsRemaining)} 点预算！请降低一些基础属性。
             </div>
          )}
           {pointsRemaining > 0 && (
             <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-center text-slate-400 text-sm">
               你还有 {pointsRemaining} 点可用。
             </div>
          )}
          {pointsRemaining === 0 && (
             <div className="flex items-center justify-center gap-2 p-3 bg-green-900/20 border border-green-900/50 rounded-lg text-center text-green-400 text-sm">
               <Check size={16} /> 购点完美完成！
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PointBuyModal;