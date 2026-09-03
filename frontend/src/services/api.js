// conexao para o backend para cadastrar novas atividades e buscar atividades cadastradas
  import axios from 'axios';

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL 
  }); 

  api.interceptors.resquest.use((config) =>{

    const token = localStorage.getItem('token');
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
  });

  export async function criarAtividades(atividade){

    const resposta = await api.get('/atividade');

    return resposta.data
}

export default api;