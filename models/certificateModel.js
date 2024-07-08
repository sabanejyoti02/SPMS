const {db} = require("../config/firebase-client");
const {collection,getDocs,getDoc, doc,query,where, queryEqual, addDoc, setDoc, deleteDoc} = require("firebase/firestore")

async function getAllCertificatesFromDB(){
    //const allMentorRef = db.collection("mentors");
    const allCertificateRef = collection(db,"certificates");
    //const snapshot = await allMentorRef.get();
    const snapshot = await getDocs(allCertificateRef);
    const certificates = [];
    snapshot.forEach(doc => {
        certificates.push(doc.data());
    });
    return certificates;
    //return data.mentors;
}

async function getCertificatesOfStudentFromDB(studentemail) {
    try {
        const allcertificateRef = collection(db, "certificates");
        const q = query(allcertificateRef, where("studentemail", "==", studentemail));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return [];
        }

        const docs = [];
        snapshot.forEach(doc => docs.push(doc.data()));

        return docs;
    } catch (error) {
        console.error("Error while getting certificates from database:", error);
        throw new Error("Error while getting certificates from database");
    }
}


async function addCertificateToDB(certificateid, certificateData) {
    const certificateRef = doc(db, "certificates", certificateid);
    const res = await setDoc(certificateRef, certificateData);
    return res;
}

async function updateCertificateInDB(certificateid, certificateData) {
    const certificateRef = doc(db, "certificates", certificateid);
    const res = await setDoc(certificateRef, certificateData, {merge : true});
    return res;
}

async function deleteCertificateFromDB(certificateid){
    const certificateRef = doc(db,"certificates",certificateid);
    const res = await deleteDoc(certificateRef);
    console.log(typeof(certificateid));
    // console.log(certificateRef);
    console.log(res);
    return res;
}

/*async function approveCertificate(certificateid, mentoremail, status) {
    try {
        // Step 1: Fetch the certificate document using the certificateid
        const allcertificateRef = collection(db, "certificates");
        const q = query(allcertificateRef, where("certificateid", "==", certificateid));
        const certificateSnapshot = await getDocs(q);

        if (certificateSnapshot.empty) {
            return {
                success: false,
                message: "No certificate found with the provided ID."
            };
        }

        let certificateDoc;
        certificateSnapshot.forEach(doc => {
            certificateDoc = doc;
        });
        const studentemail = certificateDoc.data().studentemail;

        // Step 2: Fetch the student document using the studentemail
        const studentRef = collection(db, "students");
        const studentQuery = query(studentRef, where("email", "==", studentemail));
        const studentSnapshot = await getDocs(studentQuery);

        if (studentSnapshot.empty) {
            return {
                success: false,
                message: "No student found with the provided email."
            };
        }

        let studentDoc;
        studentSnapshot.forEach(doc => {
            studentDoc = doc;
        });
        const studentMentorEmail = studentDoc.data().mentormail;

        // Step 3: Verify if the mentoremail matches the mentor email in the student document
        if (mentoremail !== studentMentorEmail) {
            return {
                success: false,
                message: "Mentor email does not match the student's mentor email."
            };
        }

        // Step 4: Update the certificate document with the approvestatus
        const certificateRef = doc(db, "certificates", certificateDoc.id);
        await updateDoc(certificateRef, { approvedstatus: status });

        return {
            success: true,
            message: "Certificate approved successfully!"
        };
    } catch (error) {
        console.error("Error approving certificate:", error);
        return {
            success: false,
            message: "Internal Server Error"
        };
    }
}*/

module.exports ={addCertificateToDB, updateCertificateInDB, deleteCertificateFromDB, getAllCertificatesFromDB, getCertificatesOfStudentFromDB};

