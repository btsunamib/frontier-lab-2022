import importlib.util,json,threading,unittest,urllib.request,urllib.error
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from pathlib import Path
spec=importlib.util.spec_from_file_location('local_connector',Path(__file__).parents[1]/'start-local.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
class API(BaseHTTPRequestHandler):
 def log_message(self,*args):pass
 def do_GET(self):
  if self.path=='/redirect':self.send_response(302);self.send_header('Location','http://example.com');self.end_headers();return
  body=json.dumps({'data':[{'id':'http-model'}],'authorization':self.headers.get('Authorization')}).encode();self.send_response(200);self.send_header('Content-Type','application/json');self.end_headers();self.wfile.write(body)
class ConnectorTests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.api=ThreadingHTTPServer(('127.0.0.1',0),API);cls.bridge=ThreadingHTTPServer(('127.0.0.1',0),module.Handler)
  for server in [cls.api,cls.bridge]:threading.Thread(target=server.serve_forever,daemon=True).start()
  cls.origin=f'http://127.0.0.1:{cls.bridge.server_port}'
 @classmethod
 def tearDownClass(cls):
  for server in [cls.api,cls.bridge]:server.shutdown();server.server_close()
 def call(self,path='/v1/models',origin=None):
  body=json.dumps({'url':f'http://127.0.0.1:{self.api.server_port}'+path,'headers':{'Authorization':'Bearer temporary-test-key'}}).encode()
  req=urllib.request.Request(self.origin+'/__frontier_api',data=body,headers={'Origin':origin or self.origin,'Content-Type':'application/json'})
  try:r=urllib.request.urlopen(req)
  except urllib.error.HTTPError as error:r=error
  with r:return r.status,json.loads(r.read())
 def test_http_model_list_and_memory_only_key_forwarding(self):
  status,data=self.call();self.assertEqual(status,200);self.assertEqual(data['data'][0]['id'],'http-model');self.assertEqual(data['authorization'],'Bearer temporary-test-key')
 def test_other_websites_cannot_use_local_connector(self):self.assertEqual(self.call(origin='https://other.example')[0],403)
 def test_redirects_do_not_forward_credentials_to_another_host(self):self.assertEqual(self.call('/redirect')[0],400)
 def test_health(self):
  with urllib.request.urlopen(self.origin+'/__frontier_health') as response:self.assertEqual(json.load(response),{'frontierBridge':1})
if __name__=='__main__':unittest.main()
