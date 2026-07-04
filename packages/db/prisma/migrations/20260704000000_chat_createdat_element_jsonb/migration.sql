-- Catch-up migration: schema.prisma already declares these, SQL was never generated.

-- Chat.createdAt (BUG-03): timestamps for chat history ordering
ALTER TABLE "Chat" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Element.data TEXT -> JSONB (BUG-09): enables DB-level querying, matches Json type in schema
ALTER TABLE "Element" ALTER COLUMN "data" TYPE JSONB USING "data"::jsonb;
