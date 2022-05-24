/* eslint-disable */

import {CACHE_MANAGER, Inject, Injectable, HttpException } from '@nestjs/common';
import { TODOS } from './todos.mock';
import {Cache} from 'cache-manager';
import { todoDto } from './todo.dto';

/*
@Injectable()
export class TodoService {

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    private todos= TODOS;


    public getTodos(){
        return this.todos;
    }

    async addToCache(key: string, item: string) {
        await this.cacheManager.set(key, item);
      }

    public  postTodos(todo){
        //add todo to todos
        return this.todos.push(todo);
    }




    public  deleteTodo(id: string): Promise<any>{

        //const todoId= String(id);
        
        const todoId = id.replace(/(\r\n|\n|\r)/gm, "");

        return new Promise((resolve) => {
        
        const index=this.todos.findIndex((todo) => todo.id === todoId);
        //const index=this.todos.findIndex((todo) => todo.id === id); //returns index

        if(index === -1){
            
            throw new HttpException('Not found', 404);
        }

        this.todos.splice(index,1)
        //return this.cars;
        return resolve(this.todos);
    })
    }



    // public async deleteTodo(id: string){
        
    //     const todoId = id.replace(/(\r\n|\n|\r)/gm, "");
 
    //     this.todos= await this.todos.filter( todo => {todo.id !== todoId})
        
    // }


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


    public  putTodoById(id: string, taskValue: string): Promise<any>{

        const todoId= id;
        return new Promise((resolve) => {

        const index=this.todos.findIndex((todo) => todo.id === todoId); //returns index

        if(index === -1){
            throw new HttpException('Not found', 404);
        }

        this.todos[index]['task']=taskValue;

        return resolve(this.todos);
        
    })
    }

    

}
*/










@Injectable()
export class TodoService {

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    private todos= TODOS;


    // public getTodos(){
    //     return this.todos;
    // }


    // public  postTodos(todo){
    //     //add todo to todos
    //     return this.todos.push(todo);
    // }

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



    // public async deleteTodo(id: string){
        
    //     const todoId = id.replace(/(\r\n|\n|\r)/gm, "");
 
    //     this.todos= await this.todos.filter( todo => {todo.id !== todoId})
        
    // }


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







    // public  putTodoById(id: string, taskValue: string): Promise<any>{

    //     const todoId= id;
    //     return new Promise((resolve) => {

    //     const index=this.todos.findIndex((todo) => todo.id === todoId); //returns index

    //     if(index === -1){
    //         throw new HttpException('Not found', 404);
    //     }

    //     this.todos[index]['task']=taskValue;

    //     return resolve(this.todos);
        
    // })
    // }

    

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
