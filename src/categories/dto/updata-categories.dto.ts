
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDTO } from './create-categories.dto';

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {}
