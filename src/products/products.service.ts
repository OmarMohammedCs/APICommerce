import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './products.schema';
import { Category, CategoryDocument } from 'src/categories/categories.schame';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createProductDto: CreateProductDto, productImages: string[]) {
    const { stock, discount, price, category: categoryTitle } = createProductDto;

    
    const isAvailable = stock > 0;
 
    const finalPrice = discount && discount > 0 
        ? price - (price * (discount / 100)) 
        : price;

    const existingCategory = await this.categoryModel.findOne({ title: categoryTitle }).lean().exec();
    if (!existingCategory) {
        throw new NotFoundException(`Category with title "${categoryTitle}" not found`);
    }

  
    const newProduct = new this.productModel({
        ...createProductDto,
        isAvailable,
        price: finalPrice,
        category: existingCategory._id,  
        productImages
    });

    return await newProduct.save();
}


  async findAll(search?: string, category?: string, minPrice?: number, maxPrice?: number, limit?: number, page?: number) {
    const filter: any = {};

    if (search?.trim()) {
      filter.$or = [
        { name: { $regex: new RegExp(search, 'i') } },
        { description: { $regex: new RegExp(search, 'i') } }
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = minPrice;
      if (maxPrice !== undefined) filter.price.$lte = maxPrice;
    }

    const skip = limit * (page - 1);

    const products = await this.productModel.find(filter).populate('category').skip(skip).limit(limit).exec();

    if (!products || products.length === 0) {
      throw new NotFoundException('No products found');
    }

    const totalProducts = await this.productModel.countDocuments(filter).exec();

    return { products, totalProducts , limit , page , totalPages: Math.ceil(totalProducts / limit) };
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto, productImages?: string[]) {
    if (updateProductDto.discount && updateProductDto.discount > 0) {
      updateProductDto.price -= updateProductDto.price * (updateProductDto.discount / 100);
    }

    const updateData = productImages ? { ...updateProductDto, productImages } : updateProductDto;
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateData, { new: true }).exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return updatedProduct;
  }

  async remove(id: string) {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { message: `Product with ID ${id} deleted successfully` };
  }
}
