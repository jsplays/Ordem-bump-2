import React, { useState } from 'react';
import { ShieldCheck, Info, Flame, Target, Layers, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export const AnatomyEducation: React.FC = () => {
  const [activeAnatomyTarget, setActiveAnatomyTarget] = useState<'todos' | 'maximo' | 'medio'>('todos');

  return (
    <div className="space-y-6">
      {/* Title & Introduction */}
      <div>
        <div className="text-xs text-rose-400 font-semibold mb-1">Fundamentos Biomecânicos</div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">O que você vai treinar</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
          Os glúteos são um grupo de músculos com funções diferentes. O <strong className="text-slate-200">glúteo máximo</strong> participa, entre outros movimentos, da extensão do quadril; o <strong className="text-slate-200">glúteo médio</strong> ajuda a afastar a perna e a estabilizar a pelve em atividades cotidianas como caminhar e subir escadas.
        </p>
      </div>

      {/* Anatomy Interactive Visual Diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <span className="text-xs font-semibold text-slate-200">
            Diagrama Posterior do Quadril e Pelve
          </span>
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveAnatomyTarget('todos')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeAnatomyTarget === 'todos'
                  ? 'bg-slate-800 text-rose-300 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setActiveAnatomyTarget('maximo')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeAnatomyTarget === 'maximo'
                  ? 'bg-rose-500/20 text-rose-300 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Glúteo Máximo
            </button>
            <button
              onClick={() => setActiveAnatomyTarget('medio')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeAnatomyTarget === 'medio'
                  ? 'bg-indigo-500/20 text-indigo-300 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Glúteo Médio
            </button>
          </div>
        </div>

        {/* Anatomical Schematic SVG */}
        <div className="relative w-full h-52 sm:h-60 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-center p-2 overflow-hidden">
          <svg viewBox="0 0 320 220" className="w-full h-full text-slate-200">
            {/* Pelvic Bone Outline */}
            <path
              d="M 110 50 Q 160 30 210 50 Q 240 90 220 130 Q 160 145 100 130 Q 80 90 110 50 Z"
              fill="none"
              stroke="#475569"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <text x="160" y="42" fill="#64748b" fontSize="10" textAnchor="middle">Estrutura Óssea Pélvica</text>

            {/* Gluteus Medius (Upper Lateral) */}
            <g
              onClick={() => setActiveAnatomyTarget('medio')}
              className="cursor-pointer transition-opacity"
              opacity={activeAnatomyTarget === 'maximo' ? 0.3 : 1}
            >
              {/* Left Glute Medius */}
              <path
                d="M 95 65 Q 120 60 135 85 Q 110 110 90 95 Z"
                fill={activeAnatomyTarget === 'medio' ? '#6366f1' : '#4f46e5'}
                opacity={activeAnatomyTarget === 'medio' ? 0.9 : 0.7}
              />
              {/* Right Glute Medius */}
              <path
                d="M 225 65 Q 200 60 185 85 Q 210 110 230 95 Z"
                fill={activeAnatomyTarget === 'medio' ? '#6366f1' : '#4f46e5'}
                opacity={activeAnatomyTarget === 'medio' ? 0.9 : 0.7}
              />
              <text x="250" y="80" fill="#818cf8" fontSize="10" fontWeight="bold">Glúteo Médio</text>
              <line x1="225" y1="80" x2="245" y2="80" stroke="#818cf8" strokeWidth="1" />
            </g>

            {/* Gluteus Maximus (Main posterior mass) */}
            <g
              onClick={() => setActiveAnatomyTarget('maximo')}
              className="cursor-pointer transition-opacity"
              opacity={activeAnatomyTarget === 'medio' ? 0.3 : 1}
            >
              {/* Left Glute Max */}
              <path
                d="M 120 85 Q 155 85 155 145 Q 115 155 105 115 Z"
                fill={activeAnatomyTarget === 'maximo' ? '#e11d48' : '#be123c'}
                opacity={activeAnatomyTarget === 'maximo' ? 0.9 : 0.7}
              />
              {/* Right Glute Max */}
              <path
                d="M 200 85 Q 165 85 165 145 Q 205 155 215 115 Z"
                fill={activeAnatomyTarget === 'maximo' ? '#e11d48' : '#be123c'}
                opacity={activeAnatomyTarget === 'maximo' ? 0.9 : 0.7}
              />
              <text x="70" y="140" fill="#f43f5e" fontSize="10" fontWeight="bold">Glúteo Máximo</text>
              <line x1="110" y1="135" x2="90" y2="135" stroke="#f43f5e" strokeWidth="1" />
            </g>

            {/* Spine & Sacrum center line */}
            <line x1="160" y1="20" x2="160" y2="90" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
            {/* Femur connection indicators */}
            <line x1="105" y1="135" x2="95" y2="200" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
            <line x1="215" y1="135" x2="225" y2="200" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
          </svg>

          {/* Quick interactive banner inside diagram */}
          <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] text-slate-400 bg-slate-950/80 backdrop-blur-sm py-1 px-2 rounded-md border border-slate-800/60">
            Toque nos grupos acima para isolar o Glúteo Máximo ou Glúteo Médio
          </div>
        </div>
      </div>

      {/* 4 Official Information Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            Glúteo Máximo
          </div>
          <h4 className="text-sm font-bold text-slate-200">Extensão & Força Posterior</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Participa de movimentos como levantar o quadril (ponte) e estender a perna para trás (coice, passos). É o maior músculo do quadril.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            Glúteo Médio
          </div>
          <h4 className="text-sm font-bold text-slate-200">Movimento Lateral & Estabilidade</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Participa de movimentos laterais do quadril (abdução) e é fundamental para impedir o colapso e tombamento da pelve durante a marcha.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Elásticos de Resistência
          </div>
          <h4 className="text-sm font-bold text-slate-200">Tensão Progressiva</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Oferece resistência que varia conforme o tipo de faixa e o quanto ela é esticada. Ajuda a estimular os músculos em diferentes ângulos de forma acessível.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Formato Corporal
          </div>
          <h4 className="text-sm font-bold text-slate-200">Sem Promessas Milagrosas</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Não pode ser previsto ou garantido pelo app. Exercícios fortalecem os tecidos musculares, mas não controlam a perda de gordura localizada nem desenham formatos fixos.
          </p>
        </div>
      </div>

      {/* Burning Myth Clarification Callout */}
      <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
        <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold">
          <Flame className="w-4 h-4 text-rose-400" />
          A verdade sobre a sensação de “queimação”
        </div>
        <p className="text-xs text-rose-200/90 leading-relaxed">
          <strong>Nenhum exercício isola completamente um único músculo</strong>, e sentir mais “queimação” em uma região não prova que ela vá mudar mais de formato. A queimação é fruto temporário da fadiga metabólica. O fortalecimento depende da regularidade e de estímulos progressivos seguros.
        </p>
      </div>
    </div>
  );
};
