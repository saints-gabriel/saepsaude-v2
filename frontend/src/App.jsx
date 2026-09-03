import { useState } from 'react';
import { Sidepanel } from './components/Sidepanel.jsx'
import { Header } from './components/Header.jsx'
import { Filter } from './components/Filter.jsx';
import { Activity } from './components/Activity.jsx';
import ActivityForm from './components/ActivityForm.jsx';
import './App.css'
import api from './services/api.js'

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('usuario');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [showActivityForm, setShowActivityForm] = useState(false);

  return (
    <div className="appShell">
      <Sidepanel
        name={user?.name || 'Visitante'}
        count={user ? 0 : '-'}
        calories={user ? 0 : '-'}
        avatarUrl={user?.image}
        
        onActivityClick={() => setShowActivityForm(true)}
      />
      
      <main className="mainContent">
  <Header user={user} setUser={setUser} />

  {showActivityForm ? (
    <ActivityForm
      onCreate={(activity) => {
        console.log('Atividade criada:', activity);
        setShowActivityForm(false);
      }}
      onCancel={() => setShowActivityForm(false)}
    />
  ) : (
    <>
      <Filter />

      <div className="activitiesContainer">
        <Activity
          name="Corrida Matinal"
          user="João Silva"
          distance="5 Km"
          duration="30 min"
          calories="250"
          likes={120}
          comments={5}
          />
         </div>
          </>
      )}
    </main>
  </div>
  )
}


export default App
