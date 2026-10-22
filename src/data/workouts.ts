export interface WorkoutRoutine {
  id: 'treino-a' | 'treino-b';
  title: string;
  badge: string;
  focus: string;
  duration: string;
  description: string;
  exerciseIds: number[];
  restRecommendation: string;
  effortGuideline: string;
}

export const WORKOUT_ROUTINES: WorkoutRoutine[] = [
  {
    id: 'treino-a',
    title: 'Treino A — Iniciante',
    badge: 'Sessão A',
    focus: 'Extensão de quadril + Agachamento + Abduções dinâmicas',
    duration: '20–25 minutos',
    description: 'Combina elevação pélvica no solo, agachamento controlado, passadas laterais e abdução deitada para trabalhar glúteo máximo e médio com segurança.',
    exerciseIds: [1, 2, 6, 5], // Elevação pélvica, Agachamento, Passo lateral, Abertura de perna deitada
    restRecommendation: '60–120 segundos entre as séries (descanse o suficiente para manter a técnica impecável).',
    effortGuideline: 'Termine cada série sentindo que ainda conseguiria fazer 2 ou 3 repetições mantendo a técnica (sem falhar).'
  },
  {
    id: 'treino-b',
    title: 'Treino B — Iniciante',
    badge: 'Sessão B',
    focus: 'Dobradiça de quadril + Unilateral com apoio + Extensão em 4 apoios',
    duration: '20–25 minutos',
    description: 'Focado no padrão de dobradiça com elástico longo, afundo com apoio para membros inferiores, coice em quatro apoios e abdução em pé para estabilidade pélvica.',
    exerciseIds: [3, 8, 4, 7], // Inclinação de quadril com elástico, Afundo para trás com apoio, Coice em quatro apoios, Abdução de quadril em pé
    restRecommendation: '60–120 segundos entre as séries e trocas de lado.',
    effortGuideline: 'Qualidade do movimento acima da carga. Se houver desequilíbrio ou tranco, reduza o ritmo.'
  }
];

export interface WeeklyScheduleDay {
  day: string;
  activity: string;
  type: 'workout' | 'rest' | 'light';
  note: string;
}

export const WEEKLY_SCHEDULE: WeeklyScheduleDay[] = [
  { day: 'Segunda-feira', activity: 'Treino A', type: 'workout', note: 'Extensão pélvica, agachamento, passadas e abdução lateral' },
  { day: 'Terça-feira', activity: 'Descanso ou atividade leve', type: 'light', note: 'Alongamento suave ou caminhada leve opcional' },
  { day: 'Quarta-feira', activity: 'Descanso completo', type: 'rest', note: 'Recuperação muscular e articular passiva' },
  { day: 'Quinta-feira', activity: 'Treino B', type: 'workout', note: 'Dobradiça de quadril, afundo com apoio e coice' },
  { day: 'Sexta-feira', activity: 'Descanso completo', type: 'rest', note: 'Pausa para recuperação equilibrada' },
  { day: 'Sábado', activity: 'Caminhada ou atividade leve', type: 'light', note: 'Passeio ao ar livre se sentir disposição e conforto' },
  { day: 'Domingo', activity: 'Descanso', type: 'rest', note: 'Dia livre para relaxamento e regeneração' }
];

export interface FaqItem {
  question: string;
  answer: string;
  keyTakeaway: string;
}

export const FAQS: FaqItem[] = [
  {
    question: '“O elástico arredonda o bumbum?”',
    answer: 'O elástico pode oferecer resistência em exercícios e ajudar a fortalecer os músculos quando o treino é apropriado e progressivo. Não garante um formato específico nem controla onde o corpo acumula ou perde gordura. O formato corporal é influenciado por genética, estrutura óssea e composição global.',
    keyTakeaway: 'Fortalecimento muscular sim; garantia de formato estético não.'
  },
  {
    question: '“Preciso usar a faixa mais forte?”',
    answer: 'Não. Use uma resistência que permita executar o movimento com total controle, amplitude adequada e sem dor. A cor da faixa varia conforme a marca; confira sempre as informações do fabricante em vez de confiar apenas na cor.',
    keyTakeaway: 'Faixas muito duras levam a compensações articulares indesejadas.'
  },
  {
    question: '“Devo fazer os oito exercícios todos os dias?”',
    answer: 'Não. O produto oferece opções estruturadas em Treinos A e B para alternar os movimentos. Comece com dois treinos semanais e deixe tempo para descanso muscular. Ajuste a frequência de acordo com seu condicionamento e conforto.',
    keyTakeaway: 'O músculo se adapta e recupera nos dias de descanso.'
  },
  {
    question: '“É normal sentir queimação?”',
    answer: 'O esforço muscular pode gerar sensação de cansaço ou ardor metabólico durante a série, mas isso não prova que o exercício está “funcionando melhor” ou mudando mais a região. Dor aguda, pontadas articulares, tontura ou mal-estar são motivos para interromper imediatamente.',
    keyTakeaway: 'Queimação é apenas acúmulo temporário de metabólitos, não métrica de eficácia.'
  },
  {
    question: '“Preciso sentir exatamente o glúteo?”',
    answer: 'Não necessariamente. Exercícios compostos e funcionais envolvem também quadríceps, isquiotibiais e estabilizadores do tronco. Use a qualidade do movimento, o controle da postura e a ausência de dor como referências principais — não apenas a sensação de queimação localizada.',
    keyTakeaway: 'A biomecânica correta ativa a musculatura sem necessidade de obsessão com queimação.'
  },
  {
    question: '“Posso prender a faixa na porta?”',
    answer: 'Não use maçanetas, móveis instáveis ou improvisações caseiras. Este guia foi desenhado intencionalmente com foco em exercícios sem ancoragem externa. Se outra rotina usar um ponto de ancoragem, ele precisa ser um acessório homologado e instalado conforme as instruções estritas do fabricante.',
    keyTakeaway: 'Nunca improvise pontos de apoio em portas, trincos ou móveis.'
  }
];

export interface BandLevel {
  level: string;
  feel: string;
  targetUser: string;
  tensionKg: string;
  colorReference: string;
}

export const BAND_LEVELS: BandLevel[] = [
  {
    level: 'Leve',
    feel: 'O movimento é suave e controlado; as últimas repetições da série ficam apenas um pouco mais desafiadoras.',
    targetUser: 'Ideal para aprender a técnica motora, iniciantes ou quem está retornando gradualmente aos treinos.',
    tensionKg: '~2 a 4 kg',
    colorReference: 'Frequentemente verde claro ou amarelo (verifique a embalagem)'
  },
  {
    level: 'Média',
    feel: 'O movimento segue rigorosamente estável e controlado, mas exige esforço moderado nas repetições finais.',
    targetUser: 'Para quem já domina completamente a versão leve com postura neutra e sem compensações.',
    tensionKg: '~5 a 8 kg',
    colorReference: 'Frequentemente azul ou vermelho (varia por marca)'
  },
  {
    level: 'Forte',
    feel: 'A faixa oferece resistência substancial e pode facilmente desestabilizar a técnica se a musculatura cansar.',
    targetUser: 'Apenas para quem consegue manter a execução estável do início ao fim sem dar trancos.',
    tensionKg: '~9 a 14+ kg',
    colorReference: 'Frequentemente preto, roxo ou cinza escuro'
  }
];
