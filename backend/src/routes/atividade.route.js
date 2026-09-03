//j
import { Router } from 'express';

import {
    carregarAtividade,
    cadastrarAtividade
} from "../controllers/atividade.controller.js";

const atividadeRouter = Router();

atividadeRouter.get('/atividades', carregarAtividade);

atividadeRouter.post('/atividades', cadastrarAtividade);

export default atividadeRouter;