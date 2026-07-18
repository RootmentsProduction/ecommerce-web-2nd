import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';

export enum SortOption {
  FEATURED = 'featured',
  NEWEST = 'newest',
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  RATING_DESC = 'rating_desc',
}

export class GetProductsQueryDto {
  @IsString()
  @IsOptional()
  category?: string;

  @Transform(({ value }) => {
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber()
  @IsOptional()
  minPrice?: number;

  @Transform(({ value }) => {
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber()
  @IsOptional()
  maxPrice?: number;

  @IsString()
  @IsOptional()
  occasion?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  })
  @IsBoolean()
  @IsOptional()
  inStock?: boolean;

  @IsString()
  @IsOptional()
  search?: string;

  @IsEnum(SortOption, {
    message:
      'Invalid sort option. Must be one of: featured, newest, price_asc, price_desc, rating_desc',
  })
  @IsOptional()
  sort?: SortOption;

  @Transform(({ value }) => {
    const num = parseInt(String(value), 10);
    return isNaN(num) ? 1 : num;
  })
  @IsNumber()
  @IsOptional()
  page?: number;

  @Transform(({ value }) => {
    const num = parseInt(String(value), 10);
    return isNaN(num) ? 12 : num;
  })
  @IsNumber()
  @IsOptional()
  limit?: number;

  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  })
  @IsBoolean()
  @IsOptional()
  newArrival?: boolean;

  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  })
  @IsBoolean()
  @IsOptional()
  bestSeller?: boolean;

  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;
}
