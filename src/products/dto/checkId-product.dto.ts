import { IsMongoId } from 'class-validator';

export class CheckIdDTO {
  @IsMongoId({ message: 'Invalid MongoDB ID format' })
  id: string;
}