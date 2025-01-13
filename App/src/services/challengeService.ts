import { db, auth } from "../firebaseConfig";
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

export const createChallenge = async (challenge: any) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(db, "challenges"), { ...challenge, userId: user.uid });
    } else {
      throw new Error("Utilisateur non connecté");
    }
  } catch (error) {
    console.error("Error creating challenge:", error);
  }
};

export const subscribeToChallenges = (callback: (challenges: any[]) => void) => {
  const challengesCollection = collection(db, "challenges");
  return onSnapshot(challengesCollection, (snapshot) => {
    const challenges = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(challenges);
  });
};

export const deleteChallenge = async (id: string) => {
  try {
    await deleteDoc(doc(db, "challenges", id));
    console.log("Challenge deleted successfully");
  } catch (error) {
    console.error("Error deleting challenge:", error);
  }
};
