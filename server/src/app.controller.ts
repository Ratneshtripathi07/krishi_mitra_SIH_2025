import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'API health check and information' })
  @ApiResponse({ status: 200, description: 'API is working correctly' })
  getHealthCheck() {
    return {
      message: '🌾 Krishi Mitra API is running successfully!',
      version: '1.0.0',
      status: 'healthy',
      endpoints: {
        documentation: '/api/docs',
        authentication: '/api/v1/auth',
        farms: '/api/v1/farms',
        dashboard: '/api/v1/dashboard',
        admin: '/api/v1/admin'
      },
      timestamp: new Date().toISOString()
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Simple health check' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}