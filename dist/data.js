export const DIM = [
 {id:'general',name:'知识与实用',short:'通用',color:'#87b8a6'},
 {id:'code',name:'编程与工具',short:'代码',color:'#7ca6db'},
 {id:'math',name:'数学与推理',short:'推理',color:'#b5a0d3'},
 {id:'creative',name:'创作与表达',short:'创作',color:'#e6aa70'},
 {id:'memory',name:'长对话一致性',short:'记忆',color:'#ce8fa9'}
];
export const SEGMENTS = [
 {id:'dev',name:'程序员',handle:'dev',icon:'⌘',color:'#7ca6db',base:42000,growth:1.32,budget:149,pay:.22,weights:[.13,.58,.16,.03,.10],usage:1.7,desc:'项目修改、代码质量、工具调用和速度。'},
 {id:'science',name:'数学与科研',handle:'math',icon:'∑',color:'#b5a0d3',base:7000,growth:1.25,budget:129,pay:.21,weights:[.22,.12,.55,.01,.10],usage:1.15,desc:'推导是否成立，复杂问题能否可靠求解。'},
 {id:'everyday',name:'普通用户',handle:'life',icon:'◎',color:'#87b8a6',base:140000,growth:1.7,budget:39,pay:.07,weights:[.48,.04,.10,.23,.15],usage:.65,desc:'好用、响应快，价格符合日常用途。'},
 {id:'rp',name:'AIRP 玩家',handle:'rp',icon:'✧',color:'#ce8fa9',base:18000,growth:1.65,budget:99,pay:.27,weights:[.08,.01,.04,.48,.39],usage:3,desc:'人设、文风、情感表达和长对话记忆。'},
 {id:'business',name:'企业团队',handle:'team',icon:'▦',color:'#d1bb7c',base:2400,growth:1.55,budget:399,pay:.48,weights:[.35,.28,.17,.02,.18],usage:2.3,desc:'可靠、稳定，适合接入真实工作流程。'}
];
export const DATASETS = [
 {id:'web',name:'开放网页语料',tag:'通用文本',source:'公开采集',tokens:18,quality:54,noise:.23,cost:0,weights:[.48,.08,.13,.19,.12],sample:'城市公共交通、科学常识、产品说明及生活问答等多种文本。',date:'2022-01-01'},
 {id:'code',name:'代码与技术文档',tag:'代码',source:'开放项目',tokens:7,quality:73,noise:.12,cost:16,weights:[.10,.70,.12,.02,.06],sample:'函数实现、接口说明、修复前后差异，以及相应测试。',date:'2022-01-01'},
 {id:'math',name:'数学题与验证解答',tag:'数学',source:'专家整理',tokens:2,quality:88,noise:.04,cost:25,weights:[.12,.18,.62,.01,.07],sample:'题目 → 分步推导 → 条件检查 → 经验证的最终答案。',date:'2022-01-01'},
 {id:'books',name:'授权书籍与长篇文本',tag:'知识 / 长文',source:'内容合作',tokens:10,quality:81,noise:.07,cost:22,weights:[.38,.04,.15,.24,.19],sample:'连贯的章节、人物关系、解释性段落及长篇叙述。',date:'2022-01-01'},
 {id:'dialogue',name:'人工任务与多轮对话',tag:'指令 / 对话',source:'标注团队',tokens:1.2,quality:84,noise:.06,cost:12,weights:[.32,.12,.10,.22,.24],sample:'用户提出任务；回答完成要求；用户补充条件后继续修订。',date:'2022-01-01'},
 {id:'roleplay',name:'角色与互动故事',tag:'AIRP / 创作',source:'创作者合作',tokens:3.5,quality:80,noise:.10,cost:18,weights:[.08,.01,.04,.49,.38],sample:'角色设定、语言习惯、连续事件与保持人物关系的多轮对话。',date:'2022-01-01'},
 {id:'preference',name:'回答偏好与纠错',tag:'偏好',source:'人工评审',tokens:.7,quality:91,noise:.03,cost:24,weights:[.30,.20,.20,.12,.18],sample:'同一问题的两份回答及评审理由，包含事实、表达与实用性判断。',date:'2022-01-01'},
 {id:'synthetic',name:'合成指令与筛选答案',tag:'合成数据',source:'模型生成',tokens:5,quality:65,noise:.19,cost:10,weights:[.25,.25,.22,.15,.13],sample:'由模型生成的任务和示范，经去重、格式检查与抽样验证。',date:'2022-12-20'},
 {id:'repair',name:'完整项目与修复轨迹',tag:'软件工程',source:'开发者合作',tokens:4,quality:89,noise:.05,cost:38,weights:[.10,.68,.10,.02,.10],sample:'跨文件问题、定位过程、补丁与回归测试，保留项目上下文。',date:'2022-01-01'}
];
export const MODES = {
 scratch:{name:'从头预训练',simple:'建立一个新的基础模型',factor:1,help:'使用原始文本学习基础能力。结构、规模、数据与训练量共同影响结果。'},
 continue:{name:'继续预训练',simple:'给已有模型补充知识和领域材料',factor:.55,help:'沿用已有结构和权重，继续学习新材料；配比过于单一可能影响原有能力。'},
 sft:{name:'监督微调 · SFT',simple:'用任务示范教模型怎样回答',factor:.16,help:'重点学习任务格式、交流与领域表现。示范数据比单纯原始文本更合适。'},
 distill:{name:'知识蒸馏',simple:'让学生学习教师模型的输出',factor:.20,help:'选择老师、学生和任务材料。需要支付生成与验证成本，能力迁移存在损失。'},
 rlhf:{name:'人类反馈强化学习',simple:'根据反馈改进回答选择',factor:.30,help:'需要偏好数据与工程经验；过度优化单一反馈可能影响其他表现。'},
 dpo:{name:'直接偏好优化 · DPO',simple:'利用成对偏好直接调整模型',factor:.18,date:'2023-05-29',help:'采用偏好样本进行优化，具体方法按论文公开日期开放。'}
};
export const TECHS = [
 {id:'moe',name:'MoE 工程',date:'2022-01-01',cost:26,weeks:4,desc:'提高专家路由与负载均衡成熟度，降低 MoE 项目风险。MoE 概念在开局前已存在。'},
 {id:'flash',name:'FlashAttention',date:'2022-05-27',cost:22,weeks:3,desc:'实现更高效的注意力计算，改善训练效率。'},
 {id:'gqa',name:'GQA 工程',date:'2023-05-22',cost:28,weeks:4,desc:'掌握分组查询注意力，降低推理缓存开销。'},
 {id:'mla',name:'MLA 工程',date:'2024-05-07',cost:45,weeks:5,desc:'研究潜在注意力，改善长上下文部署成本。'}
];
TECHS.push(
 {id:'validation',name:'自动评测与实验监控',date:'2022-01-01',cost:24,weeks:3,desc:'建立异常检测和复现流程。新项目的训练中断风险降低约 20%。'},
 {id:'serving',name:'推理服务与调度优化',date:'2022-01-01',cost:32,weeks:4,desc:'优化服务调度和推理执行。所有公开产品的单位服务消耗降低 22%。'},
 {id:'dataops',name:'数据审查与处理流水线',date:'2022-01-01',cost:21,weeks:3,desc:'提高材料抽样质量，整理去重的费用降低 20%。'}
);

