const express = require("express")
const { getById } = require("../usecases/user.usecase")


const router = express.Router();


router.get("/:id", async (request, response) => {
  const { id } = request.params
  try {
    const user =  await getById(id);
    response.json({
      success: true,
      data: {
        user
      }
    })
  }catch(error) {
    response.status(error.status || 500)
    response.json({
      success: false,
      message: error.message
    })
  }
})




module.exports = router