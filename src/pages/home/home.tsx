import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './home.scss';

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
}

function Home() {
  const [series, setSeries] = useState<Movie[]>([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortOrderByName, setSortOrderByName] = useState('asc');

  useEffect(() => {
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
        sortedSeries.sort((a, b) => a.vote_average - b.vote_average);
      } else {
        sortedSeries.sort((a, b) => b.vote_average - a.vote_average);
      }
      setSeries(sortedSeries);
    };

    sortSeries();
  }, [sortOrder]);

  useEffect(() => {
    const sortedSeriesByName = () => {
      const sortedSeriesByName = [...series];
      if (sortOrderByName === 'asc') {
        sortedSeriesByName.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        sortedSeriesByName.sort((a, b) => b.title.localeCompare(a.title));
      }
      setSeries(sortedSeriesByName);
    };

    sortedSeriesByName();
  }, [sortOrderByName]);

  return (
    <div>
      <h1>LISTE DES FILMS</h1>
      <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Trier par note {sortOrder === 'asc' ? 'décroissante' : 'croissante'}
      </button>
      <button onClick={() => setSortOrderByName(sortOrderByName === 'asc' ? 'desc' : 'asc')}>
        Trier par nom {sortOrderByName === 'asc' ? 'décroissant' : 'croissant'}
      </button>
      <ul>
        {series.map((serie) => (
          <Link to={`/serie/${serie.id}`} key={serie.id}>
            <li>
              <img src={`https://image.tmdb.org/t/p/w200/${serie.poster_path}`} alt={serie.title} />
              <h2>{serie.title}</h2>
              <p>Note : {serie.vote_average}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Home;
