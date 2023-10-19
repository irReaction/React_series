import React, { useState, useEffect } from 'react';
import './Profil.scss';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import { firebaseConfig } from '../Fonctions/firebaseConfig';


function Profil() {
  const [data, setData] = useState<{ name: string }[]>([]);
  const [name, setName] = useState('test');
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);



  useEffect(() => {
    async function fetchData() {
      const q = query(collection(db, 'utilisateur'), where('name', '==', name));
      const resultGetEmail = await getDocs(q);
      const dataArr: { name: string }[] = resultGetEmail.docs.map((doc) => doc.data() as { name: string });
      setData(dataArr);
    }

    fetchData();
  }, [db, name]);

  return (
    <div id="page_inscription">
      <h1>Données de Firestore</h1>
      <div id="div_inscription">
        <p>{data[0]?.name}</p>
      </div>
    </div>
  );
}

export default Profil;
