const {db} = require("../config/firebase-client");
const {collection,getDocs,getDoc, doc,query,where, queryEqual, addDoc, setDoc, deleteDoc} = require("firebase/firestore")

async function getAllProjectsFromDB(){
    const allProjectRef = collection(db,"projects");
    const snapshot = await getDocs(allProjectRef);
    const projects = [];
    snapshot.forEach(doc => {
        projects.push(doc.data());
    });
    return projects;
}

async function getProjectsOfStudentFromDB(studentemail) {
    try {
        const allProjectRef = collection(db, "projects");
        const q = query(allProjectRef, where("studentemail", "==", studentemail));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return [];
        }

        const docs = [];
        snapshot.forEach(doc => docs.push(doc.data()));

        return docs;
    } catch (error) {
        console.error("Error while getting projects from database:", error);
        throw new Error("Error while getting projects from database");
    }
}

async function addProjectToDB(projectid, projectData) {
    const projectRef = doc(db, "projects", projectid);
    await setDoc(projectRef, projectData);
    return true;
}

async function updateProjectInDB(projectid,updateData){
    const projectRef = doc(db,"projects",projectid);
    const res = await setDoc(projectRef,updateData,{merge : true});
    return res;
}

async function deleteProjectFromDB(projectid){
    const projectRef = doc(db,"projects",projectid);
    const res = await deleteDoc(projectRef);
    return res;
}

module.exports ={addProjectToDB, updateProjectInDB, deleteProjectFromDB, getAllProjectsFromDB, getProjectsOfStudentFromDB};