import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, query, where, DocumentData, Query, DocumentReference, getDocs, updateDoc } from "firebase/firestore";

import { useNavigate } from 'react-router-dom';

// css
import "./home.scss";

// api
import fetchSerieData from "../../api/tmdb/fetchSerieData";
import searchSerie from "../../api/tmdb/searchSerie";

// components
import { Input } from "@nextui-org/input";

// misc
import Movie from "../../misc/interfaces/interfaces";
import {
  sortedSeriesByName,
  sortedSeriesByNote,
} from "../../misc/functions/sortSeries";
import { firebaseConfig } from "../../firebase/firebaseConfig";

function Home() {
  const navigate = useNavigate();
  const [series, setSeries] = useState<Movie[]>([]);
  const [sortOrderByNote, setSortOrderByNote] = useState("asc");
  const [sortOrderByName, setSortOrderByName] = useState("asc");
  const [search, setSearch] = useState("");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const userLocal = localStorage.userEmail;

  useEffect(() => {
    if (search) {
      setTimeout(async () => {
        searchSerie(search).then((response) => {
          if (response) {
            setSeries(response.data.results);
          }
        });
      }, 600);
    }
  }, [search]);

  useEffect(() => {
    fetchSerieData(sortOrderByNote).then((response) => {
      if (response) {
        setSeries(response.data.results);
      }
    });
  }, [sortOrderByNote]);

  useEffect(() => {
    const sortedByNote = sortedSeriesByNote(series, sortOrderByNote);
    setSeries(sortedByNote);
  }, [sortOrderByNote]);

  useEffect(() => {
    const sortedByName = sortedSeriesByName(series, sortOrderByName);
    setSeries(sortedByName);
  }, [sortOrderByName]);

  const AjouteSerie = async (serieID: number) => {
    try {
      const userEmail = localStorage.userEmail;
      const userQuery = query(collection(db, 'utilisateur'), where('email', '==', userEmail));
      const userQuerySnapshot = await getDocs(userQuery);
  
      if (!userQuerySnapshot.empty) {
        const userDocRef: DocumentReference = userQuerySnapshot.docs[0].ref;
          const userDoc = userQuerySnapshot.docs[0];
          const currentSeries = userDoc.data().seriesId || [];
          currentSeries.push(serieID);
          
          await updateDoc(userDocRef, {
          seriesId: currentSeries,
        });
        console.log("Série ajoutée");
      } else {
        console.log("Utilisateur non trouvé");
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la série : ', error);
    }
  };
  

  const setSearchValue = (value: string) => {
    setSearch(value);
  };

  return (

    <div className="home">
      {!userLocal ? (
        <div className="no_profile">
          <button className="route" onClick={() => navigate('/connexion')}>Connecte-toi</button>
        </div>
      ) : (
        <div className="with_profile">
          <div className="navigate">
            <h1 className="title">LISTE DES SÉRIES</h1>
            <button className="route" onClick={() => navigate('/profil')}>Profil</button>
          </div>
          <div className="searchBar">
            <Input onChange={(e) => { setSearch(e.target.value); }}></Input>
          </div>
          <div className="buttons">
            <div className="selectButton">
              <button className="buttonId" onClick={() => setSortOrderByNote(sortOrderByNote === "asc" ? "desc" : "asc")}>
                Trier par note{" "}
                {sortOrderByNote === "asc" ? "décroissante" : "croissante"}
              </button>
            </div>
            <div className="selectButton">
              <button className="buttonId" onClick={() => setSortOrderByName(sortOrderByName === "asc" ? "desc" : "asc")}>
                Trier par nom {sortOrderByName === "asc" ? "décroissant" : "croissant"}
              </button>
            </div>
          </div>
          <div className="series">
            <ul>
              {series.map((serie) => (
                <div className="oneSerie" key={serie.id}>
                  <Link to={`/serie/${serie.id}`}>
                    <li>
                      <img src={`https://image.tmdb.org/t/p/w200/${serie.poster_path}`} alt={serie.title} /><br />
                      <button onClick={() => AjouteSerie(serie.id)}>+</button>
                      <p>Note : {serie.vote_average}</p>
                    </li>
                  </Link>
                </div>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;