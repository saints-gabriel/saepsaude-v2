import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidepanel } from './components/Sidepanel.jsx'
import { Header } from './components/Header.jsx'
import { Filter } from './components/Filter.jsx';
import { Activity } from './components/Activity.jsx';
import './App.css'

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('usuario');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarAtividades = async () => {
      try {
        const response = await axios.get('http://localhost:3000/atividade');
        setAtividades(response.data);
      } catch (error) {
        console.error('Erro ao carregar atividades:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarAtividades();
  }, []);

  return (
    <div className="appShell">
      <Sidepanel
        name={user?.nome || 'Visitante'}
        count={user ? atividades.length : '-'}
        calories={user ? 0 : '-'}
        avatarUrl={user?.imagem}
      />
        <main className="mainContent">
        <Header user={user} setUser={setUser} />
        <Filter/>
        <div className="activitiesContainer">
          {loading ? (
            <p>Carregando atividades...</p>
          ) : atividades.length > 0 ? (
            atividades.map((atividade) => (
              <Activity 
                key={atividade.id}
                name={atividade.tipo_atividade}
                user={atividade.user?.nome || 'Usuário'}
                distance={`${atividade.distancia_percorrida} Km`}
                duration={`${atividade.duracao_atividade} min`}
                calories={atividade.quantidade_calorias}
                likes={atividade.curtidas || 0}
                comments={atividade.comentarios || 0}
              />
            ))
          ) : (
            <p>Nenhuma atividade encontrada.</p>
          )}
        </div>
        </main>
      </div>
  )
}

export default App
