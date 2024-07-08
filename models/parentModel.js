const {db} = require("../config/firebase-client");
const {collection,getDocs,getDoc, doc,query,where, queryEqual, addDoc, setDoc, deleteDoc} = require("firebase/firestore")

async function getAllParentsFromDB(){
    //const allMentorRef = db.collection("mentors");
    const allParentsRef = collection(db,"parents");
    //const snapshot = await allMentorRef.get();
    const snapshot = await getDocs(allParentsRef);
    const parents = [];
    snapshot.forEach(doc => {
        parents.push(doc.data());
    })
    return parents;
    //return data.mentors;
}
async function getParentFromDB(parentphone){
    
    const parentRef = doc(db,"parents",String(parentphone));
    const docc =await getDoc(parentRef);
    if(!docc.exists){
        return null;
    }
    return docc.data();
}
/*
async function getParentFromDB(parentphone){
    const parentRef = collection(db,"parents");
    const q = query(parentRef,where("phoneno","==",parentphone));
    const snapshot = await getDocs(q);
    console.log(snapshot)
    if(snapshot.empty){
        return null;
    }
    docss = []
    snapshot.forEach(dcc => docss.push(dcc.data()))
    return docss[0];
}*/
async function addParentToDB(parent){
    //console.log(student);
    //const studentRef = await db.collection("students").doc(student.prn);
    const parentRef =  doc(db,"parents",parent.parentid);
    const res = await setDoc(parentRef,parent);
    return res;
}

async function updateParentInDB(parentphone, updatedData) {
    const docRef = doc(db, "parents", String(parentphone));
    const res = await setDoc(docRef, updatedData, { merge: true });
    return res;
}
async function deleteParentFromDB(parentphone) {
    const docRef = doc(db, "parents", String(parentphone));
    await deleteDoc(docRef);
}

module.exports = {getAllParentsFromDB,getParentFromDB,addParentToDB,updateParentInDB};