import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './categories.schame';
import { CreateCategoryDTO } from './dto/create-categories.dto';
import { UpdateCategoryDTO } from './dto/updata-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  // إنشاء فئة جديدة
  async createCategory(createCategoryDto: CreateCategoryDTO, file: any) {
    const { title } = createCategoryDto;

    // التحقق من وجود فئة بنفس العنوان
    const existingCategory = await this.categoryModel.findOne({ title });
    if (existingCategory) {
      throw new BadRequestException('Category already exists');
    }

    // إنشاء فئة جديدة
    const newCategory = new this.categoryModel({
      ...createCategoryDto,
      categoryImg: file ? file.path : null,
    });
    return await newCategory.save();
  }

  // الحصول على جميع الفئات
  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  // الحصول على فئة بناءً على المعرف
  async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException('Category with the given ID was not found');
    }
    return category;
  }

  // تحديث فئة بناءً على المعرف
  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDTO): Promise<Category> {
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
    if (!updatedCategory) {
      throw new NotFoundException('Category with the given ID was not found');
    }
    return updatedCategory;
  }

  // حذف فئة بناءً على المعرف
  async deleteCategory(id: string): Promise<Category> {
    const deletedCategory = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!deletedCategory) {
      throw new NotFoundException('Category with the given ID was not found');
    }
    return deletedCategory;
  }
}
