import { Module } from '@nestjs/common';
import { Repository } from './repository.service';

@Module({
  providers: [Repository],
  exports: [Repository]
})
export class UserModule {}
