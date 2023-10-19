import React, { useState, useEffect } from 'react';
import './Profil.scss';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { firebaseConfig } from '../Fonctions/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Profil() {
  const navigate = useNavigate(); 
  const userEmail = localStorage.userEmail;
  if (!userEmail) {
    setTimeout(() => {navigate('/profil');}, 3000);      
    return;
  }
  const [dataName, setDataName] = useState('');
  const [dataEmail, setDataEmail] = useState('');
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    async function fetchData() {

      const q = query(collection(db, 'utilisateur'), where('email', '==', userEmail));
      const resultGetUserData = await getDocs(q);

      if (resultGetUserData.size > 0) {
        // S'assurer qu'il y a des données correspondantes
        const userData = resultGetUserData.docs[0].data();
        setDataName(userData.name);
        setDataEmail(userData.email);
      }
    }

    fetchData();
  }, [db, userEmail]);

  return (
    <div id="page_inscription">
      <h1>Profile</h1>
      <button onClick={() => {localStorage.clear(); navigate('/connexion');}}>Déconnexion</button>
      <div id="div_inscription">
        <p>Nom : {dataName}</p>
        <p>Email : {dataEmail}</p>
      </div>
    </div>
  );
}

export default Profil;
