import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdB3JnUyr3m8v-Gr8Xbakajh2lmYN6ukk",
  authDomain: "poop-fc7c4.firebaseapp.com",
  projectId: "poop-fc7c4",
  storageBucket: "poop-fc7c4.firebasestorage.app",
  messagingSenderId: "162439952479",
  appId: "1:162439952479:web:732c4720cedd08bd8b83ea",
  measurementId: "G-GEP8HLGTB9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const savePoopPost = async (post: any) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), post);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
};

export const subscribeToPosts = (callback: (posts: any[]) => void) => {
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"), limit(50));
  return onSnapshot(q, (querySnapshot) => {
    const posts: any[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    callback(posts);
  });
};