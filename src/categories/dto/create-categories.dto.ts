import { IsString, Length} from "class-validator";

export class CreateCategoryDTO {
    @IsString()
    @Length(3,12)
    title: string;

    categoryImg: string;
}
