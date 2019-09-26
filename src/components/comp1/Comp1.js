
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './comp1.module.css';
function Comp1() {

  const [data, setData] = useState([]);
  const [filteredNames, setFilteredNames] = useState([])
  const [query, setQuery] = useState(1);
  const [url, setUrl] = useState(
    'https://reqres.in/api/users?page=1',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getPersent = (selected, total) => {
    return Math.floor(selected * 100 / total);
  }

  useEffect( () => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data.data);
        setFilteredNames(result.data.data.filter( user => user.first_name.length + user.last_name.length > 12 ))
        setIsLoading(false);

      } catch (error) {
        setIsError(true);
        setIsLoading(false);

      }
      } 
    fetchData();
  },[url]);



  return (
    <div className={styles.container1}>
    <div className={styles.linkContainer}>
        <a href="https://github.com/LucianoLupo/axiosdemo" target="_blank"> Ver Codigo en gitHub </a>
        <a href="https://www.lucianolupo.com" target="_blank"> Mi portfolio </a>
    </div>


    {
        <div style={{margin:'0 auto'}}>
            <input
            type="text"
            value={query}
            onChange={event => setQuery(event.target.value)}
        />
        <button
            type="button"
            onClick={() =>
            setUrl(`https://reqres.in/api/users?page=${query}`)
            }
        >
            Search
        </button>
        {isError && <div>Something went wrong ...</div>}
        {isLoading ? (
            <div>Loading ...</div>
        ) : (
            <span></span>
        )}
        </div>
    }
      {
        data.length > 0 ?
        <>
        <div className={styles.listContainer}>
        <div className={styles.listTotal}>
        <h2>Lista Total:</h2>

        {data.map(item => (
                <h3 key={item.id}>
                {item.first_name} {item.last_name}
                </h3>
            ))}
        </div>
        <div className={styles.listFiltered}>
        <h2>Lista filtrada:</h2>
          {filteredNames.map(item => (
            <h3 key={item.id}>
              {item.first_name} {item.last_name}          
            </h3>
          ))}
        </div>
        </div>
        <div className={styles.resultContainer}>
          <h3>El porcentaje de personas cuyo nombre + apellido tienen mas de 12 caracteres es:</h3>
          <h1> {getPersent(filteredNames.length, data.length)} % </h1>
        </div>

        </>
        : <p style={{textAlign:'center'}}> Nothing found</p>
      }

    </div>
  );
}
export default Comp1;

