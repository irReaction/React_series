import axios from "axios";

export default async function searchSerie(search: string) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key: "c502595c535b3bcebeeec3b468325e4b",
          query: search,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails du film :",
      error
    );
  }
}
