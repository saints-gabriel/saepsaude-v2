//j
import { Router } from 'express';

import {
    carregarAtividade,
    cadastrarAtividade
} from '../controllers/atividade.controller.js';

const atividadeRouter = Router();


atividadeRouter.get('/', carregarAtividade);


atividadeRouter.post('/', cadastrarAtividade);

export default atividadeRouter;