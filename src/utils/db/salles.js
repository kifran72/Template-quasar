import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore();

const addSalle = async (event) => {
  if (event) {
    const salles = await addDoc(collection(db, "salles"), {
      id: event.user.uid,
      email: event.user.email,
      displayName: event.user.displayName,
      name: event.name,
      sport: event.sport,
    });

    const sallesResult = {
      id: salles.id,
      data: {
        email: event.user.email,
        displayName: event.user.displayName,
        name: event.name,
        sport: event.sport,
      },
    };

    return sallesResult;
  }
};
const modifySalle = async (event) => {
  if (event) {
    // Create an initial document to update.
    const salles = doc(db, "salles", event.id);

    // To update age and favorite color:
    await updateDoc(salles, event);
  }
};

const deleteSalle = async (event) => {
  if (event) {
    const salles = await deleteDoc(doc(db, "salles", event.id));

    return salles;
  }
};

const getSalles = async () => {
  const salles = [];
  const querySnapshot = await getDocs(collection(db, "salles"));
  querySnapshot.forEach((doc) => {
    salles.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return salles;
};

export { addSalle, getSalles, modifySalle, deleteSalle };
