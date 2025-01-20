import { auth } from '../config/Fb';
import { db } from '../config/Fb';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { addDoc, collection, query, setDoc, doc, deleteDoc, getDocs, getDoc, updateDoc } from 'firebase/firestore';

//coleção que armazena a lista de usuarios
const collectionUserList = collection(db, "userCollectionList");

//função de login de usuario
const LoginFunction = async (props) => {
  let controlVariable;
  await signInWithEmailAndPassword(auth, props.email, props.password)
    .then(doc => {
      //console.log('Sucesso no login: ' + JSON.stringify(doc.user));
      controlVariable = true;
    })
    .catch((e => {
      //console.log('Erro no Login: ' + JSON.stringify(e.code));
      controlVariable = false;
    }))
  return controlVariable;
}

//função que envia email de recuperação de senha para o usuario
const RecoverFunction = async (props) => {
  let controlVariable;
  await sendPasswordResetEmail(auth, props.email)
    .then(doc => {
      // console.log('Email enviado: ' + JSON.stringify(doc));
      controlVariable = true;
    })
    .catch((e => {
      // console.log('Erro ao enviar email: ' + JSON.stringify(e));
      controlVariable = false;
    }))
  return controlVariable;
}

//função de criação de usuario no firebase
const SingUpFunction = async (props) => {
  let controlVariable;
  await createUserWithEmailAndPassword(auth, props.email, props.password, props.name, props.type)
    .then(doc => {
      //console.log('Usuario criado com sucesso: ' + JSON.stringify(doc.user));
      addDataToListCollection(props.email, props.name, props.type);
      controlVariable = true;
    })
    .catch(e => {
      //console.log('Erro na criação de usuario: ' + JSON.stringify(e.code));
      controlVariable = false;
    })
  return controlVariable;
}

//recebe email do usuario logado atualmente e um objeto com os dados da ideia
const addDataToUserCollection = async (email, data) => {
  const collectionUser = collection(db, email);
  await addDoc(collectionUser, data)
    .then((doc) => {
      //console.log("Entrada de dados na coleção do usuario no FB bem sucedida: " + JSON.stringify(doc));
    })
    .catch((err) => {
      //console.log("Erro ao tentar entrar com dados no FB: " + JSON.stringify(err));
    })
}

/*
Mandar dados no formato
{
  Title:"placeholder",
  Description:"placeholder"
  ...
}
*/

//adiciona usuario a coleção de usuarios
const addDataToListCollection = async (email, name, type) => {
  await setDoc(doc(collectionUserList, email), {
    Type: type,
    Name: name
  })
    .then((doc) => {
      //console.log("Entrada de usuario na lista de usuarios no FB");
    })
    .catch((e) => {
      //console.log("Erro na entrada de dado na lista de usuarios no FB: " + JSON.stringify(e));
    });

}

//retorna lista de todas as ideas
const getAllIdeiasList = async () => {
  const queryUserList = query(collectionUserList);
  let userList = [];
  let ideaList = [];
  const userSnapshot = await getDocs(queryUserList);
  userSnapshot.forEach((doc) => {
    userList.push({ email: doc.id, name: doc.data().Name });
  });
  for (const user of userList) {
    const queryUserIdeas = query(collection(db, user.email))
    const userIdeaSnapshot = await getDocs(queryUserIdeas);
    userIdeaSnapshot.forEach((doc) => {
      ideaList.push({
        title: doc.data().Title,
        date: doc.data().Date.toDate(),
        id: doc.id,
        agree: doc.data().Agree,
        disagree: doc.data().Disagree,
        user: user.email,
        name: user.name
      });
    });
  }
  return ideaList;
}

//associar o id da ideia com a flatlist
const deleteUserIdea = async (email, ideaId) => {
  let controlVariable;
  await deleteDoc(doc(db, email, ideaId))
    .then((doc) => {
      controlVariable = true;
      //console.log(`Ideia com id ${props.ideaId} de usuario ${props.email} foi removida: ` + JSON.stringify(doc))
    })
    .catch((e) => {
      controlVariable = false;
      //console.log(`Ideia com id ${props.ideaId} de usuario ${props.email} NÃO pode ser exluida: ` + JSON.stringify(e))
    })
  return controlVariable;
}

const logOut = async () => {
  let controlVariable;
  await signOut(auth)
    .then((doc) => {
      // console.log("logOut sucesso");
      controlVariable = true;
    })
    .catch((e) => {
      controlVariable = false;
    })
  return controlVariable;
}

const getDetailedIdea = async (email, ideaId) => {
  const ideaRef = doc(db, email, ideaId);
  const docSnap = await getDoc(ideaRef);
  let ideaInfo;
  if ((docSnap !== undefined) || (docSnap !== null)) {
    ideaInfo = {
      title: docSnap.data().Title,
      description: docSnap.data().Description,
      agree: docSnap.data().Agree,
      disagree: docSnap.data().Disagree
    }
  }
  return ideaInfo;
}

const getUserIdeas = async (email) => {
  let ideaList = [];
  const queryUserIdeas = query(collection(db, email))
  const userIdeaSnapshot = await getDocs(queryUserIdeas);
  userIdeaSnapshot.forEach((doc) => {
    ideaList.push({
      title: doc.data().Title,
      date: doc.data().Date.toDate(),
      agree: doc.data().Agree,
      disagree: doc.data().Disagree,
      id: doc.id,
      user: email 
    });
  });
  return ideaList;
}

const addIdeaReaction = async (email, ideaId, value) => {
  const ideaRef = doc(db, email, ideaId);
  const docSnapIdea = await getDoc(ideaRef);
  let agreeArray = docSnapIdea.data().Agree;
  let disagreeArray = docSnapIdea.data().Disagree;

  //caso o usuario já tenha reagido anteriormente
  if (agreeArray.includes(email) && (value === false)) {
    agreeArray.splice(agreeArray.indexOf(email), 1);
    disagreeArray.push(email);
  } else if (disagreeArray.includes(email) && (value === true)) {
    disagreeArray.splice(disagreeArray.indexOf(email), 1);
    agreeArray.push(email);

    //caso não tenha reagido
  } else if (!disagreeArray.includes(email) && !agreeArray.includes(email)) {
    if (value === true) {
      agreeArray.push(email);
    } else {
      disagreeArray.push(email);
    }
  }
  await updateDoc(ideaRef, {
    Agree: agreeArray,
    Disagree: disagreeArray
  })
}

const updateIdea = async (email, ideaId, data) =>{
  await updateDoc(doc(db, email, ideaId), data)
  .then(()=>{
    return true;
  })
  .catch(()=>{
    return false
  })
}

export {
  LoginFunction,
  SingUpFunction,
  addDataToListCollection,
  addDataToUserCollection,
  deleteUserIdea,
  getAllIdeiasList,
  RecoverFunction,
  logOut,
  getDetailedIdea,
  getUserIdeas,
  addIdeaReaction,
  updateIdea
}