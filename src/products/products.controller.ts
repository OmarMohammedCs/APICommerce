import { 
  Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, 
  BadRequestException, UploadedFiles, Query,
  UseGuards
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { CheckIdDTO } from './dto/checkId-product.dto';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { RoleModule } from 'src/users/guards-admin/roles.module';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
    @UseGuards(RoleModule,AuthGuard)
  @UseInterceptors(
    FilesInterceptor('productImages', 5, {  
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
          return callback(new BadRequestException('Only JPG, JPEG, and PNG files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async create(@Body() createProductDto: CreateProductDto, @UploadedFiles() files: any) {
    if (!files || files.length === 0) {
      throw new BadRequestException('At least one image is required');
    }
    const productImages = files.map(file => `/uploads/${file.filename}`);
    return await this.productsService.create(createProductDto, productImages);
  }

  @Get()
  async findAll(@Query() query: any) {
    const { search, category, minPrice, maxPrice , limit , page } = query;
    return await this.productsService.findAll(
      search,
      category,
      minPrice ? Number(minPrice) : undefined,
      maxPrice ? Number(maxPrice) : undefined,
      Number(limit),
      Number(page)  ,
    );
  }

  @Get(':id')
  async findOne(@Param() checkIdDTO: CheckIdDTO) {
    return await this.productsService.findOne(checkIdDTO.id);
  }

  @Patch(':id')
  @UseGuards(RoleModule,AuthGuard)
  async update(@Param() checkIdDTO: CheckIdDTO, @Body() updateProductDto: UpdateProductDto) {
    return await this.productsService.update(checkIdDTO.id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(RoleModule,AuthGuard)
  async remove(@Param() checkIdDTO: CheckIdDTO) { 
    return await this.productsService.remove(checkIdDTO.id);
  }
}
