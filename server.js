const app = require("./app");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Server listening on PORT : ${PORT}...`);
})