import React, { useState } from 'react';
import './Connexion.scss';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { firebaseConfig } from '../Fonctions/firebaseConfig';


function Inscription() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [messageInscriptionEffectuée, setMessageInscriptionEffectuée] = useState('');
  const [messageFormEmailVide, setMessageFormEmailVide] = useState('');
  const [messageFormPasswordVide, setMessageFormPasswordVide] = useState('');
  const [messageFormInvalide, setMessageFormInvalide] = useState('');

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  

  const gestionFormValidation = async (e: React.FormEvent<HTMLFormElement>) => {
    setMessageInscriptionEffectuée('');
    e.preventDefault();

    if (email === '') {
      setMessageFormEmailVide('Veuillez remplir ce champ avec votre email');
      return;
    } else { setMessageFormEmailVide(''); setMessageInscriptionEffectuée('');}

    if (password === '') {
      setMessageFormPasswordVide('Veuillez remplir ce champ avec votre mot de passe');
      return;
    } else { setMessageFormPasswordVide(''); setMessageInscriptionEffectuée('');}

    const getEmail = query(collection(db, 'utilisateur'), where('email', '==', email), where('password', '==', password));
    const resultGetEmail = await getDocs(getEmail);

    if (!resultGetEmail.empty) {
      setMessageInscriptionEffectuée('Votre compte a bien été connecté !');
      return;
    } else { setMessageFormInvalide('Connexion refusée : email ou mot de passe incorrect');}
  };

  return (
    <div id="page_inscription">
      <h1>Connexion</h1>
      <div id="div_inscription">
        <form onSubmit={gestionFormValidation}>
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {messageFormEmailVide && <p className="msgErrorFormVide">{messageFormEmailVide}</p>}

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
        <p>Pas encore de compte ? <Link className="boutonLiens" to="/inscription">Inscrivez-vous ici</Link></p>
        <br></br>
        {messageInscriptionEffectuée && <p className="msgInscriptionValide">{messageInscriptionEffectuée}</p>}
        {messageFormInvalide && <p className="msgConnexionInvalide">{messageFormInvalide}</p>}
      </div>
    </div>
  );
}

export default Inscription;
