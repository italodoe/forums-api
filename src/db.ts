import { PrismaClient } from "@prisma/client";

// export default db;
export const db = new PrismaClient({
  //https://www.prisma.io/docs/orm/reference/prisma-client-reference
  log: [
    { level: "warn", emit: "event" },
    { level: "info", emit: "event" },
    { level: "error", emit: "event" },
  ],
});