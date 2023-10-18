import React, { useState, useEffect } from 'react';
import './Profil.scss';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function Profil() {
  const [name, setName] = useState('');
  const [data, setData] = useState<{ name: string }[]>([]);
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
      const dataArray: { name: string }[] = [];
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data() as { name: string });
      });
      setData(dataArray);
    }

    fetchData();
  }, [db]);

  return (
    <div id="page_inscription">
      <h1>Données de Firestore</h1>
      <div id="div_inscription">
        <ul>
          {data.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profil;
