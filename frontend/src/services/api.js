import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export async function criarAtividade(atividade) {
    const resposta = await api.post("/atividade", atividade);

    return resposta.data;
}

export async function buscarAtividades() {
    const resposta = await api.get("/atividade");

    return resposta.data;
}

export default api;