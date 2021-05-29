import express from 'express';
import routes from './routes.js';

const app = express();
app.get('/', (req, res) => {
    res.send('oi')
});
app.use(express.json());
app.use('/', routes);


app.listen(3001, () => {
    console.log('Servidor online');
});