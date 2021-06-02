import express from 'express';
import routes from './routes.js';

const app = express();

app.use(express.json());
app.use('/', routes);
app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to AGmed - Afya-Labs',
        doc: 'https://devs-agmed-afya.herokuapp.com/docs' 
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('Servidor online');
});

export default app