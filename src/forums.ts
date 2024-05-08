import type { Express } from "express";
import { db } from "./db";
import { Router } from "express";

const router = Router();

/*
GET     /forums/
POST    /forums/
GET     /forums/:id
PUT     /forums/:id
DELETE  /forums/:id
*/

router.get("/", async (request, response) => {
  try {
    const forums = await db.forum.findMany({
      orderBy: {
        createdAt: "asc",
      },
      select: {
        name: true,
        forumId: true,
      },
    });

    response.status(200).json(forums);
  } catch (error) {
    response.status(500).json({ error: "Internal Error" });
  }
});

export default router;
