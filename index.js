const express = require('express');
const morgan = require('morgan');
const httpProxy = require('express-http-proxy');
const app = express();


app.use(morgan('dev'));

function selectProxyHost(req){
    if(req.path.startsWith('/url')){
        return 'http://localhost:3000';
    }else if(req.path.startsWith('/url2')){
        return 'http://localhost:3001';
    }
}

app.use((req, res, next)=>{
    httpProxy(selectProxyHost(req)(req, res, next));
});

app.listen('10000', ()=>{
    console.log('Servidor rodando na porta 10000');
});

