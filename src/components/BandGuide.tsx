import React, { useState } from 'react';
import { BAND_LEVELS } from '../data/workouts';
import { ShieldCheck, AlertTriangle, CheckCircle, Info, Sparkles, HelpCircle } from 'lucide-react';

export const BandGuide: React.FC = () => {
  const [selectedBand, setSelectedBand] = useState<number>(0);

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <div>
        <div className="text-xs text-rose-400 font-semibold mb-1">Guia de Equipamento</div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Qual faixa escolher?</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
          As cores <strong className="text-slate-200">não indicam a mesma resistência em todas as marcas</strong>. Confira a embalagem ou as especificações do fabricante. Comece com uma resistência que permita executar todas as repetições com controle e sem dor.
        </p>
      </div>

      {/* Practical Rule Callout */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
        <Info className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300">
          <strong className="text-slate-100 block mb-0.5">Regra prática de ouro:</strong>
          Se você não consegue manter a postura ou precisa dar trancos para completar o movimento, escolha uma faixa mais leve ou reduza a tensão. O benefício do exercício vem do controle muscular, não do esforço compensado.
        </div>
      </div>

      {/* Interactive Band Table / Selector */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Níveis de Resistência Percebida
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {BAND_LEVELS.map((band, idx) => {
            const isSelected = selectedBand === idx;
            return (
              <button
                key={band.level}
                onClick={() => setSelectedBand(idx)}
                className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-rose-500 shadow-lg shadow-rose-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                        idx === 0
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                          : idx === 1
                          ? 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
                          : 'bg-rose-950/60 text-rose-300 border border-rose-800/60'
                      }`}
                    >
                      Resistência {band.level}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{band.tensionKg}</span>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-200 mt-2 mb-1">
                    Como deve parecer:
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{band.feel}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block mb-0.5">
                    Para quem pode ser uma opção:
                  </span>
                  <p className="text-xs text-slate-300">{band.targetUser}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progression Strategy */}
      <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 space-y-2">
        <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          Dica de progressão gradual
        </div>
        <p className="text-xs text-indigo-200/90 leading-relaxed">
          Não é preciso escolher a faixa mais forte para ter um bom treino. Primeiro, pratique com controle. Quando a faixa ficar fácil e você conseguir fazer mais repetições mantendo a técnica, aumente a dificuldade aos poucos.
        </p>
      </div>

      {/* Safety of the Band - Inspection Protocol */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
          <ShieldCheck className="w-5 h-5" />
          Segurança e integridade da faixa elástica
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Antes de qualquer uso, examine minuciosamente a faixa:
        </p>

        <ul className="space-y-2 text-xs text-slate-300">
          <li className="flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/60">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>
              <strong>Não use se houver danos:</strong> Descarte faixas com cortes, microfissuras, partes afinadas, ressecamento ou sinais de desgaste.
            </span>
          </li>
          <li className="flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/60">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Respeite o limite elástico:</strong> Evite esticá-la além das instruções do fabricante e mantenha sempre o rosto fora da trajetória da faixa.
            </span>
          </li>
          <li className="flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/60">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Proibido improvisar ancoragem:</strong> Os exercícios deste guia usam principalmente faixas circulares ou elásticos longos sem ancoragem. O app não deve instruir o usuário a prender a faixa em maçanetas, móveis instáveis ou portas sem acessório homologado.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
