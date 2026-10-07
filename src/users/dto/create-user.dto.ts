import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'Name must at least have length of 3!' }) //ensures not empty
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsInt() //ensures int
  @Min(18) //least permitted val
  @Type(() => Number)
  age?: number;
}

// without @Type(() => Number) class transformer,  @IsInt() class-validator will immediately fail 
// on "21" because "21" is a TypeScript string at runtime, causing a 400 Bad Request.