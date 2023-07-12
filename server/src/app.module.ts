import { Module } from '@nestjs/common';
import { TypedConfigModule, fileLoader } from 'nest-typed-config';
import { Config } from './config';

@Module({
  imports: [
    TypedConfigModule.forRoot({
      isGlobal: true,
      schema: Config,
      load: fileLoader(),
    }),
  ],
})
export class AppModule {}
