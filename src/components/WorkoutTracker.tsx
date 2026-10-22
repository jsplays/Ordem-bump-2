import React, { useState, useEffect } from 'react';
import { 
  Calendar, Check, Plus, Trash2, ShieldCheck, Heart, Sparkles, 
  Clock, Activity, AlertCircle, FileText, ChevronDown, ChevronUp 
} from 'lucide-react';
import { EXERCISES } from '../data/exercises';

export interface WorkoutLogEntry {
  id: string;
  date: string;
  workoutType: 'Treino A' | 'Treino B' | 'Treino Personalizado';
  exercises: string[];
  bandUsed: string;
  repsDone: string;
  perceivedEffort: 'Leve' | 'Moderado' | 'Difícil';
  comfortLevel: 'Confortável' | 'Precisei adaptar' | 'Interrompi';
  notes?: string;
  createdAt: number;
}

interface Props {
  initialFormValues?: {
    routineId: string;
    exercisesDone: string[];
    date: string;
  } | null;
  onClearInitialValues?: () => void;
}

const STORAGE_KEY = 'acelerador_gluteos_workout_logs';

export const WorkoutTracker: React.FC<Props> = ({ initialFormValues, onClearInitialValues }) => {
  const [logs, setLogs] = useState<WorkoutLogEntry[]>([]);
  const [showNewEntryForm, setShowNewEntryForm] = useState<boolean>(false);

  // Form State
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [workoutType, setWorkoutType] = useState<'Treino A' | 'Treino B' | 'Treino Personalizado'>('Treino A');
  const [selectedExercises, setSelectedExercises] = useState<string[]>([
    'Elevação pélvica com faixa',
    'Agachamento com faixa'
  ]);
  const [bandUsed, setBandUsed] = useState<string>('Faixa Leve');
  const [repsDone, setRepsDone] = useState<string>('2 séries de 10 reps');
  const [perceivedEffort, setPerceivedEffort] = useState<'Leve' | 'Moderado' | 'Difícil'>('Moderado');
  const [comfortLevel, setComfortLevel] = useState<'Confortável' | 'Precisei adaptar' | 'Interrompi'>('Confortável');
  const [notes, setNotes] = useState<string>('');

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setLogs(JSON.parse(saved));
      } else {
        // Sample starter log for educational demonstration
        const initialSample: WorkoutLogEntry[] = [
          {
            id: 'sample-1',
            date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
            workoutType: 'Treino A',
            exercises: ['Elevação pélvica com faixa', 'Agachamento com faixa', 'Passo lateral com faixa', 'Abertura da perna deitada de lado'],
            bandUsed: 'Faixa Leve',
            repsDone: '2 séries de 8 a 10 reps',
            perceivedEffort: 'Moderado',
            comfortLevel: 'Confortável',
            notes: 'Foquei em pausar no alto na elevação pélvica sem forçar a lombar.',
            createdAt: Date.now() - 4 * 86400000
          }
        ];
        setLogs(initialSample);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSample));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Handle incoming trigger from interactive player
  useEffect(() => {
    if (initialFormValues) {
      if (initialFormValues.routineId.includes('Treino A')) {
        setWorkoutType('Treino A');
      } else if (initialFormValues.routineId.includes('Treino B')) {
        setWorkoutType('Treino B');
      } else {
        setWorkoutType('Treino Personalizado');
      }
      if (initialFormValues.exercisesDone && initialFormValues.exercisesDone.length > 0) {
        setSelectedExercises(initialFormValues.exercisesDone);
      }
      if (initialFormValues.date) {
        setDate(initialFormValues.date);
      }
      setShowNewEntryForm(true);
      if (onClearInitialValues) {
        onClearInitialValues();
      }
    }
  }, [initialFormValues, onClearInitialValues]);

  const saveLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: WorkoutLogEntry = {
      id: `log-${Date.now()}`,
      date,
      workoutType,
      exercises: selectedExercises.length > 0 ? selectedExercises : ['Exercícios livres com faixa'],
      bandUsed,
      repsDone,
      perceivedEffort,
      comfortLevel,
      notes: notes.trim(),
      createdAt: Date.now()
    };

    const updated = [newEntry, ...logs];
    setLogs(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
    setShowNewEntryForm(false);
    setNotes('');
  };

  const deleteLog = (id: string) => {
    const updated = logs.filter((item) => item.id !== id);
    setLogs(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const toggleExerciseSelection = (name: string) => {
    if (selectedExercises.includes(name)) {
      setSelectedExercises(selectedExercises.filter((e) => e !== name));
    } else {
      setSelectedExercises([...selectedExercises, name]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Educational Banner Mandated by Spec */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300">
        <div className="flex items-start gap-3">
          <Heart className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-semibold text-slate-100">
              Acompanhe sua prática, não julgue seu corpo.
            </p>
            <p className="text-slate-400 leading-relaxed">
              O app não prevê mudanças de medidas, formato ou volume dos glúteos. O foco é consistência, saúde articular e fortalecimento progressivo com técnica segura.
            </p>
          </div>
        </div>
      </div>

      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-100">Meu Acompanhamento</h2>
          <p className="text-xs text-slate-400">
            {logs.length} {logs.length === 1 ? 'registro salvo' : 'registros salvos'} no seu dispositivo
          </p>
        </div>

        <button
          onClick={() => setShowNewEntryForm(!showNewEntryForm)}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-rose-600/20 active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" />
          {showNewEntryForm ? 'Cancelar' : 'Registrar Novo Treino'}
        </button>
      </div>

      {/* New Log Form Modal / Expansion */}
      {showNewEntryForm && (
        <form
          onSubmit={saveLog}
          className="p-5 rounded-2xl bg-slate-900 border border-rose-500/30 shadow-xl space-y-4"
        >
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-100">Registrar Sessão de Treino</h3>
            <p className="text-xs text-slate-400 mt-0.5">Preencha os dados do treino realizado hoje.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Data do Treino
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Workout Type */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Tipo de Treino
              </label>
              <select
                value={workoutType}
                onChange={(e) => setWorkoutType(e.target.value as 'Treino A' | 'Treino B' | 'Treino Personalizado')}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-rose-500"
              >
                <option value="Treino A">Treino A — Iniciante (Ponte, Agachamento, Passadas, Abdução)</option>
                <option value="Treino B">Treino B — Iniciante (Dobradiça, Afundo, 4 Apoios, Abdução em pé)</option>
                <option value="Treino Personalizado">Treino Personalizado / Avulso</option>
              </select>
            </div>
          </div>

          {/* Exercises Completed */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Exercícios Realizados (toque para marcar/desmarcar)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {EXERCISES.map((ex) => {
                const isSelected = selectedExercises.includes(ex.name);
                return (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => toggleExerciseSelection(ex.name)}
                    className={`p-2 rounded-xl text-left text-xs transition-colors border flex items-center justify-between ${
                      isSelected
                        ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="truncate pr-2">{ex.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Band Used */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Faixa Elástica Utilizada
              </label>
              <select
                value={bandUsed}
                onChange={(e) => setBandUsed(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-rose-500"
              >
                <option value="Sem faixa (apenas peso corporal)">Sem faixa (apenas peso corporal)</option>
                <option value="Faixa Leve (baixa tensão)">Faixa Leve (baixa tensão)</option>
                <option value="Faixa Média (tensão moderada)">Faixa Média (tensão moderada)</option>
                <option value="Faixa Forte (alta tensão)">Faixa Forte (alta tensão)</option>
                <option value="Elástico longo / tubo">Elástico longo / tubo</option>
              </select>
            </div>

            {/* Reps */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Repetições Realizadas
              </label>
              <input
                type="text"
                placeholder="Ex: 2 séries de 10 reps com controle"
                value={repsDone}
                onChange={(e) => setRepsDone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Effort & Comfort */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Perceived Effort */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Esforço Percebido
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Leve', 'Moderado', 'Difícil'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setPerceivedEffort(level)}
                    className={`py-2 rounded-xl text-xs font-medium border text-center transition-colors ${
                      perceivedEffort === level
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Comfort Level */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Nível de Conforto
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['Confortável', 'Precisei adaptar', 'Interrompi'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setComfortLevel(status)}
                    className={`py-2 px-1 rounded-xl text-[11px] font-medium border text-center transition-colors truncate ${
                      comfortLevel === status
                        ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Observações Opcionais (sensações, adaptações, postura)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Executei o agachamento com apoio de cadeira, sem desconforto lombar."
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-rose-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setShowNewEntryForm(false)}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200 bg-slate-800/60"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20"
            >
              Salvar Registro
            </button>
          </div>
        </form>
      )}

      {/* Logs History List */}
      <div className="space-y-3">
        {logs.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400">
            <Calendar className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-300">Nenhum treino registrado ainda</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Quando você concluir um Treino A ou B, registre aqui para acompanhar sua consistência técnica.
            </p>
          </div>
        ) : (
          logs.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700/80 transition-colors space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <span>{entry.date}</span>
                    <span>·</span>
                    <span className="text-rose-400 font-sans font-semibold">{entry.workoutType}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-200 mt-0.5">
                    {entry.exercises.length} {entry.exercises.length === 1 ? 'exercício realizado' : 'exercícios realizados'}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                      entry.comfortLevel === 'Confortável'
                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60'
                        : entry.comfortLevel === 'Precisei adaptar'
                        ? 'bg-amber-950/40 text-amber-300 border-amber-800/60'
                        : 'bg-rose-950/40 text-rose-300 border-rose-800/60'
                    }`}
                  >
                    {entry.comfortLevel}
                  </span>
                  <button
                    onClick={() => deleteLog(entry.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                    title="Excluir registro"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Tagged info */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-400 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/60">
                <div>
                  <span className="text-[10px] text-slate-500 block">Faixa</span>
                  <span className="text-slate-300 font-medium">{entry.bandUsed}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Repetições</span>
                  <span className="text-slate-300 font-medium font-mono">{entry.repsDone}</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-500 block">Esforço</span>
                  <span className="text-slate-300 font-medium">{entry.perceivedEffort}</span>
                </div>
              </div>

              {/* Exercise Pills list */}
              <div className="flex flex-wrap gap-1.5">
                {entry.exercises.map((name, i) => (
                  <span
                    key={i}
                    className="text-[11px] text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/50"
                  >
                    {name}
                  </span>
                ))}
              </div>

              {entry.notes && (
                <p className="text-xs text-slate-400 italic bg-slate-950/30 p-2 rounded-lg border border-slate-800/40">
                  “{entry.notes}”
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
