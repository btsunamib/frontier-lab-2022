// Dates and identities follow the linked public announcements. Capability vectors
// and all in-game prices are balancing values, never official benchmark claims.
export const BRANDS={
 openai:{name:'OpenAI',logo:'./assets/brands/openai.png',color:'#87d3b2',source:'https://openai.com/brand/'},
 eleuther:{name:'EleutherAI',logo:'./assets/brands/eleuther.png',color:'#d2b0fa',source:'https://huggingface.co/EleutherAI/gpt-j-6b'},
 meta:{name:'Meta',logo:'./assets/brands/meta.png',color:'#85b7ff',source:'https://ai.meta.com/'},
 bigscience:{name:'BigScience',logo:'./assets/brands/bigscience.png',color:'#ffb7c9',source:'https://huggingface.co/bigscience'},
 mistral:{name:'Mistral AI',logo:'./assets/brands/mistral.png',color:'#ffad66',source:'https://mistral.ai/brand/'},
 anthropic:{name:'Anthropic',logo:'./assets/brands/anthropic.png',color:'#eeb29a',source:'https://www.anthropic.com/'},
 deepseek:{name:'DeepSeek',logo:'./assets/brands/deepseek.png',color:'#7c9dff',source:'https://www.deepseek.com/'}
};
export const RIVALS=[
 {id:'gpt-j',name:'GPT-J 6B',brand:'eleuther',date:'2021-06-09',scores:[28,23,16,29,19],speed:65,price:35,context:2048,access:'开放权重',params:'6B',note:'早期开放模型，是你的第一个可追赶目标。',url:'https://huggingface.co/EleutherAI/gpt-j-6b'},
 {id:'gpt3',name:'GPT-3 175B',brand:'openai',date:'2020-05-28',scores:[43,31,26,42,29],speed:52,price:159,context:2048,access:'闭源服务',params:'175B',note:'规模化预训练的早期代表。',url:'https://openai.com/index/language-models-are-few-shot-learners/'},
 {id:'instructgpt',name:'InstructGPT',brand:'openai',date:'2022-01-27',scores:[47,36,31,47,35],speed:64,price:139,context:2048,access:'闭源研究 / 服务',params:'未统一披露',note:'指令遵循与人类反馈受到关注。',url:'https://openai.com/index/instruction-following/'},
 {id:'opt',name:'OPT 175B',brand:'meta',date:'2022-05-02',scores:[40,29,23,34,26],speed:48,price:59,context:2048,access:'开放研究权重',params:'175B',note:'开放研究推动更多团队研究和复现大模型。',url:'https://arxiv.org/abs/2205.01068'},
 {id:'bloom',name:'BLOOM',brand:'bigscience',date:'2022-07-12',scores:[43,32,25,42,29],speed:45,price:49,context:2048,access:'开放权重',params:'176B',note:'多语言与开放科学生态的重要节点。',url:'https://huggingface.co/blog/bloom'},
 {id:'chatgpt',name:'ChatGPT · 初始版',brand:'openai',date:'2022-11-30',scores:[58,50,42,57,43],speed:74,price:0,context:null,access:'公众研究预览',params:'未披露',note:'免费对话体验改变普通用户对 AI 的期待。',url:'https://openai.com/index/chatgpt/'},
 {id:'llama',name:'LLaMA 65B',brand:'meta',date:'2023-02-24',scores:[58,45,42,48,37],speed:59,price:49,context:2048,access:'研究权重',params:'65B',note:'高效基础模型与开放研究生态。',url:'https://ai.meta.com/blog/large-language-model-llama-meta-ai/'},
 {id:'claude',name:'Claude · 初代',brand:'anthropic',date:'2023-03-14',scores:[64,49,45,71,66],speed:70,price:119,context:null,access:'闭源服务',params:'未披露',note:'对话、写作和可控性成为新的竞争点。',url:'https://www.anthropic.com/news/introducing-claude'},
 {id:'gpt4',name:'GPT-4',brand:'openai',date:'2023-03-14',scores:[78,75,72,70,60],speed:40,price:149,context:8192,access:'闭源服务',params:'未披露',note:'复杂任务的表现抬高整个市场的预期。',url:'https://openai.com/index/gpt-4/'},
 {id:'llama2',name:'Llama 2 70B',brand:'meta',date:'2023-07-18',scores:[62,51,46,58,49],speed:66,price:49,context:4096,access:'开放权重',params:'70B',note:'可商用模型生态扩大，成本竞争加剧。',url:'https://ai.meta.com/blog/llama-2/'},
 {id:'mistral',name:'Mistral 7B',brand:'mistral',date:'2023-09-27',scores:[57,54,43,49,46],speed:90,price:25,context:8192,access:'开放权重',params:'7B',note:'轻量高效路线形成新的性价比压力。',url:'https://mistral.ai/news/announcing-mistral-7b/'},
 {id:'mixtral',name:'Mixtral 8×7B',brand:'mistral',date:'2023-12-11',scores:[67,65,60,61,56],speed:82,price:39,context:32768,access:'开放权重',params:'46.7B / 激活12.9B',note:'稀疏专家模型把能力与推理效率带到新的平衡。',url:'https://mistral.ai/news/mixtral-of-experts/'},
 {id:'gpt4o',name:'GPT-4o',brand:'openai',date:'2024-05-13',scores:[83,82,80,79,74],speed:90,price:99,context:128000,access:'闭源服务',params:'未披露',note:'更快的交互体验继续提高用户期待。',url:'https://openai.com/index/hello-gpt-4o/'},
 {id:'deepseekv3',name:'DeepSeek-V3',brand:'deepseek',date:'2024-12-26',scores:[83,84,81,73,74],speed:88,price:29,context:128000,access:'开放权重',params:'671B / 激活37B',note:'开放模型的能力和服务效率竞争升级。',url:'https://deepseek.com/en/news/deepseek-v3/'},
 {id:'deepseekr1',name:'DeepSeek-R1',brand:'deepseek',date:'2025-01-20',scores:[85,89,94,70,75],speed:48,price:59,context:128000,access:'开放权重',params:'671B / 激活37B',note:'推理、数学与蒸馏成为社区的新热点。',url:'https://deepseek.com/en/news/deepseek-r1/'},
 {id:'gpt5',name:'GPT-5',brand:'openai',date:'2025-08-07',scores:[92,95,95,84,87],speed:83,price:139,context:null,access:'闭源服务',params:'未披露',note:'通用任务与编程产品继续形成新的前沿。',url:'https://openai.com/index/introducing-gpt-5/'},
 {id:'deepseekv4',name:'DeepSeek-V4 Preview',brand:'deepseek',date:'2026-04-24',scores:[93,94,95,85,94],speed:90,price:39,context:1000000,access:'开放权重',params:'多个规格',note:'长上下文和部署效率继续重塑市场。',url:'https://deepseek.com/en/news/v4-preview/'}
];
export function availableRivals(date){return RIVALS.filter(r=>r.date<=date);}
export function indexScore(m,group='overall'){
 const w=group==='dev'?[.13,.58,.16,.03,.10]:group==='science'?[.22,.12,.55,.01,.10]:group==='rp'?[.08,.01,.04,.48,.39]:group==='everyday'?[.48,.04,.10,.23,.15]:group==='business'?[.35,.28,.17,.02,.18]:[.2,.2,.2,.2,.2];
 const score=m.scores.reduce((a,v,i)=>a+v*w[i],0);
 return group==='value'?score*.68+(m.speed||60)*.22+10*Math.exp(-(m.price||0)/100):score;
}
export function leaderboard(s,group='overall'){
 const date=new Date(Date.UTC(2022,0,3)+s.week*7*86400000).toISOString().slice(0,10);
 return [...availableRivals(date).map(r=>({...r,isRival:true})),...s.models.map(m=>({...m,brand:'you',isRival:false}))].map(m=>({...m,index:indexScore(m,group)})).sort((a,b)=>b.index-a.index);
}
export const REPORTS=[
 {date:'2021-06-09',model:'GPT-J 6B',metric:'HellaSwag',score:66.1,protocol:'模型卡所列评测；实现与任务表述可能存在差异',url:'https://huggingface.co/EleutherAI/gpt-j-6b'},
 {date:'2021-06-09',model:'GPT-J 6B',metric:'WinoGrande',score:65.3,protocol:'模型卡所列评测；不可与其他设置直接混排',url:'https://huggingface.co/EleutherAI/gpt-j-6b'},
 {date:'2023-03-14',model:'GPT-4',metric:'MMLU',score:86.4,protocol:'5-shot，GPT-4 技术报告 Table 2',url:'https://arxiv.org/html/2303.08774v6#S4.T2'},
 {date:'2023-03-14',model:'GPT-4',metric:'HumanEval',score:67,protocol:'0-shot，GPT-4 技术报告 Table 2',url:'https://arxiv.org/html/2303.08774v6#S4.T2'},
 {date:'2023-03-14',model:'GPT-4',metric:'GSM-8K',score:92,protocol:'5-shot CoT；报告注明部分训练集纳入预训练',url:'https://arxiv.org/html/2303.08774v6#S4.T2'}
];
