import "./styles/global.scss";
import "./styles/search.scss";
import { SimpleWeather } from "./components/SimpleWeather";
import { useState } from "react";
import { FaSearch } from 'react-icons/fa'

function App() {
  const [search, setSearch] = useState<string>("Jequié");
  const [locale, setLocale] = useState<string>(search);
  

  function handleChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleSearch() {
    setLocale(search)
  }

  return ( 
    <div id="main-container">  
      <span id="search-container">
        <input type="text" value={search} placeholder="Insira um local" onChange={handleChangeValue} onKeyDown={e => {
          if(e.code === 'Enter' || e.code === 'NumpadEnter') {
            handleSearch()
          }
        }} />
        <button onClick={handleSearch}><FaSearch size={25} color="#fff"/></button>
      </span>
      <SimpleWeather city={locale} openWeatherID={import.meta.env.VITE_API_ID} />
      <footer>Desenvolvido por <a href="https://linkedin.com/in/patrickmps/" target="_blank">Patrick Mota</a></footer>
    </div>
  );
}

export default App;
