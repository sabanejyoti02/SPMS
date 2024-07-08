const {db} = require("../config/firebase-client");
const {collection,getDocs,getDoc, doc,query,where, queryEqual, addDoc, setDoc, deleteDoc} = require("firebase/firestore")
const {getAuth} = require("firebase/auth");
//const {getStudentFromDB} = require("./studentModel.js");

async function getAllMentorsFromDB(){
    //const allMentorRef = db.collection("mentors");
    const allMentorRef = collection(db,"mentors");
    //const snapshot = await allMentorRef.get();
    const snapshot = await getDocs(allMentorRef);
    const mentors = [];
    snapshot.forEach(doc => {
        mentors.push(doc.data());
    })
    return mentors;
    //return data.mentors;
}
async function getMentorFromDB(MentorID){
    
    const mentorRef = doc(db,"mentors",String(MentorID));
    const docc =await getDoc(mentorRef);
    if(!docc.exists){
        return null;
    }
    return docc.data();
}

/*
MORE EFFICIENT FUNCTION written BELOW
async function getMentorMenteesFromDB(MentorID){
    const mentor = await getMentorFromDB(MentorID);
    const {mentees} = mentor;
    const mentorMentees = [];
    for(const PRN of mentees){
        const student = await getStudentFromDB(PRN);
        mentorMentees.push(student);
    }
    return mentorMentees.length > 0 ? mentorMentees : null;
}
*/

async function getMentorMenteesFromDB(MentorID){
    const mentor = await getMentorFromDB(MentorID);
    const {mentees} = mentor;
    const q = query(collection(db,"students") , where("prn","in",mentees));
    const snapshot = await getDocs(q);
    const mentorMentees = [];
    //console.log(snapshot)
    snapshot.forEach(doc =>{
        mentorMentees.push(doc.data());
    })
    return mentorMentees.length > 0 ? mentorMentees : null;
}

async function allDocumentsExist(collectionName, docIds) 
{
    if(!Array.isArray(docIds)){
        //const doc = await db.collection(collectionName).doc(docIds).get();
        const docRef = doc(db,"mentors",docIDs);
        const docc = getDoc(docRef);
        return docc.exists;
    }    
    const checks = docIds.map(docId => getDoc( doc(db,collectionName,docId) ) );
    const results = await Promise.all(checks);
    return results.every(docc => docc.exists);
}
async function addMentorToDB(mentor){
    // Ensure mentees is an array
    /*
    if (mentor.mentees != null && mentor.mentees !== "") {
        mentor.mentees = Array.isArray(mentor.mentees) ? mentor.mentees : [mentor.mentees];
        // Check if mentees exist
        if (mentor.mentees.length > 0) {
            const menteesExist = await allDocumentsExist("students", mentor.mentees);
            if (!menteesExist) {
                return null;
            }
        }
    } else {
        mentor.mentees = []; // Initialize to an empty array if it's null or empty string
    }
    */
    // Add mentor to the database
    const mentorRef = doc(db,"mentors",mentor.mentorid);
    await setDoc(mentorRef, mentor);
    return true;
}
async function updateMentorInDB(mentorid,updateData){
    const mentorRef = doc(db,"mentors",mentorid);
    const res = await setDoc(mentorRef,updateData,{merge : true});
    return res;
}
async function deleteMentorFromDB(mentorid){
    const mentorRef = doc(db,"mentor",mentorid);
    const res = await deleteDoc(mentorRef);
    return res;
}
module.exports ={getAllMentorsFromDB,getMentorFromDB,getMentorMenteesFromDB,addMentorToDB,updateMentorInDB};