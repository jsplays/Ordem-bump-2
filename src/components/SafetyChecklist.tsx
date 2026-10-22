import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, Stethoscope, ChevronRight } from 'lucide-react';

export const SafetyChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true
  });

  const checklist = [
    {
      id: 0,
      title: 'Ambiente seguro e piso firme',
      desc: 'Use um espaço livre de tropeços, tapete firme e roupa confortável que permita flexão livre de quadris e joelhos.'
    },
    {
      id: 1,
      title: 'Inspeção da faixa elástica',
      desc: 'Verifique se o elástico está sem ranhuras, furos ou partes esgarçadas. Mantenha longe de anéis, unhas afiadas e quinas.'
    },
    {
      id: 2,
      title: 'Controle contínuo na volta (fase excêntrica)',
      desc: 'Faça as repetições de modo suave e cadenciado. Nunca solte a faixa de repente para não ricochetear.'
    },
    {
      id: 3,
      title: 'Comece com dose e amplitude leves',
      desc: 'Priorize aprender a mecânica do movimento antes de tentar aumentar a resistência da faixa ou a quantidade de repetições.'
    },
    {
      id: 4,
      title: 'Parar imediatamente em caso de sintomas anormais',
      desc: 'Interrompa o exercício na hora se sentir dor aguda, pontada na articulação, tontura, falta de ar ou mal-estar geral.'
    }
  ];

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const allChecked = checklist.every((item) => checkedItems[item.id]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <div className="text-xs text-rose-400 font-semibold mb-1">Prevenção e Cuidado</div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Segurança antes de começar</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
          O exercício físico deve ser uma experiência construtiva e segura. Siga as orientações abaixo antes de iniciar qualquer sessão de treino.
        </p>
      </div>

      {/* Interactive Safety Checklist */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-semibold text-slate-200">
            Checklist Rápido Pré-Treino
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            {Object.values(checkedItems).filter(Boolean).length} de {checklist.length} revisados
          </span>
        </div>

        <div className="space-y-2">
          {checklist.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleCheck(item.id)}
                className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                  isChecked
                    ? 'bg-slate-950/80 border-emerald-500/40 text-slate-200'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                    isChecked
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : 'border-slate-700 bg-slate-900'
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Muscle Burn vs Joint Pain Callout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 space-y-1.5">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            Desconforto Muscular Leve
          </div>
          <p className="text-xs text-amber-200/80 leading-relaxed">
            Pode acontecer durante o esforço nas últimas repetições da série. É uma sensação difusa de cansaço muscular temporário que cessa pouco após a pausa.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-1.5">
          <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            Dor Articular ou Aguda
          </div>
          <p className="text-xs text-rose-200/80 leading-relaxed">
            Pontadas no joelho, quadril ou coluna lombar que pioram com o movimento <strong>não devem ser ignoradas</strong>. Interrompa a sessão imediatamente.
          </p>
        </div>
      </div>

      {/* Medical Referral Box */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
        <Stethoscope className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 space-y-1">
          <strong className="text-slate-100 block">Quando procurar avaliação médica prévia:</strong>
          <p className="text-slate-400 leading-relaxed">
            Se você tem uma lesão prévia, dor crônica persistente, passou por cirurgia recente, está grávida ou no pós-parto, ou recebeu orientação clínica para limitar exercícios físicos, consulte um médico ou fisioterapeuta antes de iniciar este programa educativo.
          </p>
        </div>
      </div>
    </div>
  );
};
