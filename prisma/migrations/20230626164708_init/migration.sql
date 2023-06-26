-- CreateEnum
CREATE TYPE "AttendanceEvent" AS ENUM ('CLOCK_IN', 'CLOCK_OUT', 'MISSED', 'LATE_CLOCK_IN', 'OVERTIME_CLOCK_OUT', 'ABSENT');

-- CreateEnum
CREATE TYPE "MissedClockOutPolicy" AS ENUM ('SET_MISSED', 'SET_DEFAULT_END_SHIFT');

-- CreateEnum
CREATE TYPE "Weekday" AS ENUM ('SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI');

-- CreateTable
CREATE TABLE "CompanyAttendancePolicy" (
    "id" SERIAL NOT NULL,
    "allowedLateMinutes" INTEGER NOT NULL DEFAULT 10,
    "allowedLateHrs" INTEGER NOT NULL DEFAULT 0,
    "lateHrsToAbsent" INTEGER NOT NULL DEFAULT 2,
    "lateMinutesToAbsent" INTEGER NOT NULL DEFAULT 0,
    "breakDurationMinutes" INTEGER NOT NULL DEFAULT 30,
    "onMissedClockOut" "MissedClockOutPolicy" NOT NULL DEFAULT 'SET_MISSED',

    CONSTRAINT "CompanyAttendancePolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceLog" (
    "id" SERIAL NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "hr" INTEGER NOT NULL,
    "min" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "eventType" "AttendanceEvent" NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "AttendanceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlexibleHoursPolicy" (
    "id" SERIAL NOT NULL,
    "fullyFlexible" BOOLEAN NOT NULL DEFAULT false,
    "startHr" INTEGER,
    "startMins" INTEGER,
    "coreWorkingHours" INTEGER NOT NULL DEFAULT 4,
    "attendancePolicyId" INTEGER NOT NULL,

    CONSTRAINT "FlexibleHoursPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendancePolicy" (
    "id" SERIAL NOT NULL,
    "startHr" INTEGER NOT NULL DEFAULT 9,
    "startMins" INTEGER NOT NULL DEFAULT 0,
    "workingHrs" INTEGER NOT NULL DEFAULT 8,
    "daysOff" "Weekday"[] DEFAULT ARRAY['FRI', 'SAT']::"Weekday"[],
    "flexibleHoursPolicyId" INTEGER,
    "employeeId" INTEGER NOT NULL,
    "companyAttendancePolicyId" INTEGER NOT NULL,

    CONSTRAINT "AttendancePolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "companyAttendancePolicyId" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "photoUrl" TEXT,
    "userId" INTEGER NOT NULL,
    "directSuperiorId" INTEGER,
    "attendancePolicyId" INTEGER,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FlexibleHoursPolicy_attendancePolicyId_key" ON "FlexibleHoursPolicy"("attendancePolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "AttendancePolicy_flexibleHoursPolicyId_key" ON "AttendancePolicy"("flexibleHoursPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "AttendancePolicy_employeeId_key" ON "AttendancePolicy"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyAttendancePolicyId_key" ON "Company"("companyAttendancePolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_userId_key" ON "Employee"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_attendancePolicyId_key" ON "Employee"("attendancePolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "AttendanceLog" ADD CONSTRAINT "AttendanceLog_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlexibleHoursPolicy" ADD CONSTRAINT "FlexibleHoursPolicy_attendancePolicyId_fkey" FOREIGN KEY ("attendancePolicyId") REFERENCES "AttendancePolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendancePolicy" ADD CONSTRAINT "AttendancePolicy_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendancePolicy" ADD CONSTRAINT "AttendancePolicy_companyAttendancePolicyId_fkey" FOREIGN KEY ("companyAttendancePolicyId") REFERENCES "CompanyAttendancePolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_companyAttendancePolicyId_fkey" FOREIGN KEY ("companyAttendancePolicyId") REFERENCES "CompanyAttendancePolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_directSuperiorId_fkey" FOREIGN KEY ("directSuperiorId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
