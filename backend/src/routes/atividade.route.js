
import { Router } from 'express';
import * as ControllerAtividade from "../controllers/atividade.controller.js"

const atividadeRouter = Router();

atividadeRouter.get('/', ControllerAtividade.carregarAtividade);

atividadeRouter.post('/criar', ControllerAtividade.criarAtividade)

export default atividadeRouter;
