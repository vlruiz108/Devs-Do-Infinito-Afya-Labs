import express from 'express';
import routes from './routes.js';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import apiDoc from './api-doc.json';

const app = express();

export function create() {
    app.use(cors());
    app.use(express.json());
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(apiDoc));
    app.use('/', routes);

    app.get('/', (req, res) => {
        res.send({
            message: 'Welcome to AGmed - Afya-Labs',
            doc: 'https://devs-agmed-afya.herokuapp.com/docs' 
        });
    });
    return app;
}

export function start() {
    const PORT = process.env.PORT || 3001;

    app.listen(PORT, () => {
        console.log('Servidor online');
    });
}

create();
start();