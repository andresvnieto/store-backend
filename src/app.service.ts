import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
  ) {}
  getHello(): any {
    return {
      apiKey: this.apiKey,
      tasks: this.tasks,
    };
  }
}
