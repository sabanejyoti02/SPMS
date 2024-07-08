const {admin} = require("../config/firebase");
const {app} = require("../config/firebase-client")
const { getAuth, signInWithEmailAndPassword ,createUserWithEmailAndPassword,updateProfile} =require("firebase/auth");
const {addStudentToDB} = require("../models/studentModel");
const {addMentorToDB} = require("../models/mentorModel");
const {addParentToDB} = require("../models/parentModel");

/* async (req,res) =>
{
    const {email,password,role} = req.body;
    try
    {
        if(!req.body.email){
            return res.status(404).json({"Error 401" : "Please povide email"})
        }
        const userRecord = await admin.auth().createUser
        (
            {
            email : req.body.email,
            password : req.body.password,
            role : req.body.role,
            emailVerified : false,
            disabled : false
            }
        );
        //userRecord.setCu
        res.status(200).json(userRecord);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({"Error 500" : "Internal Server Error"})
    }

}
*/

const signupUser = async (req, res) => {
    //const { email, password, role, studentPRN } = req.body;
    const {role} = req.body;
    try {
        if(role === "student"){
            const {email,password,prn} = req.body;
            if (!email || !prn) {
                const errorRes = 
                {
                    "error" : 
                    { 
                        "code" : 401,
                        "message" : "Required fields not provided !" 
                    }
                }
                return res.status(401).json(errorRes);
            }
    
            // Create the user
            const auth = getAuth(app);

            //creation of user in firbase authentication feature
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            /*
            const userRecord = await admin.auth().createUser({
                email: email,
                password: password,
                emailVerified: false,
                disabled: false,
            });
            */
    
            // Add custom claims
            
            //updation of user in firbase authentication feature
            await updateProfile(userCredential.user, {
                role: role,
                prn: prn || null
            });
            
            /*
            await admin.auth().setCustomUserClaims(userRecord.uid, {
                role: role,
                prn : prn || null, // If studentPRN is not provided, set it to null
            });*/


            //Actual entry to database
            const newstudent = {
                email : email,
                prn : prn,
                role : role
            }
            await addStudentToDB(newstudent);
            // Return the user record
            //res.status(200).send(`User created successfully!<br> Email : ${email}<br>PRN : ${studentPRN}<br>Role : ${role}`);
            const successRes = 
            { 
                "success" : true,
                "message" : "Student profile created !",
                "data" : newstudent
            };
            res.status(201).json(successRes); 
        }   
        if(role === "mentor"){
            const {email,mentorid,password} = req.body;
            if(!email || !mentorid){
                const errorRes = 
                {
                    "error" : 
                    { 
                        "code" : 401,
                        "message" : "Required fields not provided !" 
                    }
                }
                return res.status(401).json(errorRes);
            }

            const auth = getAuth(app);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            /*
            const userRecord = await admin.auth().createUser({
                email: email,
                password: password,
                emailVerified: false,
                disabled: false,
            });
            
            */
            await updateProfile(userCredential.user, {
                role: role,
                mentorid: mentorid || null
            });
            
            /*
            await admin.auth().setCustomUserClaims(userRecord.uid, {
                role: role,
                mentorid : mentorid || null, // If studentPRN is not provided, set it to null
            });
            */

            const newmentor = {
                email : email,
                mentorid : mentorid,
                role : role
            }
            await addMentorToDB(newmentor);
            // Return the user record
            //res.status(200).send(`User created successfully!<br> Email : ${email}<br>PRN : ${studentPRN}<br>Role : ${role}`);
            const successRes = 
            { 
                "success" : true,
                "message" : "Mentor profile created !",
                "data" : newmentor
            };
            res.status(201).json( successRes ); 
        }
        if(role === "parent"){
            const {parentphone,password} = req.body;
            if(!parentphone){
                return res.status(404).json({ "Error 401": "Please provide required credentials" });
            }

            const auth = getAuth(app);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            /*
            const userRecord = await admin.auth().createUser({
                email: email,
                password: password,
                emailVerified: false,
                disabled: false,
            });
            
            */
            await updateProfile(userCredential.user, {
                role: role,
                parentphone: parentphone || null
            });
            
            /*
            await admin.auth().setCustomUserClaims(userRecord.uid, {
                role: role,
                mentorid : mentorid || null, // If studentPRN is not provided, set it to null
            });
            */

            const newparent = {
                email : email,
                parentphone : parentphone
            }
            await addParentToDB(newparent);
            // Return the user record
            //res.status(200).send(`User created successfully!<br> Email : ${email}<br>PRN : ${studentPRN}<br>Role : ${role}`);
            res.status(200).json( { 
                "success 200" : "User created" , 
                "Userdata" : 
                { 
                    "email" : email , 
                    "parentphone" : parentphone, 
                    "role" : role 
                } 
            } ); 
        }
        
        
    } catch (error) {
        console.error(error);
        if (error.code === "auth/email-already-in-use")  {
            const errorRes2 = 
            {
                "error" : 
                { 
                    "code" : 401,
                    "message" : "Email already exists !" 
                }
            }
            return res.status(401).json(errorRes2);
        }

        const errorRes = 
        {
            "error" : 
            { 
                "code" : 500,
                "message" : "Internal server error" 
            }
        }
        res.status(500).json(errorRes);
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Sign in the user with email and password
        //const userCredential = await admin.auth().signInWithEmailAndPassword(email, password);
        const auth = getAuth(app);
        const userCredential = await signInWithEmailAndPassword(auth,email,password);
        //const userCredential = await admin.auth().signInWithEmailAndPassword(email, password)
        //const userCredential = await admin.auth().signInWithEmailAndPassword(email, password);
        // Retrieve the ID token from the user credential
        const idToken = await userCredential.user.getIdToken();

        // Return the authentication token to the client
        res.status(200).json({
            success: true,
            message: "Login successful",
            token: idToken
        });
    } catch (error) {
        //console.error("Login error:", error);
        if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential")  {
            const errorRes = 
            {
                "error" : 
                { 
                    "code" : 401,
                    "message" : "Invalid email or password" 
                }
            }
            return res.status(401).json(errorRes);
        }
        const errorRes = 
        {
            "error" : 
            { 
                "code" : 500,
                "message" : "Internal server error" 
            }
        }
        res.status(500).json(errorRes);
    }
};
const logoutUser = async (req, res) => {
    try {
        // Client should delete token from local storage, only sending a response

        res.status(200).json({
            success: true,
            message: "Logout successful. Please clear your session token on the client side."
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {signupUser,loginUser,logoutUser};

