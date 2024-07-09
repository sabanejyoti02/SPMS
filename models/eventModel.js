const {db} = require("../config/firebase-client");
const {collection,getDocs,getDoc, doc,query,where, queryEqual, addDoc, setDoc, deleteDoc} = require("firebase/firestore")

async function getAllEventsFromDB(){
    const allEventRef = collection(db,"events");
    const snapshot = await getDocs(allEventRef);
    const event = [];
    snapshot.forEach(doc => {
        event.push(doc.data());
    });
    return event;
}

async function getEventOfStudentFromDB(studentemail) {
    try {
        const allEventRef = collection(db, "events");
        const q = query(allEventRef, where("studentemail", "==", studentemail));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return [];
        }

        const docs = [];
        snapshot.forEach(doc => docs.push(doc.data()));

        return docs;
    } catch (error) {
        console.error("Error while getting events from database:", error);
        throw new Error("Error while getting events from database");
    }
}

async function addEventToDB(eventid, eventData) {
    const eventRef = doc(db, "events", eventid);
    await setDoc(eventRef, eventData);
    return true;
}

async function updateEventInDB(eventid,eventData){
    const eventRef = doc(db,"events",eventid);
    const res = await setDoc(eventRef,eventData,{merge : true});
    return res;
}

async function deleteEventFromDB(eventid){
    const eventRef = doc(db,"events",eventid);
    const res = await deleteDoc(eventRef);
    return res;
}

module.exports ={addEventToDB, updateEventInDB, deleteEventFromDB, getAllEventsFromDB, getEventOfStudentFromDB};