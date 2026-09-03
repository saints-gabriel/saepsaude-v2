import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidepanel } from './components/Sidepanel.jsx'
import { Header } from './components/Header.jsx'
import { Filter } from './components/Filter.jsx';
import { Activity } from './components/Activity.jsx';
import ActivityForm from './components/ActivityForm.jsx';
import './App.css'
import { buscarAtividades } from './services/api.js';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('usuario');
    return savedUser ? JSON.parse(savedUser) : null;
  });


  const [showActivityForm, setShowActivityForm] = useState(false);
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarAtividades = async () => {
      try {
        const atividades = await buscarAtividades();
        setActivities(atividades);
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
        count={user ? activities.length : '-'}
        calories={user ? 0 : '-'}
        avatarUrl={user?.image}
        
        onActivityClick={() => setShowActivityForm(true)}
      />
      
      <main className="mainContent">
  <Header user={user} setUser={setUser} />

  {showActivityForm ? (
    <ActivityForm
     onCreate = {(activity) =>{

      //adiciona a nova atividade na lista de atividades
      setActivities([...activities, activity]);
      //fecha o formulario
      setShowActivityForm(false);

     }}
    />
  ) : (
    <>
      <Filter />

      <div className="activitiesContainer">
        {loading ? (
          <p>Carregando atividades...</p>
        ) : activities.length === 0 ? (
          <p>Nenhuma atividade encontrada.</p>
        ) : activities.map((activity) => (
          <Activity 
          key={activity.id} 
          
          name={
            activity.tipo_atividade =="corrida"
            ?"corrida"
            : activity.tipo_atividade =="caminhada"
            ?"caminhada"
            :"trilha"
          
          }
          
          user={user?.name || "visitante"}

          distance={`${activity.distancia_percorrida}m`}

          duration={`${activity.duracao_atividade}min`}

          calories={`${activity.quantidade_calorias}cal`}

          likes = {0}

          coments={0}
          />
        ))}
         </div>
          </>
      )}
    </main>
  </div>
  )
}


export default App
