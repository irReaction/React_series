import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './home.scss';

export const seriesData = [
  { id: 1, name: 'Avengers', rating: 4.5, imageUrl: 'serie1.jpg', theme: 'superhero' },
  { id: 2, name: 'James Bond', rating: 3.8, imageUrl: 'serie2.jpg', theme: 'action' },
  { id: 3, name: 'Sherlock Holmes', rating: 4.2, imageUrl: 'serie3.jpg', theme: 'enquete' },
  { id: 4, name: 'Ça', rating: 4.8, imageUrl: 'serie4.jpg', theme: 'horreur' },
  { id: 5, name: 'Mad Max', rating: 2.7, imageUrl: 'serie5.jpg', theme: 'action' },
];

function Home() {
  const [series, setSeries] = useState(seriesData);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortOrderByName, setSortOrderByName] = useState('asc');
  const [selectedTheme, setSelectedTheme] = useState('Tous');

  useEffect(() => {
    // Fonction pour récupérer les données des films depuis l'API TMDb
    const fetchSeriesData = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/movie', {
            params: {
              api_key: 'c502595c535b3bcebeeec3b468325e4b',
              sort_by: `vote_average.${sortOrder}`,
            },
          }
        );
        setSeries(response.data.results);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de films :', error);
      }
    };

    fetchSeriesData();
  }, [sortOrder]);

  useEffect(() => {
    const sortSeries = () => {
      const sortedSeries = [...series];
      if (sortOrder === 'asc') {
        sortedSeries.sort((a, b) => a.rating - b.rating);
      } else {
        sortedSeries.sort((a, b) => b.rating - a.rating);
      }
      setSeries(sortedSeries);
    };

    sortSeries();
  }, [sortOrder]);

  useEffect(() => {
    const sortedSeriesByName = () => {
      const sortedSeriesByName = [...series];
      if (sortOrderByName === 'asc') {
        sortedSeriesByName.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        sortedSeriesByName.sort((a, b) => b.name.localeCompare(a.name));
      }
      setSeries(sortedSeriesByName);
    };

    sortedSeriesByName();
  }, [sortOrderByName]);

  const filterSeriesByTheme = (theme: string) => {
    if (theme === 'Tous') {
      setSeries(seriesData);
    } else {
      const filteredSeries = seriesData.filter((serie) => serie.theme === theme);
      setSeries(filteredSeries);
    }
    setSelectedTheme(theme);
  };

  const uniqueThemes = [...new Set(seriesData.map((serie) => serie.theme))];
  uniqueThemes.unshift('Tous');

  return (
    <div>
      <h1>LISTE DES FILMS</h1>
      <button
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        Trier par note {sortOrder === 'asc' ? 'décroissante' : 'croissante'}
      </button>
      <button
        onClick={() => setSortOrderByName(sortOrderByName === 'asc' ? 'desc' : 'asc')}
      >
        Trier par nom {sortOrderByName === 'asc' ? 'décroissant' : 'croissant'}
      </button>
      <div>
        <p>Filtrer par thème :</p>
        {uniqueThemes.map((theme) => (
          <button
            key={theme}
            onClick={() => filterSeriesByTheme(theme)}
            className={theme === selectedTheme ? 'active' : ''}
          >
            {theme}
          </button>
        ))}
      </div>
      <ul>
        {series.map((serie) => (
          <Link to={`/serie/${serie.id}`} key={serie.id}>
            <li>
              <img src={serie.imageUrl} alt={serie.name} />
              <h2>{serie.name}</h2>
              <p>Note : {serie.rating}</p>
              <p>Thème : {serie.theme}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Home;