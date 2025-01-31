import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/create-categories.dto';
import { CheckIdDTO } from './dto/checkId-categories.dto';
import { UpdateCategoryDTO } from './dto/updata-categories.dto';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { RoleModule } from 'src/users/guards-admin/roles.module';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
   @UseGuards(RoleModule,AuthGuard)
  @UseInterceptors(
    FileInterceptor('categoryImg', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileExtension = path.extname(file.originalname);
          const filename = `${Date.now()}${fileExtension}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new BadRequestException('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async createCategory(
    @Body() createCategoryDTO: CreateCategoryDTO,
    @UploadedFile() file: any,
  ) {
    if (!file) {
      throw new BadRequestException('Category image is required');
    }
    return this.categoriesService.createCategory(createCategoryDTO, file);
  }

  @Get()
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param() checkIdDTO: CheckIdDTO) {
    return this.categoriesService.getCategoryById(checkIdDTO.id);
  }

  @Patch(':id')
  @UseGuards(RoleModule,AuthGuard)
  @UseInterceptors(
    FileInterceptor('categoryImg', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileExtension = path.extname(file.originalname);
          const filename = `${Date.now()}${fileExtension}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return callback(new BadRequestException('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async updateCategory(
    @Param() checkIdDTO: CheckIdDTO,
    @Body() updateCategoryDTO: UpdateCategoryDTO,
    @UploadedFile() file?: any,
  ) {
    return this.categoriesService.updateCategory(checkIdDTO.id, { ...updateCategoryDTO, categoryImg: file?.path });

  }

  @Delete(':id')
  @UseGuards(RoleModule,AuthGuard)
  async deleteCategory(@Param() checkIdDTO: CheckIdDTO) {
    return this.categoriesService.deleteCategory(checkIdDTO.id);
  }
}
 