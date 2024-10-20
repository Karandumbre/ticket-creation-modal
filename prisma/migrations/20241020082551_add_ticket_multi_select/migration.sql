/*
  Warnings:

  - You are about to drop the column `tagId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_tagId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_userId_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "tagId",
DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_TicketTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserTickets" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TicketTags_AB_unique" ON "_TicketTags"("A", "B");

-- CreateIndex
CREATE INDEX "_TicketTags_B_index" ON "_TicketTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserTickets_AB_unique" ON "_UserTickets"("A", "B");

-- CreateIndex
CREATE INDEX "_UserTickets_B_index" ON "_UserTickets"("B");

-- AddForeignKey
ALTER TABLE "_TicketTags" ADD CONSTRAINT "_TicketTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TicketTags" ADD CONSTRAINT "_TicketTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTickets" ADD CONSTRAINT "_UserTickets_A_fkey" FOREIGN KEY ("A") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTickets" ADD CONSTRAINT "_UserTickets_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
