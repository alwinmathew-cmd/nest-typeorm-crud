// Set up QP types here, so u dont have to assign individual Pipes for each QP-dynamic-var in controller, code is less
// messy, for this update main.ts like now we have
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id?: number = 1; // Defaults to 1 if not provided in QP

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1; // Defaults to 1 if not provided in QP

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 5; // Defaults to 5 if not provided in QP

  @IsOptional()
  @IsString()
  search?: string;
}

// Example of how to use Query Parameter's now we dont need individual Pipes.

// @Controller('items')
// export class ItemsController {
//   @Get()
//   findAll(@Query() query: FilterDto) {
//     // If user requests /items?search=shoes (omitting page and limit):
//     // query.page will be 1
//     // query.limit will be 5
//     // query.search will be 'shoes'
    
//     return `Fetching page ${query.page} with limit ${query.limit}, searching for: ${query.search ?? 'none'}`;
//   }
// }