import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('Connected to MongoDB');
        });
        connection.on('error', (error) => {
          console.error('MongoDB connection error:', error);
        });
        return connection;
      },
    }),
    UsersModule,
  ],
})
export class AppModule {}