
//Cacdastrar novas atividades e buscar atividades cadastradas
import { Atividades } from '../models/atividade.models.js';

async function carregarAtividade(req, res) {
    try {
       
        const atividades = await Atividades.findAll();

       
        return res.status(200).json(atividades);

    } catch (error) {
       
        return res.status(500).json({
            error: "Erro ao buscar atividades"
        });
    }

    
}   
    async function cadastrarAtividade (req, res){
        try{
            const {
                tipo_atividade,
                distancia_percorrida,
                duracao_atividade,
                quantidade_calorias,
                usuario_id
            } = req.body;

            const atividade = await Atividades.create({
                tipo_atividade,
                distancia_percorrida,
                duracao_atividade,
                quantidade_calorias,
                usuario_id
            });
            return res.status(201).json(atividade)
        }catch (error){
            return res.status(500).json({
                error: "Erro ao cadastrar atividade"
            });
        }
 }  

    export{
        carregarAtividade,
        cadastrarAtividade
    }

    