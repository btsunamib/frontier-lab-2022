import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeEndpoint,modelCandidates,parseModels,discoverModels,addressSpace,connectionError} from '../dist/ai-client.js';
const reply=(status,payload)=>({status,ok:status>=200&&status<300,json:async()=>payload});
test('HTTP, HTTPS, completion and Ollama URLs normalize without leaking URL credentials',()=>{
 assert.equal(normalizeEndpoint('http://localhost:11434/'),'http://localhost:11434');
 assert.equal(normalizeEndpoint('http://192.168.1.8:8000/v1/chat/completions'),'http://192.168.1.8:8000/v1');
 assert.equal(normalizeEndpoint('https://example.com/api/v1/models/'),'https://example.com/api/v1');
 assert.equal(normalizeEndpoint('http://localhost:11434/api/tags'),'http://localhost:11434/v1');
 for(const u of ['file:///tmp/key','javascript:alert(1)','https://user:pass@example.com/v1','https://example.com/v1?api_key=private'])assert.throws(()=>normalizeEndpoint(u));
});
test('model list accepts OpenAI and Ollama shapes, deduplicates and preserves exact IDs',()=>{
 assert.deepEqual(parseModels({data:[{id:'qwen3:8b'},{id:'gpt-test'},{id:'qwen3:8b'}]}),['gpt-test','qwen3:8b']);
 assert.deepEqual(parseModels({models:[{name:'deepseek-r1:8b'},{model:'qwen3:8b'}]}),['deepseek-r1:8b','qwen3:8b']);
 assert.throws(()=>parseModels({choices:[]}));
});
test('root URL discovers v1 endpoint and uses a key only in request headers',async()=>{
 const calls=[];const result=await discoverModels('http://localhost:11434','test-key',{request:async(url,options)=>{calls.push({url,options});return url.endsWith('/v1/models')?reply(200,{data:[{id:'local-model'}]}):reply(404,{});}});
 assert.equal(result.endpoint,'http://localhost:11434/v1');assert.deepEqual(result.models,['local-model']);assert.equal(calls[0].options.headers.Authorization,'Bearer test-key');assert.ok(calls.every(x=>!x.url.includes('test-key')));
});
test('native Ollama fallback works and uses OpenAI compatible completion base',async()=>{
 const result=await discoverModels('http://localhost:11434/v1','',{request:async url=>url.endsWith('/api/tags')?reply(200,{models:[{name:'gemma4'}]}):reply(404,{})});
 assert.equal(result.endpoint,'http://localhost:11434/v1');assert.deepEqual(result.models,['gemma4']);
});
test('auth failure does not retry other endpoints and manual IDs remain possible',async()=>{
 let count=0;await assert.rejects(discoverModels('https://example.com','bad',{request:async()=>{count++;return reply(401,{})}}),/鉴权失败/);assert.equal(count,1);
 await assert.rejects(discoverModels('https://example.com/v1','',{request:async()=>reply(200,{data:[]})}),/还没有可用模型/);
});
test('HTTP network failures explain mixed content and local network access separately',()=>{
 assert.equal(addressSpace('http://127.0.0.1:11434'),'loopback');assert.equal(addressSpace('http://[::1]:11434'),'loopback');assert.equal(addressSpace('http://192.168.0.2'),'local');assert.equal(addressSpace('https://example.com'),null);
 assert.match(connectionError(new TypeError('Failed to fetch'),'http://example.com/v1','https:'),/本地连接版/);assert.match(connectionError(new TypeError('Failed to fetch'),'http://localhost:11434','https:'),/本地网络/);
 assert.ok(modelCandidates('https://example.com/custom/v1').every(x=>new URL(x.url).origin==='https://example.com'));
});
