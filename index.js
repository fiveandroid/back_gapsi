//require('dotenv').config()
const server = require('./src/server');

 


    //Levanta el servidor
    server.listen(8080,()=>{

        console.log("** Servicio Activo en puerto 8080 ")

    })

