import React, { useState } from 'react';
import { EXERCISES, Exercise } from '../data/exercises';
import { ExerciseVisualGuide } from './ExerciseVisualGuide';
import { ChevronRight, Search, Filter, Play, CheckCircle2, AlertCircle, Dumbbell } from 'lucide-react';

interface Props {
  onStartSingleExerciseWorkout?: (exercise: Exercise) => void;
}

export const ExerciseLibrary: React.FC<Props> = ({ onStartSingleExerciseWorkout }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedExerciseId, setSelectedExerciseId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredExercises = EXERCISES.filter((ex) => {
    const matchesCategory =
      selectedCategory === 'todos' ||
      (selectedCategory === 'extensao' && ex.movementCategory === 'extensao') ||
      (selectedCategory === 'abducao' && ex.movementCategory === 'abducao') ||
      (selectedCategory === 'agachamento' && (ex.movementCategory === 'agachamento' || ex.movementCategory === 'dobradica' || ex.movementCategory === 'unilateral'));

    const matchesSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.targetMovement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ex.subtitle && ex.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const activeExercise = EXERCISES.find((e) => e.id === selectedExerciseId) || EXERCISES[0];

  return (
    <div className="space-y-6">
      {/* Title & Filters */}
      <div>
        <div className="text-xs text-rose-400 font-semibold mb-1">Biblioteca Técnica</div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">8 Exercícios Educativos</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
          Cada movimento foi selecionado para treinar diferentes funções articulares do quadril e dos glúteos com segurança e controle.
        </p>
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar exercício ou movimento..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto text-xs shrink-0">
            <button
              onClick={() => setSelectedCategory('todos')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                selectedCategory === 'todos'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Todos (8)
            </button>
            <button
              onClick={() => setSelectedCategory('extensao')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                selectedCategory === 'extensao'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Extensão
            </button>
            <button
              onClick={() => setSelectedCategory('abducao')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                selectedCategory === 'abducao'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Abdução Lateral
            </button>
            <button
              onClick={() => setSelectedCategory('agachamento')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                selectedCategory === 'agachamento'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Agachamento & Unilateral
            </button>
          </div>
        </div>

        {/* Horizontal Mobile Exercise Selector Carousel */}
        <div className="flex gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
          {filteredExercises.map((exercise) => {
            const isSelected = exercise.id === selectedExerciseId;
            return (
              <button
                key={exercise.id}
                onClick={() => setSelectedExerciseId(exercise.id)}
                className={`flex-shrink-0 text-left p-2.5 sm:p-3 rounded-2xl border transition-all w-60 sm:w-64 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-rose-500 shadow-md shadow-rose-500/10'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="relative w-full h-24 rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80">
                    <img
                      src={exercise.imageUrl}
                      alt={exercise.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = exercise.externalImageUrl;
                      }}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-1.5 left-1.5 bg-slate-950/80 px-2 py-0.5 rounded-md text-[10px] font-mono text-rose-300">
                      #{exercise.id}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 line-clamp-1">
                      {exercise.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {exercise.targetMovement}
                    </p>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="truncate pr-1">{exercise.bandType}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Exercise Full Technical Card */}
      <div className="space-y-5 bg-slate-900/60 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl">
        {/* Header Lockup */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 mb-1">
              <span>Exercício {activeExercise.id} de 8</span>
              <span>·</span>
              <span className="text-slate-400">{activeExercise.bandType}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
              {activeExercise.name}
            </h3>
            {activeExercise.subtitle && (
              <p className="text-xs text-slate-400 italic mt-0.5">{activeExercise.subtitle}</p>
            )}
            <p className="text-xs sm:text-sm text-slate-300 mt-2 font-medium">
              <strong>Objetivo do movimento:</strong> {activeExercise.targetMovement}
            </p>
          </div>

          {onStartSingleExerciseWorkout && (
            <button
              onClick={() => onStartSingleExerciseWorkout(activeExercise)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-rose-600/20 active:scale-[0.98] transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              Treinar com Guia
            </button>
          )}
        </div>

        {/* Visual Vector Biomechanical Guide */}
        <ExerciseVisualGuide exercise={activeExercise} />

        {/* Step-by-Step Instructions */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Instruções de Execução Técnica
          </h4>
          <div className="space-y-2">
            {activeExercise.howTo.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300"
              >
                <span className="w-5 h-5 rounded-full bg-slate-800 text-rose-400 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Dosage Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Dose Inicial Recomendada</span>
            <span className="text-slate-200 font-semibold">{activeExercise.initialDose}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Respiração Coordenada</span>
            <span className="text-slate-300">{activeExercise.breathing}</span>
          </div>
        </div>

        {/* Details Grid: Band Placement, Tips, Avoid, Easier, Harder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-semibold block">Posicionamento da Faixa</span>
            <p className="text-slate-300 leading-relaxed">{activeExercise.bandPlacement}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-1">
            <span className="text-rose-400 font-semibold block">Dica de Técnica</span>
            <p className="text-slate-300 leading-relaxed">{activeExercise.keyTip}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-900/30 space-y-1">
            <span className="text-rose-300 font-semibold block">O que Evitar</span>
            <p className="text-rose-200/90 leading-relaxed">{activeExercise.whatToAvoid}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-900/30 space-y-1">
            <span className="text-emerald-300 font-semibold block">Versão Mais Fácil</span>
            <p className="text-emerald-200/90 leading-relaxed">{activeExercise.easierOption}</p>
          </div>
        </div>

        {/* Safety Note */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Segurança:</strong> {activeExercise.safetyNotes}
          </span>
        </div>
      </div>
    </div>
  );
};
