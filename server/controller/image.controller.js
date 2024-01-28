import ImageModel from "../model/uploadImage.js";

export const uploadImage = async(req,res,next)=>{
    try {
        let imageUrl = new ImageModel();
          if (req.file) {
            imageUrl.imageUrl =
              process.env.baseUrl + process.env.PORT + "/" + req.file.path;
          }
          imageUrl
            .save()
            .then((response) => {
              res.status(201).json(imageUrl);
            })
            .catch((error) => {
              res.json({ error });
            });
    } catch (error) {
        next(error)
    }
}