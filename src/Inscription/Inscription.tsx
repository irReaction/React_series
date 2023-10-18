import React, { useState, useEffect } from 'react';
import './inscription.scss';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, DocumentData } from 'firebase/firestore';

function Inscription() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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


const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const docRef = await addDoc(collection(db, 'utilisateur'), {
            name: name,
            email: email,
            password: password
        });

        setName(''); 
        setEmail(''); 
        setPassword(''); 

        setSuccessMessage('Utilisateur ajouté avec succès!');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur : ', error);
    }
};

  return (
    <div id="page_inscription">
      <h1>Inscription</h1>
      <div id="div_inscription">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Votre pseudo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Créer</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
}

export default Inscription;
