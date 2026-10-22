import React, { useState } from 'react';
import { FAQS } from '../data/workouts';
import { ChevronDown, HelpCircle, ShieldCheck, FileText, AlertTriangle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <div className="text-xs text-rose-400 font-semibold mb-1">Dúvidas Frequentes</div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Perguntas frequentes</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
          Respostas claras, científicas e transparentes sobre o uso de faixas elásticas e o fortalecimento de glúteos.
        </p>
      </div>

      {/* Accordion FAQ Items */}
      <div className="space-y-2.5">
        {FAQS.map((faq, idx) => {
          const isOpen = openFaqIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? 'bg-slate-900 border-rose-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-slate-200"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-rose-400 flex items-center justify-center text-[11px] font-mono shrink-0">
                    ?
                  </span>
                  <span>{faq.question}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-rose-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-800/60 space-y-2.5">
                  <p className="text-xs text-slate-300 leading-relaxed">{faq.answer}</p>
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-rose-300 flex items-center gap-2">
                    <span className="font-semibold text-rose-400 shrink-0">Ponto-chave:</span>
                    <span className="text-slate-300">{faq.keyTakeaway}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Official Legal & Health Educational Disclaimer */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          Aviso Educativo e de Saúde Completo
        </div>

        <blockquote className="text-xs text-slate-400 leading-relaxed border-l-2 border-rose-500/40 pl-3 italic">
          “Este material é exclusivamente educativo e não substitui consulta, diagnóstico, tratamento ou orientação individual de profissionais de saúde ou educação física. Os exercícios não prometem aumento, arredondamento, crescimento acelerado ou transformação específica dos glúteos. Os resultados variam entre pessoas e dependem de diversos fatores. Comece com movimentos e resistência leves; não faça exercícios que causem dor. Se você tem lesão, dor persistente, cirurgia recente, está grávida ou no pós-parto, ou recebeu orientação para limitar exercícios, procure orientação profissional antes de iniciar. Inspecione as faixas antes do uso e não utilize materiais danificados.”
        </blockquote>

        <div className="pt-2 text-[11px] text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
          <span>· Baseado em diretrizes do ACSM</span>
          <span>· Foco em precisão biomecânica</span>
          <span>· Sem promessas milagrosas</span>
        </div>
      </div>
    </div>
  );
};
