import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKbxes9OZdiviX0dblbml1eSOzDK-oNwg",
  authDomain: "daysapp-2c7f5.firebaseapp.com",
  projectId: "daysapp-2c7f5",
  storageBucket: "daysapp-2c7f5.firebasestorage.app",
  messagingSenderId: "837824673636",
  appId: "1:837824673636:web:b20be7e5cdffeddd7eac71",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
