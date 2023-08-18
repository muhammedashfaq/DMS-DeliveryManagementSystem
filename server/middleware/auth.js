const jwt =require('jsonwebtoken')

module.exports = async(req,res,next)=>{
    try {
        const token = req.headers['authorization']?.split(' ')[1];
    
        jwt.verify(token,process.env.JWT_SECRET_USER,(err,decoded)=>{

            if(err){ 
                console.log("errorrrrrr")
                console.log(err)
                return res.status(401).send({message:"Auth failed",success:false})
            }else{
                req.userId =decoded.id,
                console.log(req.userId,'idauth')

                next()
                console.log("auth ntest")
            }
        })
    } catch (error) {
        console.log(error)
        
        return res.status(401).send({message:"Auth failed",success:false})
    }
}