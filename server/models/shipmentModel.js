const mongoose=require('mongoose')



const shipmentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true,
    },

    shipment:[{

        fromcity:{
            type:String,
            required:true,
            trim:true

        },

        fromplace:{
            type:String,
            required:true,
            trim:true

        },
    fromname:{
        type:String,
        required:true,
        trim:true
    
    },
    frommobile:{
        type:Number,
        required:true,
        trim:true
    },
    
    
    fromaddress:{
        type:String,
        required:true,
        trim:true
        

    },
    frompin:{
        type:String,
        required:true,
        trim:true
        

    },
    fromdescription:{
        type:String,
        trim:true
        

    },
    toname:{
        type:String,
        required:true,
        trim:true
        

    },
    tomobile:{
        type:String,
        required:true,
        trim:true
        

    },
    toaddress:{
        type:String,
        required:true,
        trim:true
        

    },
    
    
    topin:{
        type:String,
        required:true,
        trim:true
    },

    tocity:{
        type:String,
        required:true,
        trim:true
    },
    toplace:{
        type:String,
        required:true,
        trim:true
    }
}]




}
,{
    timestamps:true
})


module.exports=mongoose.model('shipment',shipmentSchema)