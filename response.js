//RESPONSE FORMAT
//successful
const successRes = 
{ 
    "success" : true,
    "message" : "Message to be returned",
    "data" : "change in data"
};
const errorRes = 
{
    "error" : 
    { 
        "code" : 500,
        "message" : "Internal server error" 
    }
}