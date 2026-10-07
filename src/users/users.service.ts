import { Injectable, NotFoundException,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // create() below is just an instance method
  async create(createUserDto: CreateUserDto):Promise<User>{
    //optional, used when need to manipulate data in here, but BEST practise.
    const user = this.userRepository.create(createUserDto);

    //actually saves/writes to DB
    return this.userRepository.save(user);
  }
  // .create() object in memory. (NO DB query run)
  // .save() Executes an INSERT INTO (writes into DB)


 
  async findAll(){
    return this.userRepository.find();
  }


  async findOne(id:number){
    const user = await this.userRepository.findOneBy({id});

    if(!user){
      throw new NotFoundException("User not found for entered ID!");
    }
    return user;
  }

// Below codde is beginner's Patch method,use .preload() to do same, (perf-also-same),but in 1 line, and result can be 
// assigned to a ref var

  // async update(id:number,updateUserDto:UpdateUserDto):Promise<User>{
  //   const user = await this.findOne(id);   
  //   Object.assign(user,updateUserDto);     // {...user,updateUserDto} is incorrect here
  //   return this.userRepository.save(user);
  // }

// Better, has  more features as well
  async update(id:number,updateuserDto:UpdateUserDto):Promise<User>{
    const user = await this.userRepository.preload({id,...updateuserDto});

    if(!user){
      throw new NotFoundException("Record with entered ID doesn't exist!")
    }
    
    return await this.userRepository.save(user);
  }


  async delete(id:number){
    const user = await this.findOne(id);
    await this.userRepository.remove(user);

    return {message:"User with entered ID deleted!"};
  }
  
}
