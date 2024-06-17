import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    NotFoundException, 
    Param, 
    Patch, 
    Post,
    Query,
    UseInterceptors,
    // ClassSerializerInterceptor
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {


    constructor(
        private usersService: UsersService
    ) {}

    @Post("signup")
    createUser(@Body() body: CreateUserDto) {
        this.usersService.create(body.email, body.password);
        return {message: "User created"}
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    @UseInterceptors(SerializeInterceptor)
    @Get(":id")
    async findUser(
        @Param("id") id: string
    ) {
        console.log('handler is running');
        const user = await this.usersService.findOne(parseInt(id)); 
        if(!user) {
            throw new NotFoundException("User not found");
        }

        return user;
    }

    @Get()
    async findAllUsers(
        @Query("email") email: string
    ) {
        const users = await this.usersService.find(email);
        // if(users.length === 0) {
        //     throw new NotFoundException("User not found");
        // }

        return users;

    }
    @Delete(":id")
    removeUser(
        @Param("id") id: string
    ) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch(":id")
    updateUser(
        @Param("id") id: string,
        @Body() body: UpdateUserDto
    ) {
        return this.usersService.update(parseInt(id), body);
    }
}
