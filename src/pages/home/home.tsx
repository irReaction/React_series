import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, query, where, DocumentData, Query, DocumentReference, getDocs } from "firebase/firestore";

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
import { firebaseConfig } from "../../Fonctions/firebaseConfig";

function Home() {
  const [series, setSeries] = useState<Movie[]>([]);
  const [sortOrderByNote, setSortOrderByNote] = useState("asc");
  const [sortOrderByName, setSortOrderByName] = useState("asc");
  const [search, setSearch] = useState("");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

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
        await addDoc(collection(userDocRef, 'series'), {
          seriesId: serieID,
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
    <div className="Home div_home">
      <div className="Films div_home">
        <div className="SearchBar div_home">
          <Input
            onChange={(e) => setSearchValue(e.target.value)}
          ></Input>
        </div>
        <div className="Buttons div_home">
          <button className="Button"
            onClick={() =>
              setSortOrderByNote(sortOrderByNote === "asc" ? "desc" : "asc")
            }
          >
            Trier par note{" "}
            {sortOrderByNote === "asc" ? "décroissante" : "croissante"}
          </button>
          <button
            onClick={() =>
              setSortOrderByName(sortOrderByName === "asc" ? "desc" : "asc")
            }
          >
            Trier par nom {sortOrderByName === "asc" ? "décroissant" : "croissant"}
          </button>
        </div>
        <ul>
          {series.map((serie) => (
            <Link to={`/serie/${serie.id}`} key={serie.id}>
              <li>
                <button onClick={() => AjouteSerie(serie.id)}>+</button>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${serie.poster_path}`}
                  alt={serie.title}
                />
                <h2>{serie.title}</h2>
                <p>Note : {serie.vote_average}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
