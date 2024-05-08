import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  //https://www.prisma.io/docs/orm/reference/prisma-client-reference
  log: [
    { level: "warn", emit: "event" },
    { level: "info", emit: "event" },
    { level: "error", emit: "event" },
  ],
});

const backend_forum = await db.forum.create({
  data: {
    name: "Backend questions",
  },
});

console.log(`Backend Forum created: `, backend_forum);

const frontend_forum = await db.forum.create({
  data: {
    name: "Frontend questions",
  },
});

console.log(`Frontend Forum created: `, frontend_forum);

const user = await db.user.create({
  data: {
    nick: "janeD",
    fullName: "Jane Doherty",

    messages: {
      createMany: {
        data: [
          {
            forumId: backend_forum.forumId,
            text: "backend rules",
          },
          {
            forumId: frontend_forum.forumId,
            text: "frontend rules",
          },
        ],
      },
    },
  },
});

console.log(`User created: `, user);
