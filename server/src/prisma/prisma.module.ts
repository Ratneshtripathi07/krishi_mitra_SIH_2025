import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      // Log configuration based on the environment
      log:
        // The current environment (e.g., 'development', 'production'), stored in .env
        process.env.NODE_ENV === 'development'
          ? ['query', 'info', 'warn', 'error']
          : ['warn', 'error'],
    });
  }

  async onModuleInit() {
    // This is a NestJS lifecycle hook. It ensures we connect to the database
    // when the application module is initialized.
    await this.$connect();
  }

  async onModuleDestroy() {
    // This hook is called when the application is shutting down.
    // It ensures we gracefully disconnect from the database.
    await this.$disconnect();
  }
}
