/* eslint-disable */

import {CACHE_MANAGER, Inject, Injectable, HttpException } from '@nestjs/common';
//import { TODOS } from './todos.mock';
import {Cache} from 'cache-manager';
import { todoDto } from './todo.dto';


@Injectable()
export class TodoService {

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async postTodos(todo) {
        await this.cacheManager.set<todoDto>(todo.id, todo, { ttl: 10000000 });
        
    }


    async getTodos() {
        //Get all keys
        const keys = await this.cacheManager.store.keys();
        
        //Loop through keys and get data
        const allData: todoDto[] = [];

        for (const key of keys) {
            allData.push(await this.cacheManager.get(key));
        }
        return allData;
    }




    async  deleteTodo(id: string){
        
        const todoId = id.replace(/(\r\n|\n|\r)/gm, "");

        await this.cacheManager.del(id);
    
    }


    /*
    public  updateTodo(id: string): Promise<any>{      
        return new Promise((resolve) => {

        const index=this.todos.findIndex((todo) => todo.id === id); //returns index

        if(index === -1){
            throw new HttpException('Not found', 404);
        }

        this.todos[index]['completed']= !this.todos[index]['completed'];

        return resolve(this.todos);

    })
    }
    */

    

    async putTodoById(id: string, taskValue: string){
        //await this.cacheManager.del(id);
        const todo={
            id: id,
            task: taskValue,
            completed: false,
        }
        
        await this.cacheManager.set<todoDto>(id, todo, { ttl: 10000000 });
           
    }


    async getTodoById(id:string) {

        const value = await this.cacheManager.get(id);
        return value;
        
    }   

}
