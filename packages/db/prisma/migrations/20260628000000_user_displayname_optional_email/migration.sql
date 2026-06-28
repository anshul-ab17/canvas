-- AlterTable: make email optional and add displayName
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL;
ALTER TABLE "User" ADD COLUMN "displayName" TEXT;

-- AddCascadeDelete: Chat and Element cascade on room delete
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_roomId_fkey";
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Element" DROP CONSTRAINT "Element_roomId_fkey";
ALTER TABLE "Element" ADD CONSTRAINT "Element_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
