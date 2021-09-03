import { Get, Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { DatabaseHealthIndicator } from '../database/database.health';

@Controller('health')
@ApiTags('Health Check')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: DatabaseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({
    summary: 'Health check endpoint',
    description: 'Health check for K8s or other monitoring tools',
  })
  healthCheck() {
    return this.health.check([() => this.db.isHealthy()]);
  }
}
