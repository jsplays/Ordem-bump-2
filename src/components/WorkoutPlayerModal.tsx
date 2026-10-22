import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, CheckCircle, ChevronLeft, ChevronRight, Timer, 
  RotateCcw, Volume2, VolumeX, ShieldAlert, Check, ArrowRight
} from 'lucide-react';
import { Exercise, EXERCISES } from '../data/exercises';
import { WorkoutRoutine } from '../data/workouts';
import { ExerciseVisualGuide } from './ExerciseVisualGuide';

interface Props {
  routine: WorkoutRoutine;
  onClose: () => void;
  onFinishAndLog: (workoutData: {
    routineId: string;
    exercisesDone: string[];
    date: string;
  }) => void;
}

export const WorkoutPlayerModal: React.FC<Props> = ({ routine, onClose, onFinishAndLog }) => {
  const workoutExercises: Exercise[] = routine.exerciseIds
    .map((id) => EXERCISES.find((e) => e.id === id))
    .filter((e): e is Exercise => e !== undefined);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedSets, setCompletedSets] = useState<{ [exerciseId: number]: number }>({
    [workoutExercises[0]?.id || 1]: 0
  });

  // Rest timer state
  const [restDuration, setRestDuration] = useState<number>(60);
  const [restRemaining, setRestRemaining] = useState<number | null>(null);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const currentExercise = workoutExercises[currentIndex] || workoutExercises[0];
  const currentSetsDone = completedSets[currentExercise.id] || 0;
  const targetSets = currentExercise.defaultSets;

  // Web Audio chime function
  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.45);
    } catch {
      // AudioContext not allowed or not supported; gracefully ignore
    }
  };

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isResting && restRemaining !== null) {
      if (restRemaining > 0) {
        interval = setInterval(() => {
          setRestRemaining((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
        }, 1000);
      } else if (restRemaining === 0) {
        playBeep();
        setIsResting(false);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isResting, restRemaining]);

  const startRestTimer = (seconds: number) => {
    setRestDuration(seconds);
    setRestRemaining(seconds);
    setIsResting(true);
  };

  const handleCompleteSet = () => {
    const nextSet = currentSetsDone + 1;
    setCompletedSets((prev) => ({
      ...prev,
      [currentExercise.id]: nextSet
    }));

    // Auto-prompt rest timer if not finished all sets
    if (nextSet < targetSets) {
      startRestTimer(restDuration);
    } else {
      // Completed all sets for this exercise, prompt rest before next
      startRestTimer(restDuration);
    }
  };

  const handleNextExercise = () => {
    if (currentIndex < workoutExercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsResting(false);
      setRestRemaining(null);
    }
  };

  const handlePrevExercise = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsResting(false);
      setRestRemaining(null);
    }
  };

  const isWorkoutCompleted = workoutExercises.every(
    (ex) => (completedSets[ex.id] || 0) >= ex.defaultSets
  );

  const handleFinish = () => {
    const exercisesDone = workoutExercises
      .filter((ex) => (completedSets[ex.id] || 0) > 0)
      .map((ex) => ex.name);

    const today = new Date().toISOString().split('T')[0];
    onFinishAndLog({
      routineId: routine.title,
      exercisesDone: exercisesDone.length > 0 ? exercisesDone : workoutExercises.map((e) => e.name),
      date: today
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/60 sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-rose-400">{routine.badge}</span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400 font-mono">
                Exercício {currentIndex + 1} de {workoutExercises.length}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100 truncate mt-0.5">
              {routine.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
              title={soundEnabled ? 'Silenciar avisos' : 'Ativar avisos sonoros'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Fechar treino"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1">
          <div
            className="bg-gradient-to-r from-rose-500 to-indigo-500 h-1 transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / workoutExercises.length) * 100}%`
            }}
          />
        </div>

        {/* Scrollable Workout Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Exercise Info */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-rose-400 font-medium">
                {currentExercise.bandType}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {currentExercise.initialDose}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">
              {currentExercise.name}
            </h2>
            {currentExercise.subtitle && (
              <p className="text-xs text-slate-400 mt-0.5 italic">{currentExercise.subtitle}</p>
            )}
          </div>

          {/* Biomechanical Interactive Visual Guide */}
          <ExerciseVisualGuide exercise={currentExercise} />

          {/* Sets Tracking & Interactive Control */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium">Progresso das Séries</span>
                <p className="text-sm font-semibold text-slate-200 mt-0.5">
                  Série {Math.min(currentSetsDone, targetSets)} de {targetSets} concluída
                </p>
              </div>

              {/* Set Checkmark Pills */}
              <div className="flex items-center gap-2">
                {Array.from({ length: targetSets }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all ${
                      idx < currentSetsDone
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {idx < currentSetsDone ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Action to Mark Set */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
              <button
                onClick={handleCompleteSet}
                disabled={currentSetsDone >= targetSets}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  currentSetsDone < targetSets
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 active:scale-[0.98]'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                {currentSetsDone < targetSets
                  ? `Concluir Série ${currentSetsDone + 1}`
                  : 'Todas as Séries Deste Exercício Feitas'}
              </button>

              {currentSetsDone > 0 && (
                <button
                  onClick={() =>
                    setCompletedSets((prev) => ({
                      ...prev,
                      [currentExercise.id]: Math.max(0, currentSetsDone - 1)
                    }))
                  }
                  className="p-3 rounded-xl bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60"
                  title="Desfazer última série"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Rest Timer Drawer */}
          <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs">
                <Timer className="w-4 h-4 text-indigo-400" />
                Cronômetro de Pausa e Recuperação
              </div>
              <span className="text-[11px] text-indigo-300/80 font-mono">
                Sugerido: 60–120s
              </span>
            </div>

            {/* Countdown Display */}
            {isResting && restRemaining !== null ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-950/60 border border-indigo-800/50">
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-extrabold font-mono text-indigo-200 tabular-nums">
                    {Math.floor(restRemaining / 60)}:
                    {(restRemaining % 60).toString().padStart(2, '0')}
                  </div>
                  <span className="text-xs text-indigo-300/80">Descansando... Respire fundo</span>
                </div>
                <button
                  onClick={() => {
                    setIsResting(false);
                    setRestRemaining(null);
                  }}
                  className="text-xs text-indigo-300 hover:text-white px-3 py-1.5 rounded-lg bg-indigo-900/60 border border-indigo-700/60 font-medium"
                >
                  Pular Pausa
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Iniciar pausa:</span>
                {[60, 90, 120].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => startRestTimer(sec)}
                    className="px-3 py-1.5 rounded-lg bg-indigo-950 text-indigo-200 hover:bg-indigo-900 border border-indigo-800/60 text-xs font-mono transition-colors"
                  >
                    {sec}s
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Step by step execution */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Como fazer (passo a passo)
            </h4>
            <div className="space-y-1.5">
              {currentExercise.howTo.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 sticky bottom-0 z-20 flex items-center justify-between gap-3">
          <button
            onClick={handlePrevExercise}
            disabled={currentIndex === 0}
            className={`py-2.5 px-4 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors ${
              currentIndex > 0
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                : 'bg-slate-900 text-slate-600 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>

          {currentIndex < workoutExercises.length - 1 ? (
            <button
              onClick={handleNextExercise}
              className="py-2.5 px-5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 shadow-md shadow-rose-600/20 transition-all"
            >
              Próximo Exercício
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="py-2.5 px-5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
            >
              Concluir & Registrar
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
