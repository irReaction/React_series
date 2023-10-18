import React, { useState } from 'react';
import './Inscription.scss';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

function Inscription() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [messageInscriptionEffectuée, setMessageInscriptionEffectuée] = useState('');
  const [messageFormNameVide, setMessageFormNameVide] = useState('');
  const [messageFormEmailVide, setMessageFormEmailVide] = useState('');
  const [messageFormPasswordVide, setMessageFormPasswordVide] = useState('');
  const [messageEmailDejaUtilisé, setMessageEmailDejaUtilisé] = useState('');

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
  

  const gestionFormValidation = async (e: React.FormEvent<HTMLFormElement>) => {
    setMessageInscriptionEffectuée('');
    e.preventDefault();

    if (name === '') {
      setMessageFormNameVide('Veuillez remplir ce champ avec votre pseudo');
      return;
    } else { setMessageFormNameVide('');  setMessageInscriptionEffectuée('');}

    if (email === '') {
      setMessageFormEmailVide('Veuillez remplir ce champ avec votre email');
      return;
    } else { setMessageFormEmailVide(''); setMessageInscriptionEffectuée('');}

    if (password === '') {
      setMessageFormPasswordVide('Veuillez remplir ce champ avec votre mot de passe');
      return;
    } else { setMessageFormPasswordVide(''); setMessageInscriptionEffectuée('');}

    const emailQuery = query(collection(db, 'utilisateur'), where('email', '==', email));
    const emailSnapshot = await getDocs(emailQuery);

    if (!emailSnapshot.empty) {
      setMessageEmailDejaUtilisé('Cet email est déjà utilisé. Vous voulez vous connecter ?');
      return;
    } else { setMessageEmailDejaUtilisé(''); setMessageInscriptionEffectuée('');}

    try {
      const docRef = await addDoc(collection(db, 'utilisateur'), {
        name: name,
        email: email,
        password: password,
      });

      setName('');
      setEmail('');
      setPassword('');

      setMessageInscriptionEffectuée('Votre compte a bien été créé !');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur : ', error);
    }
  };

  return (
    <div id="page_inscription">
      <h1>Inscription</h1>
      <div id="div_inscription">
        <form onSubmit={gestionFormValidation}>
          <input
            type="text"
            placeholder="Votre pseudo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {messageFormNameVide && <p className="msgErrorFormVide">{messageFormNameVide}</p>}

          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {messageFormEmailVide && <p className="msgErrorFormVide">{messageFormEmailVide}</p>}
          {messageEmailDejaUtilisé && <p className="msgErrorFormVide">{messageEmailDejaUtilisé}</p>}

          <input
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {messageFormPasswordVide && <p className="msgErrorFormVide">{messageFormPasswordVide}</p>}

          <button type="submit">Créer</button>
        </form>
        <br></br>
        {messageInscriptionEffectuée && <p className="msgInscriptionValide">{messageInscriptionEffectuée}</p>}
      </div>
    </div>
  );
}

export default Inscription;
