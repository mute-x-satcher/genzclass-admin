
import { initializeApp } from "firebase/app";
import { getDatabase,ref,set,onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbNuU2JcYiCulIvD260rL3OcUOTwO0mKE",
  authDomain: "database-1-f0ae9.firebaseapp.com",
  databaseURL: "https://database-1-f0ae9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "database-1-f0ae9",
  storageBucket: "database-1-f0ae9.firebasestorage.app",
  messagingSenderId: "705600620126",
  appId: "1:705600620126:web:dbe11d2947c350e19456cf",
  measurementId: "G-3BKFNV0TF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export interface Student {
  parentName: string;
  studentName: string;
  mobile: string;
  email: string;
  grade: string;
}
export const storeStudentData = async (student: Student): Promise<void> => {
  try {
      await set(ref(database, `students/${student.mobile}`), student); // Store under mobile number
      console.log("Data stored successfully!");
  } catch (error) {
      console.error("Error storing data:", error);
  }
};

export const fetchStudentData = (callback: (data: Student[]) => void) => {
  const db = getDatabase();
  const studentRef = ref(db, "students"); // Adjust the path if needed

  onValue(studentRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const studentsArray = Object.values(data) as Student[];
      callback(studentsArray);
    } else {
      callback([]); // If no data found, return an empty array
    }
  });
};