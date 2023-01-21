import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase.js";

export const fetchTodos = async () => {
  let list = [];
  const querySnapshot = await getDocs(collection(db, "todos"));
  querySnapshot.forEach((doc) => {
    let todo = {
      id: doc.id,
      task: doc.data().task,
      dateCreated: doc.data().date_created.toDate(),
    };
    list.push(todo);
  });
  return list;
};

export const addFinishedTodo = async (task, dateCreated) => {
  const date = new Date();
  try {
    const docRef = await addDoc(collection(db, "finished-tasks"), {
      task: task,
      date_finished: date,
      date_created: dateCreated,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const fetchFinishedTodos = async () => {
  let list = [];
  const querySnapshot = await getDocs(collection(db, "finished-tasks"));
  querySnapshot.forEach((doc) => {
    let todo = {
      id: doc.id,
      task: doc.data().task,
      dateCreated: doc.data().date_created.toDate(),
      dateFinished: doc.data().date_finished.toDate(),
    };
    list.push(todo);
  });
  return list;
};

export const addTodo = async (task) => {
  const date = new Date();
  try {
    const docRef = await addDoc(collection(db, "todos"), {
      task: task,
      date_created: date,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const deleteTodo = async (id) => {
  await deleteDoc(doc(db, "todos", id));
};

export const updateTodo = async (id, update) => {
  let date = new Date();

  await setDoc(doc(db, "todos", id), {
    task: update,
    date_created: date,
  });
};
