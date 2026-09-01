import { Atividades } from '../models/atividade.models.js';
import { User } from '../models/user.models.js';

async function carregarAtividade(req, res) {
    try {
        const atividades = await Atividades.findAll({
            include: [{ model: User, attributes: ['id', 'nome', 'email', 'imagem'] }]
        });
        
        return res.status(200).json(atividades);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export default carregarAtividade