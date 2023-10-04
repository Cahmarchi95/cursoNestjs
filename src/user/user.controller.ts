import { Controller, Post, Body, Get, Param, Put, Patch, Delete,ParseIntPipe } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';


@Controller('users')
export class UserController{

    constructor (private readonly userService:UserService){}

    @Post()
    async create(@Body() {email,name,password} : CreateUserDTO){
        return this.userService.create({email,name,password});
    }

    @Get()
    async list(){
        return this.userService.list();
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id:number ){
        return this.userService.readOne(id);
    }

    //PUT alteração total dos dados
    // PATCH update parcial 

    @Put(':id')
    async update(@Body() data: UpdatePutUserDTO, @Param('id', ParseIntPipe) id:number ){
        return this.userService.update(id,data);
    }
    
    @Patch(':id') 
    async updateParcial(@Body() data: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id:number ){
        return this.userService.updateParcial(id,data);

    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number ){
        return this.userService.delete(id);
    }
}