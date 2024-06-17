import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) 
        private userRepo:Repository<User>
    ) {}


    create(email: string, password: string) {
        const user = this.userRepo.create({email, password});
        
        return this.userRepo.save(user);
    }

    findOne(id: number) {
        return this.userRepo.findOneBy({id});
        // return this.userRepo.findOne({email : email});
    }

    async find(email: string) {
        const users = await this.userRepo.findBy({email});
        if(users.length === 0) {
            throw new NotFoundException("User not found from service!");
        }
        return users;
    }

    async  update(id: number, attrs: Partial<User>) {
        const user = await  this.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        Object.assign(user, attrs);
        return this.userRepo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return this.userRepo.remove(user);
    }

}


const userService = new UsersService({} as any) 