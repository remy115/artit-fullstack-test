const http=require('http');
const fs=require('fs');
const path=require('path');

const port=3010;

const server=http.createServer((req,res)=>{
  const basedir=path.join(__dirname,'../build/index.html');
  const file=fs.createReadStream();
  res.setHeader('Content-Type','text/html');
  file.pipe(res);
});

server.listen(port,()=>{
  console.log('Server listening on '+port);
});