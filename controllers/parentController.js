const {getAllParentsFromDB,getParentFromDB,addParentToDB,updateParentInDB}= require("../models/parentModel");

const getAllParents = async(req,res)=>{
    res.setHeader('Content-Type',"application/json");
    try{
    const parents = await getAllParentsFromDB();
    if(!parents){
        var reply = { "error" : { "code" : 404,"message" : "No parent resource found" }}
        return res.status(404).json(reply);
    }
    return res.status(200).json({"success" : true, "data" : parents});
    }
    catch(error){
        console.log(error);
        var reply = { "error" : { "code" : 500,"message" : "Internal server error" }}
        return res.status(500).send(reply);
    }
}

const getParent = async (req,res)=>{
    res.setHeader('Content-Type','application/json');
    try{
    const {parentphone} = req.params;
    console.log(parentphone)
    const parent = await getParentFromDB(parentphone);
    if(!parent){
        var reply = { "error" : { "code" : 404,"message" : "Parent resource not found" }}
        return res.status(404).json(reply)
    }
    return res.status(200).json({"success" : true, "data" : parent});
    }
    catch(error){
        console.log(error);
        var reply = { "error" : { "code" : 500,"message" : "Internal server error" }}
        return res.status(500).json(reply);
    }
}
const addParent = async (req,res)=>{
    res.setHeader('Content-Type','application/json');
    try{
    const parent = {};
    for (const key in req.body) {
        parent[String(key)] = req.body[key];
    }
    //console.log(student);
    const re = await addParentToDB(parent);
    //console.log(re);
    res.status(200).json({"success" : true, "data" : parent});
    }
    catch(error){
        console.log(error);
        var reply = { "error" : { "code" : 500,"message" : "Internal server error" }}
        res.status(500).json(reply)
    }

}
const updateParent = async (req,res)=>{
    res.setHeader('Content-Type','application/json');
    try{
    const parent = {};
    for (const key in req.body) {
        parent[String(key)] = req.body[key];
    }
    //console.log(student);
    const re = await updateParentInDB(parent.parentid,parent);
    //console.log(re);
    var reply = { "success" : true,"Message" : "Parent data updated successfully","data" : parent};
    res.status(200).json(reply)
    }
    catch(error){
        console.log(error);
        var reply = {"error" : { "code" : 500,"message" : "Internal server error" }};
        res.status(500).json(reply)
    }

}

const deleteParent = async(req, res) => {
    try {
        const { parentid } = req.body;
        console.log(typeof(projectid));
        const result = await deleteProjectFromDB(parentid);
        const successRes = {
            success: true,
            message: "Parent deleted Successfully!",
        };
        return res.status(200).json(successRes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal Server Error",
            details: error.message
        });
    }
};

module.exports = {getAllParents,getParent,addParent,updateParent,deleteParent};