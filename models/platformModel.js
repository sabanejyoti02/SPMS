const {db} = require("../config/firebase-client");
const {collection,getDocs,getDoc, doc,query,where, queryEqual, addDoc, setDoc, deleteDoc} = require("firebase/firestore")

async function getAllPlatformsFromDB(){
    const allPlatformRef = collection(db,"platforms");
    const snapshot = await getDocs(allPlatformRef);
    const platforms = [];
    snapshot.forEach(doc => {
        platforms.push(doc.data());
    });
    return platforms;
}

async function addPlatformToDB(platformid, platformData) {
    const platformRef = doc(db, "platforms", platformid);
    await setDoc(platformRef, platformData);
    return true;
}

async function updatePlatformInDB(platformid,updateData){
    const platformRef = doc(db,"platforms",platformid);
    const res = await setDoc(platformRef,updateData,{merge : true});
    return res;
}

async function deletePlatformFromDB(platformid){
    const platformRef = doc(db,"platforms",platformid);
    const res = await deleteDoc(platformRef);
    return res;
}

module.exports ={addPlatformToDB, updatePlatformInDB, deletePlatformFromDB, getAllPlatformsFromDB};