import { Body, Controller, Get, Param, Post, Patch, Delete, ParseIntPipe, } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { FilterDto } from './dto/filter.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

// all route not needed,but to make a Point: Static routes for same HTTP-method should come before any dynamic route(same HTTP method)
// else, dynamic route willconsider the ststic route passed as it's value
  @Get('all')
  findAll(){                             // yet to add QP logic
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id:number){
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id:number,
         @Body() updateUserDto:UpdateUserDto){

        return this.usersService.update(id,updateUserDto)
  }

  @Delete(':id')
  delete(@Param('id',ParseIntPipe) id:number){
    return this.usersService.delete(id);   
  }


}

// Notes:

// DTO's: OK for @Body(), @Query(),    but NOT OK for @Param(), dynamic val needs its own ParseIntPipe