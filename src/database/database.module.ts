import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import config from '../config';
import { log } from 'console';

const API_KEY = '123456';
const API_KEY_PROD = 'xyz';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, pass, host, port, db } = configService.mongo;
        const uri = `${connection}://${user}:${pass}@${host}:${port}`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(db);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO'],
})
export class DatabaseModule {}
