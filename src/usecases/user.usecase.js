const createError = require("http-errors")
const fsPromises = require('fs/promises')


const getAll = () => {
  return User.find({})
}

const getById = async (id) => {

  console.log("Lllego getbyid", id )

  const candidatos = await fsPromises.readFile("candidatos.json", "utf8")
  
  const candidatosJson = JSON.parse(candidatos)
  const candidatoEncontrado = candidatosJson.candidatos.filter((candidato) => {

      if ( candidato.id === parseInt(id) ){
      return candidato
      }

      
  })
  
  if( candidatoEncontrado.length == 0 ){
      response.json("El candidato no fue encontrado")
      return
  }
  console.log( candidatoEncontrado )
    //response.json(candidatoEncontrado)
   
  
  return candidatoEncontrado
}


module.exports = { getById }