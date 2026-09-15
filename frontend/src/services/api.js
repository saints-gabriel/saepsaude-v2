import axios from "axios";

export const api = axios.create({
    baseURL: "https://backend-app-corrida-p6qa.onrender.com/"
});

export async function criarAtividade(atividade) {
    const resposta = await api.post("/atividades/criar", atividade);

    return resposta.data;
}

export async function buscarAtividades() {
    const resposta = await api.get("/atividades");

    return resposta.data;
}

export default api;