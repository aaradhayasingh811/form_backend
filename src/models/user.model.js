import mongoose,{Schema} from "mongoose";

const userSchema = Schema({
    name :{
        type :String,
        required :true
    },
    email :{
        type: String,
        required :true,
    },
    password :{
        type: String,
        required :true,
    }
})

export const User = mongoose.model("User",userSchema);