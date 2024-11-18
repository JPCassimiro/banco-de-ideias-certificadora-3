import { auth } from '../config/Fb';
import { db } from '../config/Fb';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, onSnapshot, query, setDoc, doc, deleteDoc } from 'firebase/firestore';

const collectionUserList = collection(db,"userCollectionList");

const LoginFunction = async (props) =>{
  let controlVariable;
  await signInWithEmailAndPassword(auth,props.email,props.password)
  .then(doc =>{
    console.log('Sucesso no login: ' + JSON.stringify(doc.user));
    controlVariable = true;
  })
  .catch((e =>{
    console.log('Erro no Login: ' + JSON.stringify(e.code));
    controlVariable = false;
  }))
  return controlVariable;
}

const SingUpFunction = async (props) =>{
  let controlVariable;
  await createUserWithEmailAndPassword(auth,props.email,props.password,props.name,props.type)
    .then(doc =>{
      console.log('Usuario criado com sucesso: ' + JSON.stringify(doc.user));
      addDataToListCollection(props.email,props.name,props.type);
      controlVariable = true;
    })
    .catch(e =>{
      console.log('Erro na criação de usuario: ' + JSON.stringify(e.code));
      controlVariable = false;
    })
    return controlVariable;
}

//recebe email do usuario logado atualmente e um objeto com os dados da ideia
const addDataToUserCollection = async (props) =>{
  const collectionUser = collection(db,props.email);
  await addDoc(collectionUser, props.data)
    .then((doc) =>{
      console.log("Entrada de dados na coleção do usuario no FB bem sucedida: " + JSON.stringify(doc));
    })
    .catch((err)=>{
      console.log("Erro ao tentar entrar com dados no FB: " + JSON.stringify(err));
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

const addDataToListCollection = async (email,name,type) =>{
  await setDoc(doc(collectionUserList,email),{
    Type: type,
    Name: name
  })
    .then((doc)=>{
      console.log("Entrada de usuario na lista de usuarios no FB");
    })
    .catch((e)=>{
      console.log("Erro na entrada de dado na lista de usuarios no FB: " + JSON.stringify(e));
    });

}

const getAllIdeiasList = async (props) =>{
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

//associar o id da ideia com a flatlist
const deleteUserIdea = async (props) =>{
  const collectionUser = collection(db, props.email);
  await deleteDoc(collectionUser,props.ideaId)
  .then((doc)=>{
    console.log(`Ideia com id ${props.ideaId} de usuario ${props.email} foi removida: ` + JSON.stringify(doc))
  })
  .catch((e)=>{
    console.log(`Ideia com id ${props.ideaId} de usuario ${props.email} NÃO pode ser exluida: ` + JSON.stringify(e))
  })
}

export{
    LoginFunction,
    SingUpFunction,
    addDataToListCollection,
    addDataToUserCollection,
    deleteUserIdea,
    getAllIdeiasList
}