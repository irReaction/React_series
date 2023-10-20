import React, { useState } from "react";
import "./Inscription.scss";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { firebaseConfig } from "../firebase/firebaseConfig";
import firebase from "firebase/compat/app";

function Inscription() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageInscriptionEffectuée, setMessageInscriptionEffectuée] =
    useState("");
  const [messageFormNameVide, setMessageFormNameVide] = useState("");
  const [messageFormEmailVide, setMessageFormEmailVide] = useState("");
  const [messageFormPasswordVide, setMessageFormPasswordVide] = useState("");
  const [messageEmailDejaUtilisé, setMessageEmailDejaUtilisé] = useState("");

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const navigate = useNavigate();

  const gestionFormValidation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessageInscriptionEffectuée("");
    setMessageFormNameVide("");
    setMessageFormEmailVide("");
    setMessageFormPasswordVide("");
    setMessageEmailDejaUtilisé("");

    if (name === "") {
      setMessageFormNameVide("Veuillez remplir ce champ avec votre pseudo");
      return;
    }

    if (email === "") {
      setMessageFormEmailVide("Veuillez remplir ce champ avec votre email");
      return;
    }

    if (password === "") {
      setMessageFormPasswordVide(
        "Veuillez remplir ce champ avec votre mot de passe"
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
  
      await sendEmailVerification(user);
  
      const docRef = await addDoc(collection(db, 'utilisateur'), {

        
        name: name,
        email: user.email,
      });

      setName("");
      setEmail("");
      setPassword("");

      setMessageInscriptionEffectuée(
        "Votre compte a bien été créé. Veuillez vérifier votre email avant de vous connecter."
      );
      setTimeout(() => {
        navigate("/connexion");
      }, 1500);
    } catch (error) {
      if (
        (error as firebase.auth.AuthError).code === "auth/email-already-in-use"
      ) {
        setMessageEmailDejaUtilisé(
          "Cet email est déjà utilisé. Vous voulez vous connecter ? " +
          <Link to="/connexion">Cliquez ici</Link>
        );
      } else {
        console.error("Erreur lors de l'ajout de l'utilisateur : ", error);
      }
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
          {messageFormNameVide && (
            <p className="msgErrorFormVide">{messageFormNameVide}</p>
          )}

          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {messageFormEmailVide && (
            <p className="msgErrorFormVide">{messageFormEmailVide}</p>
          )}
          {messageEmailDejaUtilisé && (
            <p className="msgErrorFormVide">{messageEmailDejaUtilisé}</p>
          )}

          <input
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {messageFormPasswordVide && (
            <p className="msgErrorFormVide">{messageFormPasswordVide}</p>
          )}

          <button type="submit">Créer</button>
        </form>
        <br></br>
        <p>
          Déjà un compte ?{" "}
          <Link className="boutonLiens" to="/connexion">
            Connectez-vous ici
          </Link>
        </p>
        <br></br>
        {messageInscriptionEffectuée && (
          <p className="msgInscriptionValide">{messageInscriptionEffectuée}</p>
        )}
      </div>
    </div>
  );
}

export default Inscription;
