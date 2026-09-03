import { User } from '../models/user.models.js';

export async function loginUser(req, res) {
    try {
        const { email, senha } = req.body;

        const acessar = await User.findOne({ where: {email , senha} })

        if(!acessar){
            return res.status(404).json({error: "Usuário não encontrado" })
        }

        if(!senha){
            return res.status(401).json({ error: "Senha inválida" })
        }

        const { senha: _, ...usuario } = acessar.toJSON();

        res.status(200).json(usuario);

    } catch (error) {
        res.status(500).json(error);
    }
}
