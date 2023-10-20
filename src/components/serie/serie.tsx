import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// css and components
import "./serie.scss";

// fetchs and api stuff
import fetchSerieDetails from "../../api/tmdb/fetchSerieDetails";

// misc
import Movie from "../../misc/interfaces/interfaces";

function Serie() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [serie, setSerie] = useState<Movie | null>(null);
  const userLocal = localStorage.userEmail;

  useEffect(() => {
    fetchSerieDetails(id).then((response) => {
      response && setSerie(response.data);
    });
  }, [id]);

  return (
    <div className="serieId">
      {!userLocal ? (
        <div className="no_profile_serie">
          <button className="route_serie" onClick={() => navigate('/connexion')}>Connecte-toi</button>
        </div>
      ) : (
        <div className="page_serie_info">
          {serie ? (
            <div className="serie_info">
              <h1 className="title_serie">Détails de la serie :</h1>
              <img src={`https://image.tmdb.org/t/p/w200/${serie.poster_path}`} alt={serie.title}/>
              <p>Résumé : {serie.overview}</p>
              <p>Note : {serie.vote_average}</p>
              <p>Nombre de votes : {serie.vote_count}</p>
            </div>
          ) : (
            <div className="chargement">
              <p>Chargement en cours...</p>
            </div>
          )}
          <div className="accueil">
            <button className="route_serie" onClick={() => navigate('/')}>Accueil</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Serie;
