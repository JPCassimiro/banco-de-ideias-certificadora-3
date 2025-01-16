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
      console.log('Email enviado: ' + JSON.stringify(doc));
      controlVariable = true;
    })
    .catch((e => {
      console.log('Erro ao enviar email: ' + JSON.stringify(e));
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
  userSnapshot.forEach((doc)=>{
    userList.push(doc.id);
  });
  for (const email of userList){
    const queryUserIdeas = query(collection(db,email))
    const userIdeaSnapshot = await getDocs(queryUserIdeas);
    userIdeaSnapshot.forEach((doc)=>{
      ideaList.push({
        title: doc.data().Title,
        date: doc.data().Date.toDate().toLocaleString(),
        id: doc.id,
        user: email
      });
    });
  }
  return ideaList;
}

//associar o id da ideia com a flatlist
const deleteUserIdea = async (email, ideaId) => {
  const collectionUser = collection(db, email);
  await deleteDoc(collectionUser, ideaId)
    .then((doc) => {
      //console.log(`Ideia com id ${props.ideaId} de usuario ${props.email} foi removida: ` + JSON.stringify(doc))
    })
    .catch((e) => {
      //console.log(`Ideia com id ${props.ideaId} de usuario ${props.email} NÃO pode ser exluida: ` + JSON.stringify(e))
    })
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

const getDetailedIdea = async (email,ideaId) => {
  const ideaRef = doc(db,email,ideaId);
  const docSnap = await getDoc(ideaRef);
  let ideaInfo;
  if((docSnap !== undefined) || (docSnap !== null)){
    ideaInfo = {
      title: docSnap.data().Title,
      description: docSnap.data().Description
      // agree: docSnap.data().Agree,
      // disagree: docSnap.data().Disagree
    }
  }
  return ideaInfo;
}

const getUserIdeas = async (email) =>{
  let ideaList = [];
  const queryUserIdeas = query(collection(db,email))
  const userIdeaSnapshot = await getDocs(queryUserIdeas);
  userIdeaSnapshot.forEach((doc)=>{
    ideaList.push({
      title: doc.data().Title,
      date: doc.data().Date.toDate().toLocaleString(),
      id: doc.id,
    });
  });
  return ideaList;
}

const addIdeaReaction = async (email,ideaId,value) =>{
  const ideaRef = doc(db,email,ideaId);
  const docSnapIdea = await getDoc(ideaRef);
  let agreeArray = docSnapIdea.data().Agree;
  let disagreeArray = docSnapIdea.data().Disagree;
  
  if(value === true){
    updateDoc(ideaRef,{
      Agree: (docSnapIdea.data().Agree + 1)
    });
  }else{
    updateDoc(ideaRef,{
      Disagree: (docSnapIdea.data().Disagree + 1)
    });
  }
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
  addIdeaReaction
}