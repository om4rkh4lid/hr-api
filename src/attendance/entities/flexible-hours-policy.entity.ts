import { FlexibleHoursPolicy as PrismaFlexibleHoursPolicy } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class FlexibleHoursPolicy implements PrismaFlexibleHoursPolicy {
  id: number;
  fullyFlexible: boolean;
  startHr: number;
  coreWorkingHours: number;
  startMins: number;

  @Exclude()
  attendancePolicyId: number;

  constructor(partial: Partial<FlexibleHoursPolicy>) {
    Object.assign(this, partial);
  }
}
