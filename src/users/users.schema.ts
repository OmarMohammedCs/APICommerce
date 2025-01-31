import { Prop , Schema , SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema({timestamps:true})
export class User {
    @Prop({type:String,required:true})
    name:string

    @Prop({type:String,required:true,unique:true})
    email:string

    @Prop({type:String,required:true})
    password:string

    @Prop({type:String})
    img?:string

    @Prop({type:String,default:"user",enum:["user", "admin"]})
    role:string

    @Prop({type:Boolean})
    isActive:boolean
}

export const UserSchame = SchemaFactory.createForClass(User) 