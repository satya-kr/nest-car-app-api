import { Injectable } from '@nestjs/common';
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
}
