import axios from "axios";

export default async function fetchSerieDetails(id: string | undefined) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}`,
      {
        params: {
          api_key: "c502595c535b3bcebeeec3b468325e4b",
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
