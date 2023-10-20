import Movie from "../interfaces/interfaces";

function sortedSeriesByName(
  series: Array<Movie>,
  sortOrderByName: string | undefined
) {
  const sortedSeriesByName = [...series];
  if (sortOrderByName === "asc") {
    sortedSeriesByName.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    sortedSeriesByName.sort((a, b) => b.title.localeCompare(a.title));
  }
  return sortedSeriesByName;
}

function sortedSeriesByNote(
  series: Array<Movie>,
  sortOrderByName: string | undefined
) {
  const sortedSeriesByNote = [...series];
  if (sortOrderByName === "asc") {
    sortedSeriesByNote.sort((a, b) => a.vote_average - b.vote_average);
  } else {
    sortedSeriesByNote.sort((a, b) => b.vote_average - a.vote_average);
  }
  return sortedSeriesByNote;
}

export { sortedSeriesByName, sortedSeriesByNote };
