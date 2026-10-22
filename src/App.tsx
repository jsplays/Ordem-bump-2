/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Home, Dumbbell, Calendar, Heart, BookOpen, Layers, 
  Shield, Compass, HelpCircle, Menu, X, Play, ChevronRight, Activity 
} from 'lucide-react';
import { HomeOverview } from './components/HomeOverview';
import { AnatomyEducation } from './components/AnatomyEducation';
import { BandGuide } from './components/BandGuide';
import { SafetyChecklist } from './components/SafetyChecklist';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { WorkoutsView } from './components/WorkoutsView';
import { ProgressionGuide } from './components/ProgressionGuide';
import { WorkoutTracker } from './components/WorkoutTracker';
import { FaqSection } from './components/FaqSection';
import { WorkoutPlayerModal } from './components/WorkoutPlayerModal';
import { WORKOUT_ROUTINES, WorkoutRoutine } from './data/workouts';
import { EXERCISES, Exercise } from './data/exercises';

type SectionId = 
  | 'inicio' 
  | 'anatomia' 
  | 'faixas' 
  | 'seguranca' 
  | 'exercicios' 
  | 'treinos' 
  | 'progressao' 
  | 'diario' 
  | 'faq';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('inicio');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeRoutineForPlayer, setActiveRoutineForPlayer] = useState<WorkoutRoutine | null>(null);

  // Cross-component data for logging finished workouts
  const [pendingLogData, setPendingLogData] = useState<{
    routineId: string;
    exercisesDone: string[];
    date: string;
  } | null>(null);

  const navigationItems = [
    { id: 'inicio', label: '1. Início', icon: Home, shortLabel: 'Início' },
    { id: 'anatomia', label: '2. Entenda os Glúteos', icon: Layers, shortLabel: 'Glúteos' },
    { id: 'faixas', label: '3. Escolha do Elástico', icon: Compass, shortLabel: 'Faixas' },
    { id: 'seguranca', label: '4. Segurança Antes', icon: Shield, shortLabel: 'Segurança' },
    { id: 'exercicios', label: '5. Biblioteca de 8 Exercícios', icon: Dumbbell, shortLabel: 'Exercícios' },
    { id: 'treinos', label: '6. Treinos A e B', icon: Activity, shortLabel: 'Treinos' },
    { id: 'progressao', label: '7. Frequência & Progressão', icon: Calendar, shortLabel: 'Progresso' },
    { id: 'diario', label: '8. Meu Acompanhamento', icon: Heart, shortLabel: 'Diário' },
    { id: 'faq', label: '9. Avisos & Perguntas Frequentes', icon: HelpCircle, shortLabel: 'Avisos & FAQ' },
  ];

  const handleStartWorkout = (routine: WorkoutRoutine) => {
    setActiveRoutineForPlayer(routine);
  };

  const handleStartSingleExercise = (exercise: Exercise) => {
    const singleRoutine: WorkoutRoutine = {
      id: 'treino-a',
      title: exercise.name,
      badge: 'Treino Focado',
      focus: exercise.targetMovement,
      duration: '5–10 minutos',
      description: `Sessão educativa focada em aperfeiçoar a técnica de ${exercise.name}.`,
      exerciseIds: [exercise.id],
      restRecommendation: '60–90 segundos entre séries.',
      effortGuideline: 'Priorize controle técnico sem impulso.'
    };
    setActiveRoutineForPlayer(singleRoutine);
  };

  const handleFinishWorkout = (data: { routineId: string; exercisesDone: string[]; date: string }) => {
    setActiveRoutineForPlayer(null);
    setPendingLogData(data);
    setActiveSection('diario');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-rose-500/20 selection:text-rose-200">
      {/* Top Bar Contract: Brand Wordmark — Nav/Menu — Primary Action */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-1.5 -ml-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors md:hidden"
            aria-label="Abrir menu de navegação"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveSection('inicio')}
            className="text-left flex items-center gap-2 group"
          >
            <span className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold text-xs shadow-sm shadow-rose-600/30">
              AB
            </span>
            <span className="text-sm font-bold tracking-tight text-slate-100 group-hover:text-rose-300 transition-colors whitespace-nowrap">
              Acelerador de Bumbum
            </span>
          </button>
        </div>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs text-slate-400">
          <button
            onClick={() => setActiveSection('inicio')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeSection === 'inicio' ? 'bg-slate-900 text-slate-100 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Início
          </button>
          <button
            onClick={() => setActiveSection('exercicios')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeSection === 'exercicios' ? 'bg-slate-900 text-slate-100 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            8 Exercícios
          </button>
          <button
            onClick={() => setActiveSection('treinos')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeSection === 'treinos' ? 'bg-slate-900 text-slate-100 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Treinos A e B
          </button>
          <button
            onClick={() => setActiveSection('diario')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeSection === 'diario' ? 'bg-slate-900 text-slate-100 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Meu Acompanhamento
          </button>
          <button
            onClick={() => setActiveSection('faq')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeSection === 'faq' ? 'bg-slate-900 text-slate-100 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Avisos & FAQ
          </button>
        </nav>

        {/* Primary Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleStartWorkout(WORKOUT_ROUTINES[0])}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-sm shadow-rose-600/20 active:scale-[0.98] transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Treinar Agora</span>
          </button>
        </div>
      </header>

      {/* Main Responsive Layout Canvas */}
      <div className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12">
        {/* Navigation Breadcrumb / Section Header for deep chapters */}
        {activeSection !== 'inicio' && (
          <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <button
                onClick={() => setActiveSection('inicio')}
                className="hover:text-slate-300 transition-colors"
              >
                Início
              </button>
              <span>/</span>
              <span className="text-slate-300 font-medium capitalize">
                {navigationItems.find((n) => n.id === activeSection)?.label}
              </span>
            </div>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
            >
              <span>Todos os capítulos</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Section Views */}
        {activeSection === 'inicio' && (
          <HomeOverview
            onStartRoutine={handleStartWorkout}
            onNavigate={(id) => setActiveSection(id as SectionId)}
          />
        )}

        {activeSection === 'anatomia' && <AnatomyEducation />}

        {activeSection === 'faixas' && <BandGuide />}

        {activeSection === 'seguranca' && <SafetyChecklist />}

        {activeSection === 'exercicios' && (
          <ExerciseLibrary onStartSingleExerciseWorkout={handleStartSingleExercise} />
        )}

        {activeSection === 'treinos' && (
          <WorkoutsView
            onStartWorkout={handleStartWorkout}
            onSelectExercise={(id) => {
              setActiveSection('exercicios');
            }}
          />
        )}

        {activeSection === 'progressao' && <ProgressionGuide />}

        {activeSection === 'diario' && (
          <WorkoutTracker
            initialFormValues={pendingLogData}
            onClearInitialValues={() => setPendingLogData(null)}
          />
        )}

        {activeSection === 'faq' && <FaqSection />}
      </div>

      {/* Mobile Fixed Bottom Tab Bar (Navigation Anchor - Pattern 1) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-md border-t border-slate-800/80 px-2 py-1.5 md:hidden">
        <div className="grid grid-cols-5 items-center max-w-md mx-auto">
          {/* Tab 1: Início */}
          <button
            onClick={() => setActiveSection('inicio')}
            className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
              activeSection === 'inicio' ? 'text-rose-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[10px] mt-1">Início</span>
          </button>

          {/* Tab 2: Exercícios */}
          <button
            onClick={() => setActiveSection('exercicios')}
            className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
              activeSection === 'exercicios' ? 'text-rose-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            <span className="text-[10px] mt-1">Exercícios</span>
          </button>

          {/* Tab 3: Treinos A & B */}
          <button
            onClick={() => setActiveSection('treinos')}
            className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
              activeSection === 'treinos' ? 'text-rose-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span className="text-[10px] mt-1">Treinos</span>
          </button>

          {/* Tab 4: Diário */}
          <button
            onClick={() => setActiveSection('diario')}
            className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
              activeSection === 'diario' ? 'text-rose-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span className="text-[10px] mt-1">Diário</span>
          </button>

          {/* Tab 5: Menu / Guia completo */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
              isMenuOpen ? 'text-rose-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Menu className="w-4 h-4" />
            <span className="text-[10px] mt-1">Capítulos</span>
          </button>
        </div>
      </div>

      {/* Slide-over Full Chapter Navigation Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer content */}
          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-slate-900 border-l border-slate-800 h-full p-5 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-100">Índice do Guia</h3>
                  <p className="text-[11px] text-slate-400">9 seções educativas completas</p>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                  aria-label="Fechar menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation List */}
              <div className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id as SectionId);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full p-2.5 rounded-xl text-left text-xs transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-rose-400' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Educational Disclaimer Note */}
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 space-y-1">
              <p className="font-semibold text-slate-400">Acelerador de Bumbum com Elásticos</p>
              <p>Treino educativo sem promessas de transformação específica.</p>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Workout Player Modal */}
      {activeRoutineForPlayer && (
        <WorkoutPlayerModal
          routine={activeRoutineForPlayer}
          onClose={() => setActiveRoutineForPlayer(null)}
          onFinishAndLog={handleFinishWorkout}
        />
      )}
    </div>
  );
}
