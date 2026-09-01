
import { Router } from 'express';
import carregarAtividade from "../controllers/atividade.controller.js"

const atividadeRouter = Router();

atividadeRouter.get('/', carregarAtividade);

export default atividadeRouter;
