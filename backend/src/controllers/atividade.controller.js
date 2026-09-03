import { Atividades } from '../models/atividade.models.js';
import { User } from '../models/user.models.js';

export async function carregarAtividade(req, res) {
    try {
        const atividades = await Atividades.findAll({
            include: [{ model: User, attributes: ['id', 'nome', 'email', 'imagem'] }]
        });

        return res.status(200).json(atividades);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function criarAtividade(req, res) {
    try {
        const { tipo_atividade, distancia_percorrida, duracao_atividade, quantidade_calorias } = req.body;

        if (!tipo_atividade || !duracao_atividade) {
            return res.status(400).json({
                mensagem: "Tipo de atividade e duração são obrigatórios."
            });
        }

        const atividade = await Atividades.create({
            tipo_atividade,
            distancia_percorrida,
            duracao_atividade,
            quantidade_calorias
        });

        return res.status(201).json({
            mensagem: "Atividade criada com sucesso!",
            atividade
        });

    } catch (error) {
        console.error("Erro ao criar atividade:", error);

        return res.status(500).json({
            mensagem: "Erro interno ao criar atividade.",
            erro: error.message
        });
    }
}