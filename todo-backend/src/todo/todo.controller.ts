/* eslint-disable */

import { Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import { todoDto } from './todo.dto';
import { TodoService } from './todo.service';


@Controller('todo')
export class TodoController {

    constructor(private todoService : TodoService){}

    @Get()
    public  getTodos(){
        return this.todoService.getTodos();
    }

    @Get(':id')
    public async getTodoByID(@Param('id') id:string ){
        
        return this.todoService.getTodoById(id);
    }

    // @Get()
    // public async getTodos(){
    //     let cachedTodos = await this.cacheManager.get<todoDto>('cachedTodos');

    //     if(cachedTodos){
    //         return cachedTodos
    //       }

    //     //await this.cacheManager.set<todoDto>('cachedTodos', this.todoService.getTodos(), {ttl: 300});

    //     return this.todoService.getTodos();
    // }

    @Post()
    public postTodos(@Body() todo: todoDto){
        return this.todoService.postTodos(todo);
    }

    @Delete(':id')
    public async deleteTodo(@Param('id') id:string){
        return this.todoService.deleteTodo(id);
    }

    /*
    @Put(':id')
    public async updateTodo(@Param('id') id:string ){
        
        return this.todoService.updateTodo(id);
    }
    */

    @Put('update/:id')
    public async putCarById(@Param('id') id:string, @Query() query ){
        const taskValue = query.task;
        //const propertyValue= query.property_value;
        return this.todoService.putTodoById(id, taskValue);
    }
}
