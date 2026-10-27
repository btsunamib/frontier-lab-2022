#!/usr/bin/env python3
"""Run Frontier Lab locally, with a same-origin HTTP/HTTPS API connector.
No dependencies. Binds only to this computer; credentials are never stored.
"""
import http.server,json,os,socket,threading,urllib.request,urllib.error,urllib.parse,webbrowser
from pathlib import Path
ROOT=Path(__file__).resolve().parent
DIST=ROOT/'dist'
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,req,fp,code,msg,headers,newurl):return None
OPENER=urllib.request.build_opener(NoRedirect)
class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(DIST),**kwargs)
    def log_message(self,*args):pass
    def list_directory(self,path):self.send_error(403);return None
    def valid_host(self):return self.headers.get('Host') in {f'127.0.0.1:{self.server.server_port}',f'localhost:{self.server.server_port}'}
    def reply(self,status,payload):
        raw=json.dumps(payload,ensure_ascii=False).encode();self.send_response(status);self.send_header('Content-Type','application/json; charset=utf-8');self.send_header('Cache-Control','no-store');self.send_header('X-Content-Type-Options','nosniff');self.send_header('Content-Length',str(len(raw)));self.end_headers();self.wfile.write(raw)
    def do_GET(self):
        if not self.valid_host():self.reply(403,{'error':'Invalid local host'});return
        if self.path=='/__frontier_health':self.reply(200,{'frontierBridge':1});return
        super().do_GET()
    def do_POST(self):
        origin=self.headers.get('Origin');allowed={f'http://127.0.0.1:{self.server.server_port}',f'http://localhost:{self.server.server_port}'}
        if self.path!='/__frontier_api' or not self.valid_host() or origin not in allowed or self.headers.get('Content-Type','').split(';')[0]!='application/json':self.reply(403,{'error':'Only this local game can use the connector'});return
        try:
            length=int(self.headers.get('Content-Length','0'))
            if not 0<length<=1024*1024:raise ValueError('Request is too large or empty')
            p=json.loads(self.rfile.read(length));u=urllib.parse.urlsplit(p.get('url',''));method=p.get('method','GET')
            if u.scheme not in {'http','https'} or not u.hostname or u.username or u.password or u.fragment or method not in {'GET','POST'}:raise ValueError('Invalid HTTP API target')
            headers={'Accept':'application/json','User-Agent':'FrontierLab-Local/2.1'}
            for k,v in p.get('headers',{}).items():
                if k.lower() in {'authorization','content-type'} and isinstance(v,str) and '\r' not in v and '\n' not in v:headers[k]=v
            body=p.get('body');data=body.encode() if isinstance(body,str) and method=='POST' else None
            req=urllib.request.Request(p['url'],data=data,headers=headers,method=method)
            try:res=OPENER.open(req,timeout=45)
            except urllib.error.HTTPError as err:res=err
            with res:
                raw=res.read(2*1024*1024+1)
                if len(raw)>2*1024*1024:raise ValueError('API response is too large')
                if res.status in {301,302,303,307,308}:raise ValueError('API redirected. Use its final base URL instead.')
                # Only JSON is returned to the browser; HTML cannot be served by this endpoint.
                parsed=json.loads(raw)
                self.reply(res.status,parsed)
        except urllib.error.URLError:self.reply(502,{'error':{'message':'Local connector could not reach the API. Check the address and that the service is running.'}})
        except (ValueError,TypeError,KeyError,UnicodeError):self.reply(400,{'error':{'message':'The API did not return valid JSON, or the request was invalid.'}})
        except (TimeoutError,socket.timeout):self.reply(504,{'error':{'message':'API request timed out.'}})

def main():
    if not DIST.joinpath('index.html').exists():raise SystemExit('Keep start-local.py beside the dist folder.')
    server=None
    for port in range(8787,8798):
        try:server=http.server.ThreadingHTTPServer(('127.0.0.1',port),Handler);break
        except OSError:continue
    if server is None:raise SystemExit('Local ports 8787-8797 are busy.')
    url=f'http://127.0.0.1:{server.server_port}/';print('Frontier Lab: '+url+'\nKeep this window open. Press Ctrl+C to stop.\nAPI credentials are not saved or logged.',flush=True)
    threading.Timer(.5,lambda:webbrowser.open(url)).start()
    try:server.serve_forever()
    except KeyboardInterrupt:pass
    finally:server.server_close()
if __name__=='__main__':main()