export const BENCHMARKS = [
 {id:'mmlu',name:'MMLU',desc:'跨学科知识',date:'2022-01-01',weights:[.55,.10,.30,.03,.02]},
 {id:'humaneval',name:'HumanEval',desc:'函数级代码',date:'2022-01-01',weights:[.08,.77,.12,.01,.02]},
 {id:'gsm8k',name:'GSM8K',desc:'数学应用题',date:'2022-01-01',weights:[.12,.08,.77,.01,.02]},
 {id:'math',name:'MATH',desc:'竞赛数学与推导',date:'2022-01-01',weights:[.08,.12,.77,.01,.02]},
 {id:'truthful',name:'TruthfulQA',desc:'事实可靠性',date:'2022-01-01',weights:[.67,.04,.20,.04,.05]},
 {id:'hellaswag',name:'HellaSwag',desc:'日常常识推断',date:'2022-01-01',weights:[.58,.02,.16,.19,.05]},
 {id:'role',name:'社区角色长聊',desc:'人设与情节一致性',date:'2022-01-01',weights:[.06,.01,.03,.45,.45]},
 {id:'project',name:'社区项目实测',desc:'跨文件修复',date:'2022-01-01',weights:[.12,.54,.14,.01,.19]}
];
export const EVENTS = [
 ['2022-01-27','InstructGPT 研究公开','人类反馈训练受到更多关注。','https://openai.com/index/instruction-following/',.04,'rlhf'],
 ['2022-03-29','Chinchilla 论文公开','模型规模与训练数据的平衡成为研究重点。','https://arxiv.org/abs/2203.15556',.03],
 ['2022-05-27','FlashAttention 论文公开','注意力计算效率迎来新的工程路线。','https://arxiv.org/abs/2205.14135',.03,'flash'],
 ['2022-11-30','ChatGPT 发布','对话式 AI 走向更广泛的公众，普通用户需求增长。','https://openai.com/index/chatgpt/',.24],
 ['2022-12-20','Self-Instruct 论文公开','模型生成、筛选指令数据的训练路线出现。','https://arxiv.org/abs/2212.10560v1',.06,'synthetic'],
 ['2023-02-24','LLaMA 研究发布','开放权重研究与模型生态进一步发展。','https://ai.meta.com/blog/large-language-model-llama-meta-ai/',.08],
 ['2023-03-14','GPT-4 发布','公众对复杂任务和推理能力的期待提高。','https://openai.com/index/gpt-4/',.12],
 ['2023-05-22','GQA 论文公开','分组查询注意力提供新的推理效率取舍。','https://arxiv.org/abs/2305.13245',.03,'gqa'],
 ['2023-05-29','DPO 论文公开','直接利用偏好数据优化模型的方法公开。','https://arxiv.org/abs/2305.18290',.04,'dpo'],
 ['2023-07-18','Llama 2 发布','可商用开放模型生态继续扩大。','https://ai.meta.com/blog/llama-2/',.08],
 ['2023-09-27','Mistral 7B 发布','高效小模型路线获得更多社区关注。','https://mistral.ai/news/announcing-mistral-7b/',.07],
 ['2023-12-11','Mixtral 8×7B 发布','稀疏专家模型成为开放生态的重要路线。','https://mistral.ai/news/mixtral-of-experts/',.08],
 ['2024-05-07','DeepSeek-V2 论文公开','MLA 与高效 MoE 的工程设计进入研究视野。','https://arxiv.org/abs/2405.04434',.07,'mla'],
 ['2024-05-13','GPT-4o 发布','实时交互与多模态体验受到广泛关注。','https://openai.com/index/hello-gpt-4o/',.12],
 ['2024-12-26','DeepSeek-V3 发布','模型能力与服务效率的竞争继续加剧。','https://deepseek.com/en/news/deepseek-v3/',.10],
 ['2025-01-20','DeepSeek-R1 发布','推理训练与开放蒸馏模型受到更多关注。','https://deepseek.com/en/news/deepseek-r1/',.15],
 ['2025-08-07','GPT-5 发布','通用任务与编程产品的竞争进入新阶段。','https://openai.com/index/introducing-gpt-5/',.10],
 ['2025-12-01','DeepSeek-V3.2 发布','新的公开模型继续推动市场预期变化。','https://deepseek.com/en/transparency/',.06],
 ['2026-04-24','DeepSeek-V4 预览版发布','长上下文与服务效率继续受到关注。','https://deepseek.com/en/news/v4-preview/',.10]
].map((e,i)=>({id:'history-'+i,date:e[0],title:e[1],desc:e[2],url:e[3],impact:e[4],unlock:e[5]}));
export const ROLES = [
 {id:'research',name:'研究员',desc:'改善实验判断与训练效果',salary:.58,cost:9},
 {id:'engineering',name:'工程师',desc:'提高训练稳定性和服务容量',salary:.52,cost:8},
 {id:'data',name:'数据工程师',desc:'改善数据处理与质量控制',salary:.44,cost:7},
 {id:'product',name:'产品与社区',desc:'改善用户留存和产品传播',salary:.40,cost:6}
];
export const INVESTORS = [
 {id:'technical',name:'远见创投',tag:'技术投资人',amount:240,wait:3,desc:'看重模型、团队与可复现的实验。',color:'#b5a0d3'},
 {id:'growth',name:'增长资本',tag:'增长投资人',amount:420,wait:3,desc:'看重活跃用户、付费与持续增长。',color:'#87b8a6'},
 {id:'strategic',name:'云端产业基金',tag:'产业投资人',amount:320,wait:2,desc:'提供资金与服务资源；希望保持较高可用性。',color:'#7ca6db'}
];
export const GLOSSARY=[
 ['预训练','让模型从大量原始材料中学习语言、知识和模式。'],['微调','在已有模型基础上，通过特定示范继续训练。'],['蒸馏','用教师模型提供的训练信号培养学生模型，迁移所需能力。'],['Dense','稠密结构：每次处理内容时使用主要模型参数。'],['MoE','专家混合结构：每次仅选择部分专家参与计算，同时需要管理路由、显存和通信。'],['参数','模型内部可学习的数值。规模需要与数据、训练投入匹配。'],['Token','文本处理单位；B tokens 表示十亿个单位。'],['检查点','训练过程中保存的模型与训练状态，可用于部分故障后的恢复。'],['Benchmark','按照固定任务与规则进行的评测，覆盖范围存在局限。'],['股份稀释','新投资者获得股份后，原股东所占比例相应降低。']
];
