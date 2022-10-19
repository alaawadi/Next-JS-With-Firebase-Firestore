import { withProtectedd } from "../firebase/hook/route";
// import { withProtecteddd } from "../components/header";


import Head from 'next/head'
// import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { database } from '../firebase/config/config';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useAuth } from "../firebase/hook/AuthContext";
import  Header  from '../components/header';
function Home() {
  const auth = useAuth();

  const [ID, setID] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState(null);
  const [fireData, setFireData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const databaseRef = collection(database, 'crud');
  let router = useRouter()

  // const {query:{search}}=router
  // const props = {search}

  useEffect(() => {
    if (auth.user?.uid) {
      getData()
    }
    if (!auth.user?.uid) {
      router.push('/login')
    }
    // console.log(search)
    
  }, [])



  const addData = () => {
    addDoc(databaseRef, {
      name: name,
      age: Number(age)
    })
      .then(() => {
        alert('Data Sent')
        getData()
        setName(name)
        setAge(age)
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const getData = async () => {
    await getDocs(databaseRef)
      .then((response) => {
        setFireData(response.docs.map((data) => {
          return { ...data.data(), id: data.id }
        }))
      })
  }

  const getID = (id, name, age) => {
    setID(id)
    setName(name)
    setAge(age)
    setIsUpdate(true)
  }

  const updateFields = () => {
    let fieldToEdit = doc(database, 'crud',ID );
    updateDoc(fieldToEdit, {
      name: name,
      age: Number(age)
    })
    .then(() => {
      alert('Data Updated')
      getData()
      setName('')
      setAge(null)
      setIsUpdate(false)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const deleteDocument = (id) => {
    let fieldToEdit = doc(database, 'crud', id);
    deleteDoc(fieldToEdit)
    .then(() => {
      alert('Data Deleted')
      getData()
    })
    .catch((err) => {
      alert('Cannot Delete that field..')
    })
  }

  var counter = 0;
  return (
    <>
    
    <Header />
    <div className={styles.container}>

      <main className={styles.main}>
    {/* <div>{props.search}</div>     */}

    {/* <div>{props.ali}</div>     */}
        <input
          placeholder='Name'
          className={styles.inputBox}
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
          style={{border:' 1px solid',borderRadius:'5px'}}
        />
        <input
          placeholder='Age'
          className={styles.inputBox}
          type="number"
          value={age}
          onChange={event => setAge(event.target.value)}
          style={{border:' 1px solid',borderRadius:'5px'}}
        />

        {isUpdate ? (
          <button
          className='btn-primary'
          style={{width:'5rem',borderRadius:'10px'}}
            onClick={updateFields}
          >
            UPDATE
          </button>
        ) : (
          <button
            className='btn-primary'
            style={{width:'5rem',borderRadius:'10px'}}
            onClick={addData}
          >
            ADD
          </button>
        )}

       





        <table class="table">
  {/* <caption>List of </caption> */}
  <thead>
  {}
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    
  {fireData.map((data) => {
    {counter +=1}
    return (
    <tr>
      <th scope="row">{counter}</th>
      <td>{data.name}</td>
      <td>{data.age}</td>
      <td><i className="bi bi-trash3" style={{color:'red'}} onClick={() => deleteDocument(data.id)}></i> <i class="bi bi-pencil-square" style={{color:'green'}} onClick={() => getID(data.id, data.name, data.age)}></i> </td>
    
    </tr>
    
    )
          })}

  </tbody>
</table>




      </main>
    </div>
    </>
  )
}


export default withProtectedd(Home);