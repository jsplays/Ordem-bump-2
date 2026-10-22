import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, AlertCircle, CheckCircle2, Info, ChevronRight, Sparkles, Image as ImageIcon, Eye, Maximize2 } from 'lucide-react';
import { Exercise } from '../data/exercises';

interface Props {
  exercise: Exercise;
}

export const ExerciseVisualGuide: React.FC<Props> = ({ exercise }) => {
  const [activeStage, setActiveStage] = useState<'initial' | 'final'>('initial');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'foto' | 'movimento' | 'anatomia' | 'erros'>('foto');
  const [speed, setSpeed] = useState<'normal' | 'lenta'>('normal');
  const [imageError, setImageError] = useState<boolean>(false);
  const [showFullPhoto, setShowFullPhoto] = useState<boolean>(false);

  // Auto-play animation cycle
  useEffect(() => {
    if (!isPlaying) return;
    const intervalTime = speed === 'normal' ? 2400 : 4000;
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev === 'initial' ? 'final' : 'initial'));
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isPlaying, speed]);

  const isFinal = activeStage === 'final';

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl overflow-hidden">
      {/* Top Header / View Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('foto')}
            className={`px-3 py-1.5 font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'foto'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Foto do Movimento
          </button>
          <button
            onClick={() => setActiveTab('movimento')}
            className={`px-3 py-1.5 font-medium rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'movimento'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Guia Biomecânico
          </button>
          <button
            onClick={() => setActiveTab('anatomia')}
            className={`px-3 py-1.5 font-medium rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'anatomia'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Músculos Ativados
          </button>
          <button
            onClick={() => setActiveTab('erros')}
            className={`px-3 py-1.5 font-medium rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'erros'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Checklist de Postura
          </button>
        </div>

        {/* Animation Controls */}
        {activeTab === 'movimento' && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSpeed(speed === 'normal' ? 'lenta' : 'normal')}
              className="text-[11px] text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded-md bg-slate-800/60 border border-slate-700/60 font-mono"
              title="Velocidade da animação"
            >
              {speed === 'normal' ? '1.0x' : '0.5x Lenta'}
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center justify-center"
              aria-label={isPlaying ? 'Pausar animação' : 'Reproduzir animação'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}
      </div>

      {/* Foto do Movimento Tab */}
      {activeTab === 'foto' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1 px-1">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-rose-400" />
              Demonstração Fotográfica Real
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Exercício #{exercise.id}
            </span>
          </div>

          {/* Photo Display Card */}
          <div className="relative w-full h-64 sm:h-80 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden group flex items-center justify-center">
            <img
              src={imageError ? exercise.externalImageUrl : exercise.imageUrl}
              alt={`Demonstração técnica: ${exercise.name}`}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-contain sm:object-cover bg-slate-950 transition-transform duration-300 group-hover:scale-[1.02]"
            />

            {/* Gradient Scrim for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

            {/* Corner Badges */}
            <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-800/80 text-xs font-semibold text-rose-300 shadow-lg">
              {exercise.bandType}
            </div>

            <button
              onClick={() => setShowFullPhoto(true)}
              className="absolute top-3 right-3 p-2 bg-slate-950/85 backdrop-blur-md text-slate-300 hover:text-white rounded-xl border border-slate-800/80 shadow-lg transition-transform active:scale-95"
              title="Ampliar foto em tela cheia"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Bottom Photo Overlay Info */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
              <div className="bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800/80 text-slate-200 font-medium truncate mr-2">
                {exercise.name}
              </div>
              <button
                onClick={() => setActiveTab('movimento')}
                className="bg-rose-600/90 hover:bg-rose-500 backdrop-blur-md text-white px-3 py-1.5 rounded-xl font-semibold shadow-md shrink-0 flex items-center gap-1.5 transition-all text-[11px]"
              >
                <span>Ver Vetores</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Technique Instruction Banner */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-100">{exercise.keyTip}</p>
              <p className="text-slate-400 mt-0.5">{exercise.breathing}</p>
            </div>
          </div>

          {/* Fullscreen Photo Lightbox Modal */}
          {showFullPhoto && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg">
              <div className="relative max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl flex flex-col items-center">
                <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                  <h4 className="text-sm font-bold text-slate-100">{exercise.name}</h4>
                  <button
                    onClick={() => setShowFullPhoto(false)}
                    className="px-3 py-1 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-lg"
                  >
                    Fechar
                  </button>
                </div>
                <img
                  src={imageError ? exercise.externalImageUrl : exercise.imageUrl}
                  alt={exercise.name}
                  referrerPolicy="no-referrer"
                  className="max-h-[75vh] w-auto object-contain rounded-xl"
                />
                <p className="text-xs text-slate-400 mt-3 text-center">
                  {exercise.bandPlacement}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Vector Animation & Anatomy Stage */}
      {activeTab === 'movimento' && (
        <div>
          {/* Phase indicator pills */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setActiveStage('initial');
                }}
                className={`px-2.5 py-1 rounded-md transition-colors font-medium ${
                  !isFinal
                    ? 'bg-slate-800 text-rose-300 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                1. Posição Inicial
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setActiveStage('final');
                }}
                className={`px-2.5 py-1 rounded-md transition-colors font-medium ${
                  isFinal
                    ? 'bg-slate-800 text-rose-300 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                2. Posição Final (Pico)
              </button>
            </div>
            <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
              {exercise.initialDose}
            </span>
          </div>

          {/* Biomechanical Canvas Container */}
          <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-center p-3 select-none overflow-hidden">
            {/* Visual Canvas Grid */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(244, 63, 94, 0.25) 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }}
            />

            {/* Dynamic Exercise SVG Vector */}
            <div className="relative z-10 w-full max-w-sm h-full flex items-center justify-center">
              {renderExerciseVector(exercise.visualType, isFinal)}
            </div>

            {/* Interactive Vector Indicators */}
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none text-[11px]">
              <div className="flex items-center gap-2 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800/60 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span className="text-slate-300 font-medium">Glúteo Máximo</span>
                <span className="w-2 h-2 rounded-full bg-indigo-400 ml-1"></span>
                <span className="text-slate-300 font-medium">Glúteo Médio</span>
              </div>
              <div className="bg-slate-950/80 px-2 py-1 rounded-md border border-slate-800/60 text-slate-400 font-mono">
                {isFinal ? 'Fase Concêntrica / Pico' : 'Fase Inicial / Retorno'}
              </div>
            </div>
          </div>

          {/* Technique Instruction Banner */}
          <div className="mt-3.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-100">{exercise.keyTip}</p>
              <p className="text-slate-400 mt-0.5">{exercise.breathing}</p>
            </div>
          </div>
        </div>
      )}

      {/* Anatomy Tab */}
      {activeTab === 'anatomia' && (
        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-200">Mapa Muscular em Foco</span>
              <span className="text-[11px] text-slate-400">Ativação sinérgica</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nenhum exercício isola completamente um músculo. Veja como os grupos participam deste movimento com papéis específicos:
            </p>
          </div>

          <div className="space-y-2">
            {exercise.primaryMuscles.map((muscle, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={`w-3.5 h-3.5 rounded-md mt-0.5 shrink-0 ${
                      muscle.type === 'gluteo-maximo'
                        ? 'bg-rose-500 shadow-sm shadow-rose-500/30'
                        : muscle.type === 'gluteo-medio'
                        ? 'bg-indigo-500 shadow-sm shadow-indigo-500/30'
                        : 'bg-emerald-500 shadow-sm shadow-emerald-500/30'
                    }`}
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">{muscle.name}</h5>
                    <p className="text-xs text-slate-400 mt-0.5">{muscle.role}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase text-slate-400 px-2 py-0.5 bg-slate-800/80 rounded border border-slate-700/60 shrink-0">
                  {muscle.type === 'gluteo-maximo'
                    ? 'Motor'
                    : muscle.type === 'gluteo-medio'
                    ? 'Estabilizador'
                    : 'Auxiliar'}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-900/40 text-xs text-indigo-200">
            <strong>Nota de Biomecânica:</strong> O glúteo médio participa ativamente de movimentos laterais (abdução) e da estabilização da pelve. O glúteo máximo participa fortemente da extensão do quadril.
          </div>
        </div>
      )}

      {/* Errors & Posture Checklist Tab */}
      {activeTab === 'erros' && (
        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40">
            <div className="flex items-center gap-2 text-rose-300 font-semibold text-xs mb-1">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              O que você deve evitar:
            </div>
            <p className="text-xs text-rose-200/90 leading-relaxed">{exercise.whatToAvoid}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Opção mais fácil (se estiver desafiador):
            </div>
            <p className="text-xs text-emerald-200/90 leading-relaxed">{exercise.easierOption}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Como progredir com segurança:
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{exercise.harderOption}</p>
          </div>

          <div className="text-[11px] text-slate-500 p-2 bg-slate-950/40 rounded-lg border border-slate-900">
            <strong>Aviso de segurança:</strong> {exercise.safetyNotes}
          </div>
        </div>
      )}
    </div>
  );
};

// Vector Illustrations Renderer with Animated States and Biomechanical Motion
function renderExerciseVector(type: Exercise['visualType'], isFinal: boolean) {
  switch (type) {
    case 'pelvic-bridge':
      return (
        <svg viewBox="0 0 320 180" className="w-full h-full text-slate-200">
          {/* Floor Mat */}
          <line x1="20" y1="150" x2="300" y2="150" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          
          {/* Head & Neck */}
          <circle cx="60" cy="140" r="12" fill="#94a3b8" />
          {/* Shoulders / Torso */}
          <motion.line
            x1="72"
            y1="140"
            x2={isFinal ? '150' : '150'}
            y2={isFinal ? '100' : '140'}
            stroke="#cbd5e1"
            strokeWidth="8"
            strokeLinecap="round"
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
          {/* Pelvis / Glute highlight */}
          <motion.circle
            cx="150"
            cy={isFinal ? 100 : 140}
            r="12"
            fill={isFinal ? '#e11d48' : '#f43f5e'}
            opacity={isFinal ? 1 : 0.6}
            transition={{ duration: 0.8 }}
          />
          {/* Thighs */}
          <motion.line
            x1="150"
            y1={isFinal ? 100 : 140}
            x2="210"
            y2={isFinal ? '100' : '110'}
            stroke="#cbd5e1"
            strokeWidth="8"
            strokeLinecap="round"
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
          {/* Mini band around thighs */}
          <motion.rect
            x="175"
            y={isFinal ? 94 : 118}
            width="12"
            height="14"
            rx="3"
            fill="#6366f1"
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
          {/* Lower legs */}
          <motion.line
            x1="210"
            y1={isFinal ? '100' : '110'}
            x2="225"
            y2="150"
            stroke="#94a3b8"
            strokeWidth="7"
            strokeLinecap="round"
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
          {/* Feet on floor */}
          <line x1="215" y1="150" x2="238" y2="150" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />

          {/* Biomechanical Force Vector Arrow */}
          <AnimatePresence>
            {isFinal && (
              <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <line x1="150" y1="82" x2="150" y2="60" stroke="#f43f5e" strokeWidth="3" strokeDasharray="3 3" />
                <polygon points="150,52 145,62 155,62" fill="#f43f5e" />
                <text x="160" y="65" fill="#f43f5e" fontSize="11" fontWeight="bold">Extensão do Quadril</text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      );

    case 'squat':
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full text-slate-200">
          <line x1="50" y1="180" x2="270" y2="180" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          {/* Head */}
          <motion.circle
            cx={isFinal ? 130 : 160}
            cy={isFinal ? 60 : 35}
            r="11"
            fill="#94a3b8"
            transition={{ duration: 0.8 }}
          />
          {/* Torso */}
          <motion.line
            x1={isFinal ? 130 : 160}
            y1={isFinal ? 71 : 46}
            x2={isFinal ? 115 : 160}
            y2={isFinal ? 120 : 100}
            stroke="#cbd5e1"
            strokeWidth="8"
            strokeLinecap="round"
            transition={{ duration: 0.8 }}
          />
          {/* Glute highlight */}
          <motion.circle
            cx={isFinal ? 115 : 160}
            cy={isFinal ? 120 : 100}
            r="12"
            fill={isFinal ? '#e11d48' : '#64748b'}
            transition={{ duration: 0.8 }}
          />
          {/* Thighs */}
          <motion.line
            x1={isFinal ? 115 : 160}
            y1={isFinal ? 120 : 100}
            x2={isFinal ? 165 : 160}
            y2={isFinal ? 125 : 145}
            stroke="#cbd5e1"
            strokeWidth="8"
            strokeLinecap="round"
            transition={{ duration: 0.8 }}
          />
          {/* Mini band */}
          <motion.rect
            x={isFinal ? 135 : 154}
            y={isFinal ? 116 : 118}
            width="14"
            height="12"
            rx="3"
            fill="#6366f1"
            transition={{ duration: 0.8 }}
          />
          {/* Lower legs */}
          <motion.line
            x1={isFinal ? 165 : 160}
            y1={isFinal ? 125 : 145}
            x2={isFinal ? 165 : 160}
            y2="180"
            stroke="#94a3b8"
            strokeWidth="7"
            strokeLinecap="round"
            transition={{ duration: 0.8 }}
          />
          {/* Feet */}
          <line x1="155" y1="180" x2="180" y2="180" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />

          {/* Biomechanical indicator */}
          <AnimatePresence>
            {isFinal && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <path d="M 95 120 Q 90 140 105 145" fill="none" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <text x="60" y="115" fill="#f43f5e" fontSize="10" fontWeight="bold">Quadril para trás</text>
                <text x="185" y="125" fill="#818cf8" fontSize="10" fontWeight="bold">Joelhos estáveis</text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      );

    case 'rdl-hinge':
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full text-slate-200">
          <line x1="50" y1="180" x2="270" y2="180" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          {/* Head */}
          <motion.circle
            cx={isFinal ? 200 : 160}
            cy={isFinal ? 75 : 35}
            r="11"
            fill="#94a3b8"
            transition={{ duration: 0.8 }}
          />
          {/* Torso (Incline on hinge) */}
          <motion.line
            x1={isFinal ? 200 : 160}
            y1={isFinal ? 86 : 46}
            x2={isFinal ? 125 : 160}
            y2={isFinal ? 115 : 100}
            stroke="#cbd5e1"
            strokeWidth="8"
            strokeLinecap="round"
            transition={{ duration: 0.8 }}
          />
          {/* Glute / Hip */}
          <motion.circle
            cx={isFinal ? 125 : 160}
            cy={isFinal ? 115 : 100}
            r="13"
            fill={isFinal ? '#e11d48' : '#64748b'}
            transition={{ duration: 0.8 }}
          />
          {/* Legs with slight knee microflexion */}
          <motion.line
            x1={isFinal ? 125 : 160}
            y1={isFinal ? 115 : 100}
            x2={isFinal ? 145 : 160}
            y2={isFinal ? 145 : 145}
            stroke="#cbd5e1"
            strokeWidth="8"
            strokeLinecap="round"
            transition={{ duration: 0.8 }}
          />
          <motion.line
            x1={isFinal ? 145 : 160}
            y1={isFinal ? 145 : 145}
            x2="160"
            y2="180"
            stroke="#94a3b8"
            strokeWidth="7"
            strokeLinecap="round"
            transition={{ duration: 0.8 }}
          />
          {/* Feet */}
          <line x1="150" y1="180" x2="175" y2="180" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
          {/* Long resistance band from feet to hands */}
          <motion.line
            x1="160"
            y1="180"
            x2={isFinal ? 190 : 165}
            y2={isFinal ? 115 : 100}
            stroke="#f59e0b"
            strokeWidth="4"
            strokeDasharray="4 2"
            transition={{ duration: 0.8 }}
          />
          {/* Hands holding band */}
          <motion.circle
            cx={isFinal ? 190 : 165}
            cy={isFinal ? 115 : 100}
            r="5"
            fill="#e2e8f0"
            transition={{ duration: 0.8 }}
          />
          {/* Vectors */}
          <AnimatePresence>
            {isFinal && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <line x1="125" y1="115" x2="90" y2="115" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="3 3" />
                <polygon points="85,115 95,110 95,120" fill="#f43f5e" />
                <text x="50" y="105" fill="#f43f5e" fontSize="10" fontWeight="bold">Dobradiça do quadril</text>
                <text x="180" y="145" fill="#f59e0b" fontSize="10" fontWeight="bold">Tensão do elástico</text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      );

    case 'donkey-kick':
      return (
        <svg viewBox="0 0 320 180" className="w-full h-full text-slate-200">
          <line x1="30" y1="155" x2="290" y2="155" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          {/* Head */}
          <circle cx="80" cy="85" r="11" fill="#94a3b8" />
          {/* Arms down to floor */}
          <line x1="95" y1="95" x2="95" y2="155" stroke="#cbd5e1" strokeWidth="7" strokeLinecap="round" />
          {/* Back/spine */}
          <line x1="95" y1="95" x2="190" y2="95" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
          {/* Neutral spine guide */}
          <line x1="95" y1="85" x2="190" y2="85" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
          {/* Glute highlight */}
          <circle cx="190" cy="95" r="12" fill={isFinal ? '#e11d48' : '#64748b'} />
          {/* Base supporting knee */}
          <line x1="180" y1="95" x2="180" y2="155" stroke="#94a3b8" strokeWidth="7" strokeLinecap="round" />
          {/* Active moving leg */}
          <motion.g
            animate={{
              rotate: isFinal ? -25 : 0,
              originX: '190px',
              originY: '95px'
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <line x1="190" y1="95" x2="235" y2="105" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
            <line x1="235" y1="105" x2="235" y2="65" stroke="#94a3b8" strokeWidth="7" strokeLinecap="round" />
            {/* Foot */}
            <line x1="230" y1="65" x2="245" y2="65" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
          </motion.g>

          <AnimatePresence>
            {isFinal && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <line x1="235" y1="60" x2="235" y2="35" stroke="#f43f5e" strokeWidth="3" />
                <polygon points="235,30 230,40 240,40" fill="#f43f5e" />
                <text x="180" y="32" fill="#f43f5e" fontSize="10" fontWeight="bold">Calcanhar ao teto</text>
                <text x="95" y="75" fill="#94a3b8" fontSize="9">Coluna neutra (não arquear)</text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      );

    case 'side-lying-abduction':
      return (
        <svg viewBox="0 0 320 180" className="w-full h-full text-slate-200">
          <line x1="30" y1="145" x2="290" y2="145" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          {/* Head on arm */}
          <circle cx="65" cy="130" r="11" fill="#94a3b8" />
          {/* Torso lying on side */}
          <line x1="75" y1="130" x2="145" y2="130" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
          {/* Gluteus medius highlight on upper hip */}
          <circle cx="145" cy="125" r="12" fill={isFinal ? '#6366f1' : '#818cf8'} />
          {/* Bottom leg resting */}
          <line x1="145" y1="135" x2="240" y2="140" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
          {/* Top active leg lifting */}
          <motion.g
            animate={{
              rotate: isFinal ? -28 : 0,
              originX: '145px',
              originY: '125px'
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <line x1="145" y1="125" x2="250" y2="125" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
            <circle cx="250" cy="125" r="5" fill="#94a3b8" />
            {/* Band across legs */}
            <rect x="185" y="118" width="12" height="15" rx="3" fill="#ec4899" />
          </motion.g>

          <AnimatePresence>
            {isFinal && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <path d="M 230 120 Q 240 95 245 80" fill="none" stroke="#6366f1" strokeWidth="2.5" />
                <polygon points="248,73 240,81 250,83" fill="#6366f1" />
                <text x="175" y="65" fill="#818cf8" fontSize="10" fontWeight="bold">Abdução: Glúteo Médio</text>
                <text x="130" y="160" fill="#94a3b8" fontSize="9">Pelve nivelada (sem rodar para trás)</text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      );

    case 'lateral-walk':
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full text-slate-200">
          <line x1="30" y1="180" x2="290" y2="180" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          {/* Torso in athletic ready stance */}
          <circle cx="160" cy="45" r="11" fill="#94a3b8" />
          <line x1="160" y1="56" x2="160" y2="110" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
          {/* Hips */}
          <circle cx="150" cy="110" r="10" fill="#6366f1" />
          <circle cx="170" cy="110" r="10" fill="#6366f1" />
          {/* Left leg (stationary) */}
          <line x1="150" y1="110" x2="140" y2="145" stroke="#cbd5e1" strokeWidth="7" strokeLinecap="round" />
          <line x1="140" y1="145" x2="135" y2="180" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
          
          {/* Right leg stepping out */}
          <motion.line
            x1="170"
            y1="110"
            x2={isFinal ? 205 : 180}
            y2="145"
            stroke="#cbd5e1"
            strokeWidth="7"
            strokeLinecap="round"
            transition={{ duration: 0.8 }}
          />
          <motion.line
            x1={isFinal ? 205 : 180}
            y1="145"
            x2={isFinal ? 215 : 185}
            y2="180"
            stroke="#94a3b8"
            strokeWidth="6"
            strokeLinecap="round"
            transition={{ duration: 0.8 }}
          />
          {/* Elastic band above knees with stretching motion */}
          <motion.line
            x1="142"
            y1="140"
            x2={isFinal ? 200 : 178}
            y2="140"
            stroke="#e11d48"
            strokeWidth="8"
            strokeLinecap="round"
            transition={{ duration: 0.8 }}
          />

          <AnimatePresence>
            {isFinal && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <line x1="185" y1="175" x2="225" y2="175" stroke="#f43f5e" strokeWidth="3" />
                <polygon points="230,175 220,170 220,180" fill="#f43f5e" />
                <text x="180" y="165" fill="#f43f5e" fontSize="10" fontWeight="bold">Passo lateral curto</text>
                <text x="70" y="135" fill="#818cf8" fontSize="9">Tensão constante na faixa</text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      );

    case 'standing-abduction':
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full text-slate-200">
          <line x1="40" y1="180" x2="280" y2="180" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          {/* Wall / Chair Support line */}
          <line x1="80" y1="40" x2="80" y2="180" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          <text x="50" y="35" fill="#64748b" fontSize="10">Apoio firme</text>

          {/* Standing figure */}
          <circle cx="150" cy="40" r="11" fill="#94a3b8" />
          {/* Arm touching support */}
          <line x1="145" y1="52" x2="80" y2="90" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
          {/* Strict upright torso */}
          <line x1="150" y1="52" x2="150" y2="110" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
          {/* Pelvis level */}
          <circle cx="145" cy="110" r="10" fill="#6366f1" />
          <circle cx="155" cy="110" r="10" fill="#6366f1" />

          {/* Stance leg (supporting) */}
          <line x1="145" y1="110" x2="145" y2="180" stroke="#94a3b8" strokeWidth="7" strokeLinecap="round" />

          {/* Moving leg swinging out */}
          <motion.line
            x1="155"
            y1="110"
            x2={isFinal ? 200 : 160}
            y2={isFinal ? 165 : 180}
            stroke="#cbd5e1"
            strokeWidth="8"
            strokeLinecap="round"
            transition={{ duration: 0.8 }}
          />

          <AnimatePresence>
            {isFinal && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <path d="M 170 170 Q 195 165 210 155" fill="none" stroke="#6366f1" strokeWidth="2.5" />
                <polygon points="214,152 204,154 210,162" fill="#6366f1" />
                <text x="175" y="105" fill="#818cf8" fontSize="10" fontWeight="bold">Tronco ereto</text>
                <text x="175" y="120" fill="#6366f1" fontSize="9">Pelve alinhada</text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      );

    case 'reverse-lunge':
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full text-slate-200">
          <line x1="40" y1="180" x2="280" y2="180" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          {/* Support Chair */}
          <path d="M 70 80 L 70 180 M 70 120 L 95 120 L 95 180" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
          <text x="55" y="70" fill="#64748b" fontSize="10">Apoio leve</text>

          {/* Hand touching chair */}
          <motion.line
            x1="120"
            y1={isFinal ? 90 : 70}
            x2="95"
            y2="120"
            stroke="#94a3b8"
            strokeWidth="4"
            strokeLinecap="round"
            transition={{ duration: 0.8 }}
          />

          {/* Head & Torso */}
          <motion.circle
            cx="135"
            cy={isFinal ? 60 : 40}
            r="11"
            fill="#94a3b8"
            transition={{ duration: 0.8 }}
          />
          <motion.line
            x1="135"
            y1={isFinal ? 71 : 51}
            x2="135"
            y2={isFinal ? 120 : 105}
            stroke="#cbd5e1"
            strokeWidth="8"
            strokeLinecap="round"
            transition={{ duration: 0.8 }}
          />
          {/* Lead Glute highlight */}
          <motion.circle
            cx="135"
            cy={isFinal ? 120 : 105}
            r="12"
            fill={isFinal ? '#e11d48' : '#64748b'}
            transition={{ duration: 0.8 }}
          />

          {/* Front leg (weight-bearing) */}
          <motion.line
            x1="135"
            y1={isFinal ? 120 : 105}
            x2={isFinal ? 140 : 135}
            y2={isFinal ? 150 : 145}
            stroke="#cbd5e1"
            strokeWidth="8"
            strokeLinecap="round"
            transition={{ duration: 0.8 }}
          />
          <motion.line
            x1={isFinal ? 140 : 135}
            y1={isFinal ? 150 : 145}
            x2="140"
            y2="180"
            stroke="#94a3b8"
            strokeWidth="7"
            strokeLinecap="round"
            transition={{ duration: 0.8 }}
          />
          {/* Front foot firmly flat */}
          <line x1="130" y1="180" x2="155" y2="180" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />

          {/* Rear stepping leg */}
          <motion.line
            x1="135"
            y1={isFinal ? 120 : 105}
            x2={isFinal ? 200 : 140}
            y2={isFinal ? 155 : 145}
            stroke="#94a3b8"
            strokeWidth="7"
            strokeLinecap="round"
            transition={{ duration: 0.8 }}
          />
          <motion.line
            x1={isFinal ? 200 : 140}
            y1={isFinal ? 155 : 145}
            x2={isFinal ? 220 : 140}
            y2={isFinal ? 175 : 180}
            stroke="#64748b"
            strokeWidth="6"
            strokeLinecap="round"
            transition={{ duration: 0.8 }}
          />

          <AnimatePresence>
            {isFinal && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <path d="M 140 105 L 180 105" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                <polygon points="185,105 175,100 175,110" fill="#f43f5e" />
                <text x="145" y="95" fill="#f43f5e" fontSize="10" fontWeight="bold">Passo para trás</text>
                <text x="140" y="195" fill="#cbd5e1" fontSize="9">Peso no calcanhar da frente</text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      );
  }
}
