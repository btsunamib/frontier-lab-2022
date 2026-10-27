// Shared OpenAI-compatible client. Credentials stay in the caller's memory.
export function normalizeEndpoint(value) {
  const u=new URL(String(value||'').trim());
  if(!['http:','https:'].includes(u.protocol)||u.username||u.password||u.search||u.hash)throw new Error('请输入 HTTP 或 HTTPS 接口地址，地址中不要包含密钥、查询参数或账号密码。');
  u.pathname=u.pathname.replace(/\/+$/,'').replace(/\/(?:chat\/completions|models)$/,'').replace(/\/api\/(?:tags|chat|generate)$/,'/v1');
  return u.href.replace(/\/+$/,'');
}
export function addressSpace(endpoint) {
  const h=new URL(endpoint).hostname.toLowerCase();
  if(h==='localhost'||h.endsWith('.localhost')||h==='[::1]'||/^127\./.test(h))return 'loopback';
  const p=h.split('.').map(Number);
  if(h.endsWith('.local')||h==='[fc00::1]'||/^\[(?:fc|fd|fe80:)/.test(h)||p.length===4&&(p[0]===10||p[0]===192&&p[1]===168||p[0]===172&&p[1]>=16&&p[1]<=31||p[0]===169&&p[1]===254))return 'local';
  return null;
}
export function modelCandidates(endpoint) {
  const base=normalizeEndpoint(endpoint),u=new URL(base);
  const candidates=[{url:base+'/models',base}];
  if(!/\/v\d+(?:beta)?$/.test(u.pathname))candidates.push({url:base+'/v1/models',base:base+'/v1'});
  if(u.pathname==='/v1'||u.pathname==='/')candidates.push({url:u.origin+'/models',base:u.origin},{url:u.origin+'/api/tags',base:u.origin+'/v1'});
  return candidates;
}
export function parseModels(payload) {
  const rows=Array.isArray(payload)?payload:payload?.data??payload?.models;
  if(!Array.isArray(rows))throw new Error('服务没有返回可识别的模型列表，可以手动填写模型 ID。');
  const ids=rows.map(r=>typeof r==='string'?r:r?.id??r?.name??r?.model).filter(x=>typeof x==='string'&&x.trim()&&x.length<=300).map(x=>x.trim());
  return [...new Set(ids)].sort((a,b)=>a.localeCompare(b)).slice(0,1000);
}
export function connectionError(error,endpoint,pageProtocol='https:') {
  if(error?.name==='AbortError')return '连接超时。请确认服务已启动、地址正确后重试。';
  if(error?.message&&!['Failed to fetch','fetch failed','Load failed'].includes(error.message))return error.message;
  if(endpoint?.startsWith('http:')&&pageProtocol==='https:'&&!addressSpace(endpoint))return '浏览器阻止了 HTTPS 页面访问普通 HTTP 服务。请使用下方的本地连接版，或给接口配置 HTTPS。';
  if(addressSpace(endpoint))return '无法连接本地服务。请确认服务已启动，并允许当前网站的本地网络访问和跨域请求；也可以使用下方的本地连接版。';
  return '无法连接接口。请检查地址、网络和服务端 CORS 跨域设置；本地连接版可通过本机转发。';
}
let bridgePromise;
export async function localBridgeAvailable() {
  if(typeof location==='undefined'||!addressSpace(location.href)||addressSpace(location.href)!=='loopback')return false;
  if(!bridgePromise)bridgePromise=fetch('/__frontier_health',{credentials:'omit',signal:AbortSignal.timeout(1500)}).then(r=>r.ok?r.json():null).then(p=>p?.frontierBridge===1).catch(()=>false);
  return bridgePromise;
}
export async function apiRequest(url,init={}) {
  if(await localBridgeAvailable())return fetch('/__frontier_api',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({url,method:init.method||'GET',headers:init.headers||{},body:init.body}),signal:init.signal});
  const space=addressSpace(url);
  return fetch(url,{...init,credentials:'omit',redirect:'error',...(space?{targetAddressSpace:space}:{})});
}
export async function discoverModels(endpoint,key='',{request=apiRequest,signal}={}) {
  let last;
  for(const candidate of modelCandidates(endpoint)){
    if(signal?.aborted)throw new DOMException('Aborted','AbortError');
    try{
      const response=await request(candidate.url,{headers:key?{Authorization:'Bearer '+key}:{},signal});
      if(response.status===401||response.status===403)throw Object.assign(new Error('鉴权失败（HTTP '+response.status+'），请检查 API Key 和访问权限。'),{stop:true});
      if(!response.ok){last=new Error('模型列表接口返回 HTTP '+response.status+'，你仍可手动填写模型 ID。');continue;}
      const models=parseModels(await response.json());
      if(!models.length){last=new Error('服务已连接，但还没有可用模型。请先在服务端下载或加载模型。');continue;}
      return {models,endpoint:candidate.base};
    }catch(error){if(error.stop||error.name==='AbortError')throw error;last=error;if(error instanceof TypeError)break;}
  }
  throw last||new Error('没有读取到模型，请手动填写模型 ID。');
}
