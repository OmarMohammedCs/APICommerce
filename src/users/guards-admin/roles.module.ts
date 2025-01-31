import { Module } from '@nestjs/common';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [],
  providers: [RolesGuard ], 
  exports: [RolesGuard ], 
})
export class RoleModule {}
