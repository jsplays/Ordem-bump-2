import React from 'react';
import { WORKOUT_ROUTINES, WorkoutRoutine } from '../data/workouts';
import { EXERCISES } from '../data/exercises';
import { Play, Timer, Flame, CheckCircle2, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  onStartWorkout: (routine: WorkoutRoutine) => void;
  onSelectExercise: (exerciseId: number) => void;
}

export const WorkoutsView: React.FC<Props> = ({ onStartWorkout, onSelectExercise }) => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <div className="text-xs text-rose-400 font-semibold mb-1">Rotinas Estruturadas</div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Treinos A e B</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
          Não é necessário executar os oito exercícios em toda sessão. Para começar, use dois treinos alternados, com pausas conforme necessário.
        </p>
      </div>

      {/* RPE & Rest Guidelines Box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold">
            <Timer className="w-4 h-4 text-indigo-400" />
            Pausa e Recuperação
          </div>
          <p className="text-xs text-indigo-200/90 leading-relaxed">
            Descanse o suficiente para conseguir fazer a próxima série com controle. Para algumas pessoas, <strong>60–120 segundos</strong> pode ser uma referência prática, sem necessidade de seguir um cronômetro rígido.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-1.5">
          <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold">
            <Flame className="w-4 h-4 text-rose-400" />
            Esforço Ideal (Sem Falha)
          </div>
          <p className="text-xs text-rose-200/90 leading-relaxed">
            Termine cada série sentindo que ainda conseguiria fazer <strong>2 a 3 repetições mantendo a técnica</strong>. Não é necessário treinar até a falha muscular extrema.
          </p>
        </div>
      </div>

      {/* Routine Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {WORKOUT_ROUTINES.map((routine) => {
          const exercises = routine.exerciseIds
            .map((id) => EXERCISES.find((e) => e.id === id))
            .filter(Boolean);

          return (
            <div
              key={routine.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between shadow-xl space-y-5"
            >
              <div className="space-y-4">
                {/* Routine Header */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-bold text-rose-400 font-mono">
                      {routine.badge}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-100 mt-0.5">
                      {routine.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">{routine.focus}</p>
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 font-mono shrink-0">
                    {routine.duration}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {routine.description}
                </p>

                {/* Exercises Table / List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 uppercase px-1">
                    <span>Exercício</span>
                    <span>Séries x Repetições</span>
                  </div>

                  <div className="space-y-1.5">
                    {exercises.map((ex) => (
                      <div
                        key={ex!.id}
                        onClick={() => onSelectExercise(ex!.id)}
                        className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-center justify-between gap-2 cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={ex!.imageUrl}
                            alt={ex!.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = ex!.externalImageUrl;
                            }}
                            className="w-10 h-10 rounded-lg object-cover bg-slate-900 border border-slate-800 shrink-0"
                            loading="lazy"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-200 group-hover:text-rose-300 transition-colors truncate">
                              {ex!.name}
                            </h4>
                            <span className="text-[10px] text-slate-400 truncate block">
                              {ex!.bandType}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-mono font-semibold text-rose-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            2 séries · {ex!.defaultReps}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Start Workout Button */}
              <button
                onClick={() => onStartWorkout(routine)}
                className="w-full py-3.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 active:scale-[0.98] transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                Iniciar {routine.title.split('—')[0].trim()} Interativo
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
