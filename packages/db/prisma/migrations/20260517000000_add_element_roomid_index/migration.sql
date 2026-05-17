-- Add index on Element.roomId to speed up getRoomElements() queries
CREATE INDEX IF NOT EXISTS "Element_roomId_idx" ON "Element"("roomId");
