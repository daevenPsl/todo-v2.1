/* eslint-disable */

import { Module, CacheModule } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
