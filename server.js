const http=require('http');
const fs=require('fs');
const path=require('path');
const urlParser=require('url');

const port=3001;

const getStatInfo=(path)=>{
  return new Promise((res,rej)=>{
    fs.stat(path,(err,stats)=>{
      if(err) {
        return rej(err);
      }
      return res(stats);
    })
  });
}

const filetype=(file)=>{
  let filetype=path.extname(file);
  filetype=filetype.replace('.','');
  if(filetype==='html') {
    return 'text/html';
  } else if(filetype==='css') {
    return 'text/css';
  } else if(filetype==='js') {
    return 'application/javascript; charset=utf-8';
  } else if(filetype==='png') {
    return 'image/png';
  }
}

const server=http.createServer((req,res)=>{
  const url=urlParser.parse(req.url);

  
  const filepath=path.join('./build/',(url.pathname==='/'?'index.html':url.pathname));
  
  getStatInfo(filepath)
  .then(stats=>{
    const headers={
      'Content-Type':filetype(filepath),
      'Content-Length':stats.size
    }
    console.log('url.pathname',filepath);
    const stream=fs.createReadStream(filepath);
    res.writeHead(200,headers);
  
    stream.pipe(res);

  })
  .catch(err=>{
    console.log('\x1b[031m%s\x1b[0m',err.message);
    res.writeHead(400);
    res.end('Error: '+err.message);
  });


  // res.end('end!');
});

server.listen(port,()=>{
  console.log('listening on '+port);
});