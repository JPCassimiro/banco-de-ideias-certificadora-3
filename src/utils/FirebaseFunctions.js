import { auth } from '../config/Fb';
import { db } from '../config/Fb';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';

const collectionUserList = collection(db,"userColletionList");

const LoginFunction = (props) => {
  signInWithEmailAndPassword(auth,props.email,props.password)
  .then(doc =>{
    console.log('Sucesso no login: ' + JSON.stringify(doc.user));
  })
  .catch((e =>{
    console.log('Erro no Login: ' + JSON.stringify(e.code));
  }))
}

const SingUpFunction = (props) =>{
  createUserWithEmailAndPassword(auth,props.email,props.password,props.name,props.type)
    .then(doc =>{
      console.log('Usuario criado com sucesso: ' + JSON.stringify(doc.user));
    })
    .catch(e =>{
      console.log('Erro na criação de usuario: ' + JSON.stringify(e.code));
    })
}

//recebe email do usuario logado atualmente e um objeto com os dados da ideia
const addDataOnUserCollection = (props) =>{
  const collectionUser = collection(db,props.email);
  addDoc(collectionUser, props.data)
    .then((doc) =>{
      console.log("Entrada de dados na coleção do usuario no FB: " + JSON.stringify(doc));
    })
    .catch((err)=>{
      console.log("Erro ao tentar entrar com dados no FB: " + JSON.stringify(err));
    })
}

//
const addDataOnListColletion = (props) =>{
  addDoc(collectionUserList)
    .then((doc)=>{
      console.log("Entrada de usuario na lista de usuarios no FB: " + JSON.stringify(doc));
    })
    .catch((e)=>{
      console.log("Erro na entrada de dado na lista de usuarios no FB: "+ JSON.stringify(e));
    })
}

const getAllIdeiasList = (props) =>{
  const queryUserList = query(collectionUserList);
  let userList = [];
  const unsubscribe = onSnapshot(queryUserList,(snap)=>{
    snap.forEach((doc)=>{
      userList.push({
        id: doc.id
      })
    })
  });
  userList.forEach((user)=>{
    
  });
}

export{
    LoginFunction,
    SingUpFunction
}