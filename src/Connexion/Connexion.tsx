import React, { useState } from 'react';
import './Connexion.scss';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';
import { firebaseConfig } from '../Fonctions/firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


function Inscription() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [messageInscriptionEffectuée, setMessageInscriptionEffectuée] = useState('');
  const [messageFormEmailVide, setMessageFormEmailVide] = useState('');
  const [messageFormPasswordVide, setMessageFormPasswordVide] = useState('');
  const [messageFormInvalide, setMessageFormInvalide] = useState('');

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const navigate = useNavigate();


  const gestionFormValidation = async (e: React.FormEvent<HTMLFormElement>) => {
    setMessageInscriptionEffectuée('');
    setMessageFormInvalide('');
    e.preventDefault();
  
    if (email === '') {
      setMessageFormEmailVide('Veuillez remplir ce champ avec votre email');
      return;
    } else {
      setMessageFormEmailVide('');
      setMessageInscriptionEffectuée('');
    }
  
    if (password === '') {
      setMessageFormPasswordVide('Veuillez remplir ce champ avec votre mot de passe');
      return;
    } else {
      setMessageFormPasswordVide('');
      setMessageInscriptionEffectuée('');
    }
  
    const auth = getAuth(); 
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setMessageFormEmailVide('');
        const user = userCredential.user;
        const userEmail = user.email;

        if (userEmail !== null) {
          console.log(userEmail);
          localStorage.setItem('userEmail', userEmail);
        } else {
          console.log('Aucun email stocké en local.');
        }
        
        setMessageInscriptionEffectuée('Votre compte a bien été connecté !');
        setTimeout(() => {navigate('/profil');}, 1500);      
      })
      .catch((error) => {
        console.error('Erreur d\'authentification : ', error);
        setMessageFormInvalide('Connexion refusée : email ou mot de passe incorrect');
      });
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

          <button type="submit">Connexion</button>
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
