import { useParams } from 'react-router-dom';
import { seriesData } from './home';

function Serie() {
  const { id } = useParams();
  const serie = seriesData.find((item: any) => item.id === parseInt(id || '0', 10));

  if (!serie) {
    return <div>Série non trouvée.</div>;
  }

  return (
    <div>
      <h1>Détails de la série : {serie.name}</h1>
      <img src={serie.imageUrl} alt={serie.name} />
      <p>Résumé : {serie.name}</p>
      <p>Distribution : {serie.name}</p>
      <p>Saisons : {serie.name}</p>
    </div>
  );
};

export default Serie;
