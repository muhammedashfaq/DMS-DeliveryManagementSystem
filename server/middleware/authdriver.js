const jwt =require('jsonwebtoken')

module.exports = async(req,res,next)=>{
    try {
        const token = req.headers['authorization'].split(' ')[1]      
        console.log('one',token);
    
        jwt.verify(token,process.env.JWT_SECRET_DRIVER,(err,decoded)=>{

            if(err){ 
                return res.status(401).send({message:"Auth failed",success:false})
            }else{
                req.driverId=decoded.id,
                console.log(req.driverId);


                next()
            }
        })
    } catch (error) {
        return res.status(401).send({message:"Auth failed",success:false})
    }
}