// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_CnfDNjMe303DoDQSDpycUKn2p-44yrM",
  authDomain: "mind-link-fca95.firebaseapp.com",
  projectId: "mind-link-fca95",
  storageBucket: "mind-link-fca95.firebasestorage.app",
  messagingSenderId: "248590813201",
  appId: "1:248590813201:web:a90c895658313087c589b0",
  measurementId: "G-1C7KY406XV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Firebase utility functions for CRUD operations
export const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const getDocuments = async (collectionName: string, orderByField?: string) => {
  try {
    let q: any = collection(db, collectionName);
    if (orderByField) {
      q = query(q, orderBy(orderByField, "desc"));
    }
    const querySnapshot = await getDocs(q);
    const documents: any[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...(doc.data() || {}) });
    });
    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};

export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};
