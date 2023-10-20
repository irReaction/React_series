import axios from "axios";

export default async function fetchSerieData(sortOrder: string | undefined) {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/tv",
      {
        params: {
          api_key: "c502595c535b3bcebeeec3b468325e4b",
          sort_by: `vote_average.${sortOrder}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de films :",
      error
    );
  }
}
