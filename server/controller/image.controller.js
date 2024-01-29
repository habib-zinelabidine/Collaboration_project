import ImageModel from "../model/uploadImage.js";

export const uploadImage = async(req,res,next)=>{
    try {
        let imageUrl = new ImageModel();
          if (req.file) {
            imageUrl.imageUrl =
              process.env.baseUrl + process.env.PORT + "/" + req.file.path;
              res.status(200).json({imageUrl : process.env.baseUrl + process.env.PORT + "/" + req.file.path
            })
          }
          
    } catch (error) {
        next(error)
    }
}
