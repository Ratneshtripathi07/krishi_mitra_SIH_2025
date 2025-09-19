import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Set a global prefix for all routes to match our API contract (e.g., /api/v1/auth)
    app.setGlobalPrefix('api/v1');

    // Enable global validation pipe to automatically transform and validate incoming data
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    // As requested, set up Swagger for API documentation
    const config = new DocumentBuilder()
        .setTitle('Krishi Mitra API')
        .setDescription('The official API documentation for the Krishi Mitra application.')
        .setVersion('1.0')
        .addBearerAuth() // Adds authorization input to Swagger UI for JWT
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document); // API docs will be available at /api/docs

    // Ensure the app shuts down gracefully, calling OnModuleDestroy hooks
    app.enableShutdownHooks();

    // The port for the backend server, stored in .env
    await app.listen(process.env.PORT || 3001);
}
bootstrap();

//----------------------------------------------------------------------------------------------------------

// import { NestFactory } from '@nestjs/core'
// import { ValidationPipe } from '@nestjs/common'
// import { AppModule } from './app.module'

// async function bootstrap() {
//     const app = await NestFactory.create(AppModule)

//     app.useGlobalPipes(new ValidationPipe({
//         whitelist: true,
//         forbidNonWhitelisted: true,
//         transform: true,
//     }))

//     app.enableCors({
//         origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//         credentials: true,
//     })

//     const port = process.env.PORT || 3001
//     await app.listen(port)

//     console.log(`Application is running on: http://localhost:${port}`)
// }

// bootstrap()