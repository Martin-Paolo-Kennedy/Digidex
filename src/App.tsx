import { useState } from 'react'
import './App.css'
import Digimon from './Components/Digimon';
import TextField from '@mui/material/TextField';

function App() {
  const [id, setId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(Number(e.target.value));
  };
  return (
    <>
      <div className="App">
        <h1>Buscar Digimon</h1>
        <TextField type="number" onChange={handleInputChange} placeholder="Insertar id del digimon" id="filled-basic" label="Digimon ID" variant="filled" />
        {id && <Digimon id={id} />}
      </div>
    </>
  )
}

export default App
