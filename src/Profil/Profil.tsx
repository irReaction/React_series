import React, { useState, useEffect } from 'react';
import './Profil.scss';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { firebaseConfig } from '../Fonctions/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getAuth, reauthenticateWithCredential, updateEmail, verifyBeforeUpdateEmail, updatePassword, EmailAuthProvider } from 'firebase/auth';

function Profil() {
  const navigate = useNavigate();
  const userEmail = localStorage.userEmail;
  const [dataName, setDataName] = useState('');
  const [dataEmail, setDataEmail] = useState('');
  const [modifieName, setModifieName] = useState(false);
  const [modifieEmail, setModifieEmail] = useState(false);
  const [modifiePassword, setModifiePassword] = useState(false); // Nouveau state pour la modification du mot de passe
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState(''); // Nouveau state pour le nouveau mot de passe
  const [currentPassword, setCurrentPassword] = useState('');
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  useEffect(() => {
    if (!userEmail) {
      navigate('/connexion');
      return;
    }

    async function fetchData() {
      const q = query(collection(db, 'utilisateur'), where('email', '==', userEmail));
      const resultGetUserData = await getDocs(q);

      if (resultGetUserData.size > 0) {
        const userData = resultGetUserData.docs[0].data();
        setDataName(userData.name);
        setDataEmail(userData.email);
      }
    }

    fetchData();
  }, [userEmail, db, navigate]);

  const logout = () => {
    localStorage.clear();
    navigate('/connexion');
  };

  const modificationName = () => {
    setModifieName(true);
  };

  const enregistrerName = async () => {
    try {
      const requeteGetUser = query(collection(db, 'utilisateur'), where('email', '==', userEmail));
      const resultUser = await getDocs(requeteGetUser);

      if (!resultUser.empty) {
        const user = resultUser.docs[0];
        await updateDoc(user.ref, { name: newName });
      } else {
        console.log("ptit bug");
      }

      setDataName(newName);
      setModifieName(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du nom : ', error);
    }
  };

  const modificationEmail = () => {
    setModifieEmail(true);
  };

  const enregistrerEmail = async () => {
    try {
      const user = auth.currentUser;
      if (user && user.email) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
    
        verifyBeforeUpdateEmail(user, newEmail)
          .then(() => {
            console.log('Email updated!');
          })
          .catch((error) => {
            console.error('Erreur lors de la mise à jour de l\'email : ', error);
          });

        const requeteGetUser = query(collection(db, 'utilisateur'), where('email', '==', userEmail));
        const resultUser = await getDocs(requeteGetUser);

        if (!resultUser.empty) {
          const user = resultUser.docs[0];
          await updateDoc(user.ref, { email: newEmail });
        } else {
          console.log("ptit bug");
        }

        setDataEmail(newEmail);
        setModifieEmail(false);
        navigate('/connexion');
      } else {
        console.error('User is null');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'email : ', error);
    }
  };

  // Nouvelle fonction pour la modification du mot de passe
  const modificationPassword = () => {
    setModifiePassword(true);
  };

  const enregistrerPassword = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
        console.log('Mot de passe mis à jour avec succès');
        setModifiePassword(false);
      } else {
        console.error('User is null');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot de passe : ', error);
    }
  };

  return (
    <div id="page_inscription">
      <h1>Profil</h1>
      <button onClick={logout}>Déconnexion</button>
      <div id="div_inscription">
        <div id="page_profil">
          <div className="profil_champs">
            <p className="champs_profil">Nom : {modifieName ? (
              <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
            ) : (
              dataName
            )}
            </p> 
            {modifieName ? (
              <button onClick={enregistrerName}>Enregistrer</button>
            ) : (
              <button onClick={modificationName}>Modifier</button>
            )}
          </div>
          
          <div className="profil_champs">
            <p className="champs_profil">Email : {modifieEmail ? (
              <div>
                <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
              </div>
            ) : (
              dataEmail
            )}
            </p> 
            {modifieEmail ? (
              <button onClick={enregistrerEmail}>Enregistrer</button>
            ) : (
              <button onClick={modificationEmail}>Modifier</button>
            )}
          </div>

          <div className="profil_champs">
            <p className="champs_profil">Mot de passe : {modifiePassword ? (
              <div>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
            ) : (
              '**********' // Afficher des astérisques pour le mot de passe
            )}
            </p> 
            {modifiePassword ? (
              <button onClick={enregistrerPassword}>Enregistrer</button>
            ) : (
              <button onClick={modificationPassword}>Modifier</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
