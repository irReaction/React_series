import React, { useState, useEffect } from 'react';
import './Connexion.scss';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, DocumentData } from 'firebase/firestore';

function Connexion() {
    const [name, setName] = useState('');
    const [data, setData] = useState<DocumentData[]>([]); // Utilisation du type DocumentData  
  const [successMessage, setSuccessMessage] = useState('');

  const firebaseConfig = {
    apiKey: 'AIzaSyBLVJ-BSHE-c4bLNoFkm2w-VpELqUQYVEA',
    authDomain: 'ereaction-32679.firebaseapp.com',
    projectId: 'ereaction-32679',
    storageBucket: 'ereaction-32679.appspot.com',
    messagingSenderId: '1082701041903',
    appId: '1:1082701041903:web:3912481e52aec1b31f4b1a',
    measurementId: 'G-82HPE8X2S0',
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, 'utilisateur'));
      const dataArray: DocumentData[] = []; // Utilisation du type DocumentData
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data());
      });
      setData(dataArray);
    }

    fetchData();
  }, [db]);

const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const docRef = await addDoc(collection(db, 'utilisateur'), {
            name: name,
        });

        setName(''); // Réinitialise le champ "name"
        setSuccessMessage('Utilisateur ajouté avec succès!');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur : ', error);
    }
};

  return (
    <div id="page_connexion">
      <h1>Ajouter un utilisateur</h1>
      <div id="div_connexion">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Ajouter</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
      <h1>Données de Firestore</h1>
      <div id="div_connexion">
        <ul>
          {data.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Connexion;
