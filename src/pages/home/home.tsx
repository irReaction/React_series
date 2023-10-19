import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//css
import "./home.scss";

//api
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

function Home() {
  const [series, setSeries] = useState<Movie[]>([]);
  const [sortOrderByNote, setSortOrderByNote] = useState("asc");
  const [sortOrderByName, setSortOrderByName] = useState("asc");
  const [search, setSearch] = useState("");

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
        console.log(response.data.results);
      }
    });
  }, [sortOrderByNote]);

  useEffect(() => {
    const sorted = sortedSeriesByNote(series, sortOrderByNote);
    setSeries(sorted);
  }, [setSortOrderByName]);

  useEffect(() => {
    const sorted = sortedSeriesByName(series, sortOrderByName);
    setSeries(sorted);
  }, [sortOrderByName]);

  return (
    <div>
      <h1>LISTE DES FILMS</h1>
      <Input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></Input>
      <button
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
      <ul>
        {series.map((serie) => (
          <Link to={`/serie/${serie.id}`} key={serie.id}>
            <li>
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
  );
}

export default Home;
