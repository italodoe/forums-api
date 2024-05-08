import type { Express } from "express";
import { db } from "./db";


/*
GET     /forums/
POST    /forums
GET     /forums/:id
PUT     /forums/:id
DELETE  /forums/:id

*/

export const setupForumEndPoints = (app: Express) => {
  app.get("/forums", async (request, response) => {
    try {
      const forums = await db.forum.findMany({
        orderBy: {
          createdAt: "asc",
        },
      });

      response.status(200).json(forums);
    } catch (error) {
      response.status(500).json({ error: "Internal Error" });
    }
  });

  app.get("/", async (request, response) => {
    response.status(200).json({ ok: true, message: "hey, !2!" });
  });
};
