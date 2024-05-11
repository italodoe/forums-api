import type { Express } from "express";
import { db } from "./db";
import { Router } from "express";
import { send } from "./response";
import { z } from "zod";

const router = Router();
const idParamsSchema = z.object({
  id: z.number(),
});
const forumBodySchema = z.object({
  name: z.string().min(5).max(255),
});

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

    send(response).ok(forums);
  } catch (error) {
    send(response).internalError("Forums not found");
  }
});

router.post("/", async (request, response) => {
  try {

    const forumsData = forumBodySchema.parse(request.body);

    const forum = await db.forum.create({
      data: forumsData,
    });
    send(response).createdOk(forum);
  } catch (error) {
    send(response).internalError("Internal error");
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id: forumId } = idParamsSchema.parse(request.params);
    const forum = await db.forum.findUniqueOrThrow({
      where: {
        forumId,
      },
    });

    send(response).ok(forum);
  } catch (e: any) {
    if (e.name === "NotFoundError") {
      send(response).notFound();
    } else if (e.name === "PrismaClientValidationError") {
      send(response).notFound();
    }
  }
  send(response).internalError("Internal error");
});

router.put("/:id", async (request, response) => {
  try {
    const { id: forumId } = idParamsSchema.parse(request.params);

      const forumsData = forumBodySchema.parse(request.body);

    const updatedForum = await db.forum.update({
      where: { forumId },
      data: forumsData,
    });

    send(response).ok(updatedForum);
  } catch (e: any) {
    if (e.name === "NotFoundError") {
      send(response).notFound();
    } else if (e.name === "PrismaClientValidationError") {
      send(response).notFound();
    }
  }
  send(response).internalError("Internal error");
});

export default router;
