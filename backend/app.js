
import express from 'express';
import sequelize from './src/config/db.js'
import { corsConfig } from './src/config/cors.js';
import userRouter from './src/routes/user.route.js';
import atividadeRouter from './src/routes/atividade.route.js';
import './src/models/user.models.js';
import './src/models/atividade.models.js'

const app = express();

app.use(express.json());
app.use(corsConfig);

app.use('/user', userRouter);
app.use('/atividade', atividadeRouter);

sequelize.sync({ alter: true })

.then(() => {
    app.listen(process.env.SERVE_PORT, () => {
        console.log(`Servidor rodando em: localhost:${process.env.SERVE_PORT}`);
    });
})
.catch(error => console.log('Erro ao acessar API/SERVE', error));
