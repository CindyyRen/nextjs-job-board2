-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('EMPLOYER', 'JOBSEEKER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "hashedPassword" TEXT,
ADD COLUMN     "userRole" "UserRole" NOT NULL DEFAULT 'JOBSEEKER';
