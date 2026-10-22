import React from 'react';
import { Play, Sparkles, Shield, Compass, BookOpen, Heart, ArrowRight, Layers, Dumbbell } from 'lucide-react';
import { WORKOUT_ROUTINES, WorkoutRoutine } from '../data/workouts';

interface Props {
  onStartRoutine: (routine: WorkoutRoutine) => void;
  onNavigate: (sectionId: string) => void;
}

export const HomeOverview: React.FC<Props> = ({ onStartRoutine, onNavigate }) => {
  const routineA = WORKOUT_ROUTINES[0];
  const routineB = WORKOUT_ROUTINES[1];

  return (
    <div className="space-y-6">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 bg-rose-950/60 border border-rose-800/60 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guia Educativo Oficial</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight text-balance">
            Acelerador de Bumbum com Elásticos
          </h1>

          <p className="text-xs sm:text-sm text-rose-200/90 font-medium italic">
            Treino educativo com elásticos para fortalecer glúteos e quadris em casa — sem promessas de transformação.
          </p>

          <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
            <p>
              <strong>Treine no seu ritmo:</strong> Este guia apresenta exercícios com elásticos para trabalhar os glúteos, os quadris e o controle dos movimentos. Você encontrará instruções detalhadas, adaptações biomecânicas e dicas de segurança para treinar em casa.
            </p>
            <p className="text-slate-400">
              Não é necessário fazer todos os exercícios de uma vez. Comece com uma faixa leve e uma amplitude confortável. A prioridade é aprender o movimento com controle postural, não terminar rápido.
            </p>
          </div>

          {/* Mandatory Short Disclaimer from prompt */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>
              <strong>Aviso curto:</strong> Material educativo. Não promete aumento, arredondamento ou transformação específica dos glúteos.
            </span>
          </div>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onStartRoutine(routineA)}
              className="py-3 px-6 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-rose-600/25 active:scale-[0.98] transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              Começar com Treino A
            </button>

            <button
              onClick={() => onNavigate('exercicios')}
              className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs sm:text-sm border border-slate-700/60 transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              Explorar os 8 Exercícios
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Grid to Essential Sections */}
      <div>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-1">
          Navegação Rápida
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Card 1: Entenda os Glúteos */}
          <div
            onClick={() => onNavigate('anatomia')}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-rose-950/60 text-rose-400 flex items-center justify-center border border-rose-800/40 mb-3 group-hover:scale-105 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-100 group-hover:text-rose-300 transition-colors">
                Entenda os Glúteos
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Glúteo máximo vs glúteo médio, biomecânica e o que queimação significa.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-rose-400 font-medium pt-2">
              <span>Ver fundamentos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Escolha do Elástico */}
          <div
            onClick={() => onNavigate('faixas')}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-indigo-950/60 text-indigo-400 flex items-center justify-center border border-indigo-800/40 mb-3 group-hover:scale-105 transition-transform">
                <Compass className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                Escolha do Elástico
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Tabela de resistência Leve, Média e Forte, e inspeção de integridade.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-indigo-400 font-medium pt-2">
              <span>Guia de faixas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Segurança Pré-Treino */}
          <div
            onClick={() => onNavigate('seguranca')}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-950/60 text-emerald-400 flex items-center justify-center border border-emerald-800/40 mb-3 group-hover:scale-105 transition-transform">
                <Shield className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                Segurança Antes
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Checklist pré-treino, sinais de alerta e orientações de saúde.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium pt-2">
              <span>Ver checklist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Meu Acompanhamento */}
          <div
            onClick={() => onNavigate('diario')}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-amber-950/60 text-amber-400 flex items-center justify-center border border-amber-800/40 mb-3 group-hover:scale-105 transition-transform">
                <Heart className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                Acompanhamento
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Registre séries, esforço e conforto sem cobrança sobre o corpo.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-400 font-medium pt-2">
              <span>Abrir diário</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Routine Quick Launch Summary */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            Rotinas Rápidas (20–30 min)
          </h3>
          <button
            onClick={() => onNavigate('treinos')}
            className="text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1"
          >
            Ver todos os detalhes
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Quick Routine A */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="/exercises/1.jpg"
                alt="Treino A"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://i.postimg.cc/WpgF0yS9/1.jpg';
                }}
                className="w-12 h-12 rounded-xl object-cover bg-slate-950 border border-slate-800 shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">
                  Alternância 1
                </span>
                <h4 className="text-sm font-bold text-slate-200 truncate">Treino A — Iniciante</h4>
                <p className="text-xs text-slate-400 truncate">Ponte, Agachamento, Passadas, Abdução</p>
              </div>
            </div>
            <button
              onClick={() => onStartRoutine(routineA)}
              className="p-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white shrink-0 shadow-md shadow-rose-600/20 active:scale-95 transition-transform"
              title="Iniciar Treino A"
            >
              <Play className="w-4 h-4 fill-white" />
            </button>
          </div>

          {/* Quick Routine B */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="/exercises/3.jpg"
                alt="Treino B"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://i.postimg.cc/bYkD15LL/3.jpg';
                }}
                className="w-12 h-12 rounded-xl object-cover bg-slate-950 border border-slate-800 shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">
                  Alternância 2
                </span>
                <h4 className="text-sm font-bold text-slate-200 truncate">Treino B — Iniciante</h4>
                <p className="text-xs text-slate-400 truncate">Dobradiça, Afundo, 4 Apoios, Abdução em pé</p>
              </div>
            </div>
            <button
              onClick={() => onStartRoutine(routineB)}
              className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shrink-0 shadow-md shadow-indigo-600/20 active:scale-95 transition-transform"
              title="Iniciar Treino B"
            >
              <Play className="w-4 h-4 fill-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
