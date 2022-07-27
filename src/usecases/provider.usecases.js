
const createError = require("http-errors")
const fsPromises = require('fs/promises')


const getAll = async () => {
  
    const proveedores = await fsPromises.readFile("BD.json", "utf8")
    
    const proveedoresJson = JSON.parse(proveedores)

    
    if( proveedoresJson.length == 0 ){
        response.json("No existen proveedores")
        return
    }
    console.log( proveedoresJson )

    return proveedoresJson
}

const create = async (postData) => { 

      console.log(postData );

      const { name, service } = postData // Recibimos datos

      const providersfs = await fsPromises.readFile("BD.json", "utf-8")
      const bd = JSON.parse(providersfs)
      const providers = bd.proveedores
  
      const newProviders = [...providers] 
  

      const provedorEncontrado = providers.filter((provider) => {

        if ( provider.name === name ){
        return provider
        }
          
      })
    
      if( provedorEncontrado.length > 0 ){
          
          return { "message": "Proveedor ya existe"}
      }

      let id = parseInt(Math.random() * 100)
      newProviders.push({
        id: id,
        name: name,
        service: service
      })
  
    
      bd.proveedores = newProviders
  
      
      await fsPromises.writeFile("BD.json", JSON.stringify(bd, "\n", 4))

      
     return {
        id: id,
        name: name,
        service: service
      }

  }

  const remove = async (id) =>{

      const providersfs = await fsPromises.readFile("BD.json", "utf-8")
      const bd = JSON.parse(providersfs)
    
      const proveedorEncontrado = bd.proveedores.filter(proveedor => {
        return proveedor.id === parseInt(id)
      })
    
      if(!proveedorEncontrado.length) {
        response.status(404) // No se encontro el koder
        return { "message": "El koder solicitdado no se encontro" }
        
      }
    
      const proveedoresSinEliminar = bd.proveedores.filter((proveedor) => {
        if(proveedor.id !== parseInt(id)) {
          return proveedor
        }
      })
    
    
      // Modificacion
      bd.proveedores = proveedoresSinEliminar
      
      await fsPromises.writeFile("BD.json", JSON.stringify(bd, "\n", 2))

      return { "status": 202, "message": "Se elimino exitosamente" }
    
    
  }

module.exports = { getAll, create, remove }