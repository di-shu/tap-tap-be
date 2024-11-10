import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PerformanceService {
  constructor(private prismaService: PrismaService) {}

  async getPerformanceStatistics(): Promise<number> {
    const result = await this.prismaService.$queryRaw<
      { usage_percentage: string }[]
    >`
      SELECT 
          ROUND((pg_database_size('dimashulyachenko') / '100'::text::pg_catalog.numeric) * 100, 2) AS usage_percentage
      FROM pg_database
      WHERE pg_database.datname = 'dimashulyachenko';
    `;

    if (result.length > 0) {
      return parseFloat(result[0].usage_percentage);
    }

    return 0;
  }
}
