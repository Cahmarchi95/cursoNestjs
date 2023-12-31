
import { Injectable,NotFoundException } from "@nestjs/common"; 
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService{

    constructor(private readonly prisma: PrismaService){

    }

    async create({email,name,password}:CreateUserDTO){
        
       return this.prisma.users.create({
            data:{
                email,
                name,
                password
            },

    
        });

    }

    async list(){
        return this.prisma.users.findMany();
    }

    async readOne(id:number){
        return this.prisma.users.findUnique({
            where: {id}
        });
    }

    async update(id:number, data:UpdatePutUserDTO){
        
     await this.exists(id);


      return this.prisma.users.update({
        data,
        where:{id}
      });  

    }

    async updateParcial(id:number, data:UpdatePatchUserDTO){
        
        await this.exists(id);


        return this.prisma.users.update({
          data,
          where:{id}
        });  
  
      }

    async delete(id:number){

       await this.exists(id);

        return this.prisma.users.delete({
            where:{
                id
            }           

      })
  
    }


    async exists(id:number){
        
        if(!(await this.readOne(id))){
            throw new NotFoundException(`O usuário ${id} não existe`)
        }
    }

}
