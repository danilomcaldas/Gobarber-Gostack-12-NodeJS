import express from 'express';
import routes from './routes';
import 'reflect-metadata'

import './database/index';

const app = express();
app.use(express.json());
app.use(routes);



app.get('/', (request, response)=>{
    
    return response.json({message : 'Gostack'});
});

app.listen(3333, ()=>{
    console.log('Server started on port 3333')
});