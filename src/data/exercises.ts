export interface Exercise {
  id: number;
  name: string;
  subtitle?: string;
  targetMovement: string;
  bandType: string;
  bandPlacement: string;
  primaryMuscles: { name: string; role: string; type: 'gluteo-maximo' | 'gluteo-medio' | 'outros' }[];
  howTo: string[];
  initialDose: string;
  defaultSets: number;
  defaultReps: string;
  breathing: string;
  keyTip: string;
  whatToAvoid: string;
  easierOption: string;
  harderOption: string;
  safetyNotes: string;
  movementCategory: 'extensao' | 'agachamento' | 'dobradica' | 'abducao' | 'unilateral';
  visualType: 'pelvic-bridge' | 'squat' | 'rdl-hinge' | 'donkey-kick' | 'side-lying-abduction' | 'lateral-walk' | 'standing-abduction' | 'reverse-lunge';
  imageUrl: string;
  externalImageUrl: string;
}

export const EXERCISES: Exercise[] = [
  {
    id: 1,
    name: 'Elevação pélvica com faixa',
    targetMovement: 'Praticar a extensão do quadril e trabalhar os glúteos.',
    bandType: 'Faixa circular (mini band)',
    bandPlacement: 'Colocada acima dos joelhos. A faixa adiciona resistência para manter os joelhos afastados; o movimento de elevar o quadril é feito pelo corpo.',
    primaryMuscles: [
      { name: 'Glúteo Máximo', role: 'Motor principal na extensão do quadril', type: 'gluteo-maximo' },
      { name: 'Glúteo Médio', role: 'Estabilizador contra a tensão elástica dos joelhos', type: 'gluteo-medio' },
      { name: 'Posteriores de Coxa', role: 'Auxiliares na extensão', type: 'outros' }
    ],
    howTo: [
      'Deite-se de costas no tapete ou colchonete, com os joelhos dobrados e os pés apoiados firmemente no chão.',
      'Posicione a faixa circular 3 a 5 cm acima da linha dos joelhos.',
      'Mantenha os pés afastados aproximadamente na largura do quadril, apontados para a frente.',
      'Empurre o chão com os calcanhares e toda a sola do pé, elevando a pelve até o tronco e as coxas formarem uma linha reta confortável.',
      'Mantenha uma leve e constante pressão dos joelhos para fora contra a faixa, sem exagerar.',
      'Desça o quadril de forma controlada até quase tocar o chão antes da próxima repetição.'
    ],
    initialDose: '2 séries de 8–12 repetições',
    defaultSets: 2,
    defaultReps: '8–12 reps',
    breathing: 'Solte o ar (expire) ao elevar o quadril; inspire de volta ao descer.',
    keyTip: 'Pare de subir antes de arquear a coluna lombar; o movimento deve vir da articulação do quadril.',
    whatToAvoid: 'Empurrar os joelhos exageradamente para fora, prender a respiração ou buscar altura forçando a lombar.',
    easierOption: 'Retire a faixa elástica e execute apenas com o peso corporal.',
    harderOption: 'Faça uma pausa de 2 segundos no ponto mais alto, mantendo a postura estável.',
    safetyNotes: 'Mantenha os ombros relaxados e o pescoço neutro apoiado no chão.',
    movementCategory: 'extensao',
    visualType: 'pelvic-bridge',
    imageUrl: '/exercises/1.jpg',
    externalImageUrl: 'https://i.postimg.cc/WpgF0yS9/1.jpg'
  },
  {
    id: 2,
    name: 'Agachamento com faixa',
    targetMovement: 'Praticar o agachamento e fortalecer os músculos das pernas e do quadril.',
    bandType: 'Faixa circular (opcional)',
    bandPlacement: 'Circular acima dos joelhos, opcional para estímulo de estabilidade.',
    primaryMuscles: [
      { name: 'Glúteo Máximo', role: 'Extensão e controle de descida/subida', type: 'gluteo-maximo' },
      { name: 'Quadríceps', role: 'Extensão dos joelhos', type: 'outros' },
      { name: 'Glúteo Médio', role: 'Impede o colapso dos joelhos para dentro', type: 'gluteo-medio' }
    ],
    howTo: [
      'Fique em pé, com os pés aproximadamente na largura dos ombros e pontas levemente voltadas para fora.',
      'Coloque a faixa circular logo acima dos joelhos (se for confortável e seguro para você).',
      'Leve o quadril para trás e dobre os joelhos simultaneamente, como se fosse sentar.',
      'Desça apenas até onde conseguir manter o equilíbrio, pés inteiros no chão e coluna neutra.',
      'Empurre o chão firmemente pelos pés para retornar à posição inicial ereta.'
    ],
    initialDose: '2 séries de 8–12 repetições',
    defaultSets: 2,
    defaultReps: '8–12 reps',
    breathing: 'Inspire ao flexionar e descer; expire com força controlada ao empurrar e subir.',
    keyTip: 'Imagine que vai se sentar na borda de uma cadeira alta e firme.',
    whatToAvoid: 'Deixar os joelhos colapsarem para dentro (valgo), tirar os calcanhares do chão ou descer além do controle.',
    easierOption: 'Faça o movimento sentando e levantando de uma cadeira firme de altura padrão.',
    harderOption: 'Aumente suavemente a profundidade confortável mantendo o tronco estável, ou adicione pausa embaixo.',
    safetyNotes: 'Nunca sacrifique a estabilidade do joelho para agachar mais fundo.',
    movementCategory: 'agachamento',
    visualType: 'squat',
    imageUrl: '/exercises/2.jpg',
    externalImageUrl: 'https://i.postimg.cc/J7ZDjFKp/2.jpg'
  },
  {
    id: 3,
    name: 'Inclinação de quadril com elástico',
    subtitle: 'Também chamado de levantamento terra romeno (RDL) com faixa',
    targetMovement: 'Praticar a dobradiça do quadril, trabalhando os glúteos e a parte posterior das coxas.',
    bandType: 'Elástico longo (super band ou tubo)',
    bandPlacement: 'Apoiado sob o meio dos pés e segurado com ambas as mãos.',
    primaryMuscles: [
      { name: 'Glúteo Máximo', role: 'Extensão terminal do quadril na subida', type: 'gluteo-maximo' },
      { name: 'Isquiotibiais', role: 'Alongamento sob carga e flexão do quadril', type: 'outros' },
      { name: 'Eretores da Espinha', role: 'Estabilização isométrica da coluna', type: 'outros' }
    ],
    howTo: [
      'Pise no meio do elástico com os dois pés separados na largura do quadril, garantindo que a faixa não escorregue.',
      'Segure as extremidades com as mãos firmes, gerando uma tensão leve já na posição inicial.',
      'Destrave levemente os joelhos (mantenha microflexão, sem dobrar como agachamento).',
      'Leve o quadril para trás e incline o tronco à frente, mantendo o peito aberto e a coluna alinhada.',
      'Ao sentir o alongamento suave na parte de trás das coxas, empurre o chão e conduza o quadril à frente até ficar ereto.'
    ],
    initialDose: '2 séries de 8–12 repetições',
    defaultSets: 2,
    defaultReps: '8–12 reps',
    breathing: 'Inspire ao levar o quadril para trás; expire ao estender o quadril e retornar à vertical.',
    keyTip: 'Pense em empurrar uma porta imaginária para trás com o quadril, em vez de dobrar os joelhos.',
    whatToAvoid: 'Arredondar as costas, flexionar excessivamente os joelhos ou puxar a faixa com a força dos braços.',
    easierOption: 'Pratique o padrão de inclinação sem elástico, posicionando as mãos nas dobras da virilha.',
    harderOption: 'Segure a faixa um pouco mais abaixo para aumentar a tensão elástica na metade final da subida.',
    safetyNotes: 'Confira se a faixa está bem presa sob o solado de tênis firme antes de começar.',
    movementCategory: 'dobradica',
    visualType: 'rdl-hinge',
    imageUrl: '/exercises/3.jpg',
    externalImageUrl: 'https://i.postimg.cc/bYkD15LL/3.jpg'
  },
  {
    id: 4,
    name: 'Coice em quatro apoios com faixa',
    targetMovement: 'Praticar a extensão do quadril com foco no plano sagital posterior.',
    bandType: 'Elástico ou versão sem faixa (recomendada para iniciantes)',
    bandPlacement: 'Em quatro apoios no solo; para iniciantes, o peso corporal puro oferece excelente controle.',
    primaryMuscles: [
      { name: 'Glúteo Máximo', role: 'Ativação concêntrica na elevação da perna para trás', type: 'gluteo-maximo' },
      { name: 'Core / Abdômen', role: 'Estabilização antirotacional do tronco', type: 'outros' }
    ],
    howTo: [
      'Apoie as mãos e os joelhos sobre um tapete firme (mãos alinhadas aos ombros, joelhos ao quadril).',
      'Contraia suavemente a musculatura abdominal, mantendo a coluna em posição neutra e respiração livre.',
      'Sem arquear as costas, eleve uma perna para trás com o joelho dobrado a 90°, apontando o calcanhar ao teto.',
      'Pare o movimento assim que o glúteo contrair, antes que a lombar comece a curvar.',
      'Retorne de forma lenta e controlada até quase encostar no tapete.',
      'Realize todas as repetições de um lado antes de alternar para a outra perna.'
    ],
    initialDose: '2 séries de 8–10 repetições por lado',
    defaultSets: 2,
    defaultReps: '8–10 reps por lado',
    breathing: 'Expire ao empurrar o calcanhar para cima; inspire controlando a descida.',
    keyTip: 'Mova estritamente a perna sem girar os ombros ou balançar o quadril de um lado para o outro.',
    whatToAvoid: 'Subir a perna alto demais forçando a lombar, ou usar o embalo do corpo para vencer a repetição.',
    easierOption: 'Execute sem faixa elástica, focando exclusivamente na contração e no alinhamento articular.',
    harderOption: 'Segure uma pausa de 1 a 2 segundos no ponto de maior contração.',
    safetyNotes: 'Apenas utilize faixa elástica homologada para essa posição; nunca improvise ancoragens em móveis.',
    movementCategory: 'extensao',
    visualType: 'donkey-kick',
    imageUrl: '/exercises/4.jpg',
    externalImageUrl: 'https://i.postimg.cc/J7ZDjFKx/4.jpg'
  },
  {
    id: 5,
    name: 'Abertura da perna deitada de lado',
    targetMovement: 'Praticar o afastamento da perna, movimento no qual os músculos laterais do quadril participam.',
    bandType: 'Faixa circular leve ou sem faixa',
    bandPlacement: 'Opcional acima dos joelhos; inicie sem faixa para calibrar a estabilidade pélvica.',
    primaryMuscles: [
      { name: 'Glúteo Médio', role: 'Atua na abdução e estabilização da pelve', type: 'gluteo-medio' },
      { name: 'Tensor da Fáscia Lata', role: 'Músculo sinergista no quadril lateral', type: 'outros' }
    ],
    howTo: [
      'Deite-se confortavelmente de lado no chão, apoiando a cabeça sobre o braço estendido ou flexionado.',
      'Alinhe tronco, quadril e pernas para que o quadril de cima não caia para trás.',
      'Mantenha a perna de baixo com leve flexão para dar suporte e estabilidade.',
      'Eleve a perna de cima alguns centímetros de forma controlada, mantendo o pé apontando para a frente.',
      'Desça devagar, controlando o retorno sem deixar a gravidade puxar a perna.',
      'Complete a série e repita com o outro lado.'
    ],
    initialDose: '2 séries de 8–12 repetições por lado',
    defaultSets: 2,
    defaultReps: '8–12 reps por lado',
    breathing: 'Expire ao elevar a perna; inspire ao descer lentamente.',
    keyTip: 'A perna não precisa subir muito; amplitudes curtas com a pelve perfeitamente parada são muito mais eficientes.',
    whatToAvoid: 'Girar a ponta do pé para o teto, balançar o tronco ou deixar o quadril tombar para trás.',
    easierOption: 'Faça com a perna flexionada (estilo concha simples) ou sem qualquer resistência elástica.',
    harderOption: 'Adicione uma faixa leve logo acima dos joelhos, mantendo a técnica impecável.',
    safetyNotes: 'Interrompa o exercício imediatamente se sentir pontadas ou dor óssea na lateral do quadril.',
    movementCategory: 'abducao',
    visualType: 'side-lying-abduction',
    imageUrl: '/exercises/5.jpg',
    externalImageUrl: 'https://i.postimg.cc/rs1DcdKr/5.jpg'
  },
  {
    id: 6,
    name: 'Passo lateral com faixa',
    targetMovement: 'Praticar passos laterais contra resistência elástica contínua.',
    bandType: 'Faixa circular (mini band leve a média)',
    bandPlacement: 'Acima dos joelhos para iniciantes (mais seguro e fácil de controlar o valgo).',
    primaryMuscles: [
      { name: 'Glúteo Médio', role: 'Estabilizador dinâmico da pelve em apoio unipodal transitório', type: 'gluteo-medio' },
      { name: 'Glúteo Máximo', role: 'Suporte isométrico na posição semiagachada', type: 'gluteo-maximo' }
    ],
    howTo: [
      'Coloque a faixa circular logo acima dos joelhos.',
      'Fique em pé com os pés paralelos, afastados na largura do quadril, mantendo leve tensão na faixa.',
      'Flexione suavemente joelhos e quadris (posição atlética neutra, tronco levemente inclinado).',
      'Dê um passo curto e controlado para o lado, sentindo a resistência da faixa.',
      'Aproxime o outro pé no mesmo sentido, mas sem encostar um pé no outro e sem perder toda a tensão elástica.',
      'Dê os passos previstos para um lado e depois retorne na direção oposta.'
    ],
    initialDose: '6–8 passos para cada lado, por 2 voltas',
    defaultSets: 2,
    defaultReps: '6–8 passos / lado',
    breathing: 'Respire continuamente de forma rítmica e calma durante toda a sequência.',
    keyTip: 'Passos pequenos e controlados preservam a postura e mantêm a tensão certa nos músculos.',
    whatToAvoid: 'Balançar o tronco como um pêndulo, arrastar os pés no chão ou deixar os joelhos caírem para dentro.',
    easierOption: 'Use uma faixa de resistência extra leve e reduza o comprimento dos passos.',
    harderOption: 'Posicione a faixa um pouco mais abaixo (na parte superior da canela), apenas se a técnica estiver firme.',
    safetyNotes: 'Não há necessidade de descer em agachamento profundo para colher os benefícios da marcha lateral.',
    movementCategory: 'abducao',
    visualType: 'lateral-walk',
    imageUrl: '/exercises/6.jpg',
    externalImageUrl: 'https://i.postimg.cc/Y06vk4hm/6.jpg'
  },
  {
    id: 7,
    name: 'Abdução de quadril em pé',
    targetMovement: 'Praticar o afastamento lateral da perna em cadeia cinética aberta contra a gravidade ou faixa.',
    bandType: 'Versão inicial sem faixa (ou mini band nos tornozelos se experiente)',
    bandPlacement: 'Em pé ao lado de um apoio firme. Sem faixa para início.',
    primaryMuscles: [
      { name: 'Glúteo Médio (perna em movimento)', role: 'Ativação concêntrica de abdução', type: 'gluteo-medio' },
      { name: 'Glúteo Médio (perna de apoio)', role: 'Estabilização isométrica da pelve', type: 'gluteo-medio' }
    ],
    howTo: [
      'Fique em pé ao lado de uma parede ou cadeira firme, segurando de leve apenas para segurança de equilíbrio.',
      'Mantenha o tronco ereto, abdômen ativado e pés apontando para a frente.',
      'Afaste uma das pernas lateralmente em uma amplitude curta, sem inclinar o tronco para o lado oposto.',
      'Retorne devagar até a perna quase encostar na perna de apoio.',
      'Execute as repetições e depois troque de lado.'
    ],
    initialDose: '2 séries de 8–12 repetições por lado',
    defaultSets: 2,
    defaultReps: '8–12 reps por lado',
    breathing: 'Expire ao afastar a perna; inspire ao retornar ao centro.',
    keyTip: 'Mantenha a pelve rigorosamente nivelada; o corpo não deve tombar para o lado oposto para levantar a perna.',
    whatToAvoid: 'Inclinar a coluna, rodar o pé para fora ou buscar grande altura com embalo.',
    easierOption: 'Faça com amplitude bem reduzida mantendo duas mãos no apoio.',
    harderOption: 'Coloque uma mini band nos tornozelos somente se o alinhamento permanecer perfeito.',
    safetyNotes: 'Se a faixa escorregar ou perder a forma, pare e retire-a.',
    movementCategory: 'abducao',
    visualType: 'standing-abduction',
    imageUrl: '/exercises/7.jpg',
    externalImageUrl: 'https://i.postimg.cc/wMX1Ht7R/7.jpg'
  },
  {
    id: 8,
    name: 'Afundo para trás com apoio',
    targetMovement: 'Praticar um exercício unilateral funcional para fortalecimento de membros inferiores e quadril.',
    bandType: 'Sem faixa (recomendado) ou opcional sob o pé frontal',
    bandPlacement: 'Apoio próximo para as mãos (cadeira firme ou parede). Movimento preferencialmente com peso corporal.',
    primaryMuscles: [
      { name: 'Glúteo Máximo', role: 'Propulsão e desaceleração do quadril da perna da frente', type: 'gluteo-maximo' },
      { name: 'Quadríceps', role: 'Controle de flexão e extensão do joelho', type: 'outros' },
      { name: 'Glúteo Médio', role: 'Estabilidade do alinhamento joelho-quadril', type: 'gluteo-medio' }
    ],
    howTo: [
      'Posicione-se em pé a cerca de meio metro de uma parede ou encosto de cadeira firme.',
      'Toque levemente o apoio com uma ou duas mãos para garantir total equilíbrio.',
      'Dê um passo firme para trás com uma perna e flexione ambos os joelhos em uma amplitude confortável.',
      'Mantenha o pé da frente inteiro apoiado e o peso distribuído principalmente nele.',
      'Empurre o chão com a perna da frente para retornar suavemente à posição inicial ereta.',
      'Conclua a quantidade de repetições e troque de lado.'
    ],
    initialDose: '2 séries de 6–10 repetições por lado',
    defaultSets: 2,
    defaultReps: '6–10 reps por lado',
    breathing: 'Inspire ao recuar a perna e descer; expire com firmeza ao empurrar o chão e voltar.',
    keyTip: 'Mantenha espaço lateral entre os pés durante o passo, como se pisasse sobre trilhos paralelos de trem.',
    whatToAvoid: 'Dar o passo exatamente atrás do outro pé (corda bamba), perder o equilíbrio ou bater o joelho no chão.',
    easierOption: 'Diminua a amplitude da descida ou faça o exercício de sentar e levantar da cadeira.',
    harderOption: 'Aumente ligeiramente a amplitude mantendo total suavidade no retorno.',
    safetyNotes: 'A faixa não é necessária para aprender o movimento; priorize o controle articular.',
    movementCategory: 'unilateral',
    visualType: 'reverse-lunge',
    imageUrl: '/exercises/8.jpg',
    externalImageUrl: 'https://i.postimg.cc/rs1DcdK0/8.jpg'
  }
];
