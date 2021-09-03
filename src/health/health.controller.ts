import { Get, Controller } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { DatabaseHealthIndicator } from '../database/database.health';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: DatabaseHealthIndicator,
  ) {}
  @Get()
  @HealthCheck()
  healthCheck() {
    return this.health.check([() => this.db.isHealthy()]);
  }
}
