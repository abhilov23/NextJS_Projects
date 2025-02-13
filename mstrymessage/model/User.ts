import mongoose, {Schema, Document} from "mongoose";


//defining the interface of the schema because we are using typescript
export interface Message extends Document {
    content: string;
    createdAt: Date;
}

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: string;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    Message: Message[];
}

//using the schema
const messageSchema: Schema<Message> = new Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, required:true , default: Date.now },
});



const UserSchema: Schema<User> = new Schema({
    username: { type: String, required: [true, "username is required"] },
    email: { type: String, required: true, unique:[true, "email is required"],
             match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email format"],},
    password: { type: String, required: true },
    verifyCode: { type: String,required: true, default: '' },
    verifyCodeExpiry: { type: String,required: true, default: '' },
    isVerified:{ type: Boolean,required: true, default:false},
    isAcceptingMessage: { type: Boolean, default: true },
    Message: [messageSchema],
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;