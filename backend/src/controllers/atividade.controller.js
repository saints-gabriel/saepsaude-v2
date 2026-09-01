import { Atividades } from '../models/atividade.models.js';

async function carregarAtividade(req, res) {
    try {
        const atividades = await Atividades.findAll();
        
        return res.status(200).json(atividades);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export default carregarAtividade