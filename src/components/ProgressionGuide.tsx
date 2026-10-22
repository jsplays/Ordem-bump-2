import React from 'react';
import { WEEKLY_SCHEDULE } from '../data/workouts';
import { Calendar, TrendingUp, Sparkles, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export const ProgressionGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <div className="text-xs text-rose-400 font-semibold mb-1">Rotina & Consistência</div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Frequência e progressão</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
          Comece com <strong className="text-slate-200">dois treinos por semana</strong>, deixando dias de descanso entre eles. O Colégio Americano de Medicina do Esporte (ACSM) destaca que a consistência e o treino de força regular são mais importantes do que rotinas complexas.
        </p>
      </div>

      {/* Suggested Weekly Calendar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-semibold text-slate-200">
              Exemplo de Semana Inicial Equilibrada
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">2 treinos + descanso</span>
        </div>

        <div className="space-y-1.5">
          {WEEKLY_SCHEDULE.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 transition-colors ${
                item.type === 'workout'
                  ? 'bg-rose-950/20 border-rose-900/40 text-slate-200'
                  : item.type === 'light'
                  ? 'bg-indigo-950/20 border-indigo-900/30 text-slate-300'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.type === 'workout'
                      ? 'bg-rose-500'
                      : item.type === 'light'
                      ? 'bg-indigo-400'
                      : 'bg-slate-600'
                  }`}
                />
                <span className="text-xs font-bold text-slate-200 w-28 shrink-0">
                  {item.day}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    item.type === 'workout'
                      ? 'text-rose-300'
                      : item.type === 'light'
                      ? 'text-indigo-300'
                      : 'text-slate-400'
                  }`}
                >
                  {item.activity}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 sm:text-right pl-4 sm:pl-0">
                {item.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Progression Golden Rule */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-rose-400 text-sm font-bold">
          <TrendingUp className="w-5 h-5" />
          Como progredir: Mude uma coisa por vez
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Para que o corpo se adapte sem sobrecarregar tendões e articulações, siga esta sequência pedagógica:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">Etapa 1</span>
            <h4 className="text-xs font-bold text-slate-200">Aprenda a mecânica sem pressa</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Priorize ritmo, alinhamento dos joelhos e respiração livre antes de pensar em carga ou velocidade.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">Etapa 2</span>
            <h4 className="text-xs font-bold text-slate-200">Aumente repetições dentro da faixa</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Se você faz 8 repetições confortáveis, tente progredir para 10 e depois 12 repetições com a mesma faixa.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">Etapa 3</span>
            <h4 className="text-xs font-bold text-slate-200">Aumente a resistência da faixa</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Apenas quando a faixa leve parecer fácil e as 12 repetições saírem com controle, migre para a faixa média.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">Etapa 4</span>
            <h4 className="text-xs font-bold text-slate-200">Regrida se houver dor ou perda de técnica</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Se precisar arquear as costas, dar trancos ou sentir desconforto no joelho, retorne imediatamente à versão mais leve.
            </p>
          </div>
        </div>
      </div>

      {/* No fixed days claim */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Não é necessário aumentar a dificuldade toda semana. O app evita prometer “resultado em X dias” porque adaptações musculares dependem da individualidade biológica, tempo de descanso e consistência de longo prazo.
        </p>
      </div>
    </div>
  );
};
