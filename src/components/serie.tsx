import React from 'react';
import { useParams } from 'react-router-dom';
import seriesData from './home';

const Serie: React.FC = () => {
  const { id } = useParams();
  const serie = seriesData.find((item) => item.id === parseInt(id, 10));

  if (!serie) {
    return <div>Série non trouvée.</div>;
  }

  return (
    <div>
      <h1>Détails de la série : {serie.name}</h1>
      <img src={serie.imageUrl} alt={serie.name} />
      <p>Résumé : {serie.summary}</p>
      <p>Distribution : {serie.cast}</p>
      <p>Saisons : {serie.seasons}</p>
    </div>
  );
};

export default Serie;
