import { useEffect } from 'react';
import './App.css';
import {Main} from './app/Main';

function App() {
  useEffect(()=>{document.title="Student-Grents"},[])
  return (
    <Main></Main>
  );
}

export default App;
