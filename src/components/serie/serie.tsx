import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// css and components
import "./serie.scss";

// fetchs and api stuff
import fetchSerieDetails from "../../api/tmdb/fetchSerieDetails";

// misc
import Movie from "../../misc/interfaces/interfaces";

function Serie() {
  const { id } = useParams();
  const [serie, setSerie] = useState<Movie | null>(null);
  const userLocal = localStorage.userEmail;

  useEffect(() => {
    fetchSerieDetails(id).then((response) => {
      response && setSerie(response.data);
    });
  }, [id]);

  return (
    <>
      {!userLocal && (
        <>
          <Link to={`/connexion`}><h1>Connecte-toi</h1></Link>
        </>
      )}
      {userLocal && (
        <>
          {serie && (
            <div>
              <h1>Détails du film : {serie.title}</h1>
              <img
                src={`https://image.tmdb.org/t/p/w200/${serie.poster_path}`}
                alt={serie.title}
              />
              <p>Résumé : {serie.overview}</p>
              <p>Date de sortie : {serie.release_date}</p>
              <p>Note : {serie.vote_average}</p>
              <p>Nombre de votes : {serie.vote_count}</p>
            </div>
          )}

          {!serie && (
            <div>
              <p>Chargement en cours...</p>
            </div>
          )}

          <Link to={`/`}>
            <h1>Retour à l'accueil</h1>
          </Link>
        </>
      )}
    </>
  );
}

export default Serie;
