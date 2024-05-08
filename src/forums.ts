import type { Express } from "express";
import { db } from "./db";
import { Router } from "express";
import { NotFoundError } from "@prisma/client/runtime/library";

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

router.post("/", async (request, response) => {
  try {
    const { name } = request.body;
    if (name === undefined || typeof name !== "string")
      response.status(400).json({ error: "Wrong name field" });

    const forum = await db.forum.create({
      data: {
        name,
      },
    });
    response.status(201).json(forum);
  } catch (error) {
    response.status(500).json({ error: "Internal Error" });
  }
});

router.get("/:id", async (request, response) => {
  try {
    var { id } = request.params;

    const forum = await db.forum.findUniqueOrThrow({
      where: {
        forumId: Number(id),
      },
    });

    response.status(200).json(forum);
  } catch (e: any) {
    if (e.name === "NotFoundError") {
      response.status(404).json({ message: "Not Found" });
    } else if (e.name === "PrismaClientValidationError") {
      response.status(404).json({ message: "Field not valid" });
    }
    response.status(500).json({ name: e.name, error: "Internal Error" });
  }
});

export default router;
