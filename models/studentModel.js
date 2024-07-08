//const {db} = require("../config/firebase");
const {db} = require("../config/firebase-client");
const {collection,getDocs,getDoc, doc, setDoc} = require("firebase/firestore")
const {getAuth} = require("firebase/auth");


async function getAllStudentsFromDB(){
    //console.log(db);
    const allStudentRef = collection(db,'students'); 
    // for admin this function is used as db.collection('students');
    const snapshot = await getDocs(allStudentRef );
    students = [];
    snapshot.forEach(doc => {
        students.push(doc.data());
    })
    return students;
    //return data.students;
}

async function getStudentFromDB(PRN){
    //const studentRef = db.collection("students").doc(String(PRN));
    const docRef = doc(db,"students",String(PRN));
    const docc = await getDoc(docRef);
    if(!docc.exists){
        return null;
    }
    return docc.data();
    //const student = data.students.find(student => student.PRN === PRN);
    //return student || null;
}
async function addStudentToDB(student){
    //console.log(student);
    //const studentRef = await db.collection("students").doc(student.prn);
    const studentRef =  doc(db,"students",student.prn);
    const res = await setDoc(studentRef,student);
    return res;
}
async function updateStudentInDB(PRN, updatedData) {
    const docRef = doc(db, "students", String(PRN));
    const res = await setDoc(docRef, updatedData, { merge: true });
    return res;
}
async function deleteStudentFromDB(PRN) {
    const docRef = doc(db, "students", String(PRN));
    await deleteDoc(docRef);
}
module.exports = {getAllStudentsFromDB,getStudentFromDB,addStudentToDB,updateStudentInDB,deleteStudentFromDB}