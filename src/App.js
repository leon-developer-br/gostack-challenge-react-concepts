import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import faker from 'faker';

import './styles.css';
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(()=> {
    api.get('repositories').then( response => {
      setRepositories(response.data);
    })
  }, [])
  
  async function handleAddRepository() {    
    const { department, productName, product } = faker.commerce;
        
    const title = productName();
    const company = department();
    const repo = product();
    
    const { data } = await api.post('repositories', 
      {
        title,
        url: `http://github.com/${company}/${repo}`,
        techs: ["Node", "Rest", "API"]
      }
    );
    setRepositories([...repositories, data]);
  }
  
  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const filteredRepositories = repositories.filter(repository => repository.id !== id)
    setRepositories([...filteredRepositories])
  }
  
  function RepositoryList() {    
    return (
      <ul data-testid="repository-list">        
        { 
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title} 
              <button className="btn btn-rm" onClick={() => handleRemoveRepository(repository.id)}> Remover  </button>
            </li> 
          ))
        }
      </ul>
    )
  }
  
  return (
    <>
      <Header title="Lista de repositórios" />
      <RepositoryList />
      <button className="btn btn-add" onClick={handleAddRepository}> Adicionar </button>
    </>
  )
}

export default App;