import { Prop , Schema , SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>

@Schema({timestamps:true})
export class Category {
    @Prop({type:String,required:true})
    title:string

    @Prop({type:String})
    categoryImg:string

}

export const CategorySchame = SchemaFactory.createForClass(Category) 