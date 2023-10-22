import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Db } from 'mongodb';
@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('MONGO') private database: Db,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): any {
    const apiKey = this.configService.apiKey;
    const database = this.configService.database;
    return 'HEllo world: ' + apiKey + ' ' + database.name;
  }
  async getUsers(): Promise<any> {
    const usersCollections = this.database.collection('users');
    const users = await usersCollections.find().toArray();
    return users;
  }
}
