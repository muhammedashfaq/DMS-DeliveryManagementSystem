const mongoos= require('mongoose')

const userSchema =new mongoos.Schema({
username:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true

},
password:{
    type:String,
    required:true

},
isVerified:{
    type:Boolean,
    default:false
},
islocked:{
    type:Boolean,
    default:false
}



},{
    timestamps:true
}


)

module.exports=mongoos.model('user',userSchema)