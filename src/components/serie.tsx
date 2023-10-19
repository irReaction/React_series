import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './serie.scss';

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
}

function Serie() {
  const { id } = useParams();
  const [serie, setSerie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchSerieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: 'c502595c535b3bcebeeec3b468325e4b',
          },
        });
        setSerie(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du film :', error);
      }
    };

    fetchSerieDetails();
  }, [id]);

  if (!serie) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div>
      <h1>Détails du film : {serie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w200/${serie.poster_path}`} alt={serie.title} />
      <p>Résumé : {serie.overview}</p>
      <p>Date de sortie : {serie.release_date}</p>
      <p>Note : {serie.vote_average}</p>
      <p>Nombre de votes : {serie.vote_count}</p>
    </div>
  );
}

export default Serie;
