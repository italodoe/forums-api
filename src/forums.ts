import type { Express } from "express";
import { db } from "./db";
import { Router } from "express";
import { send } from "./response";
import { z } from "zod";

const router = Router();
const idParamsSchema = z.object({
  id: z.coerce.number(),
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

router.get("/", async (request, response, next) => {
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
  } catch (error: any) {
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const data = forumBodySchema.parse(request.body);
    const forum = await db.forum.create({ data });
    send(response).createdOk(forum);
  } catch (error: any) {
    next(error);
  }
});

router.get("/:id", async (request, response, next) => {
  try {
    console.log(request.params);

    const { id: forumId } = idParamsSchema.parse(request.params);
    console.log(request.params);
    const forum = await db.forum.findUniqueOrThrow({ where: { forumId } });
    send(response).ok(forum);
  } catch (error: any) {
    next(error);
  }

});

router.put("/:id", async (request, response, next) => {
  try {
    const { id: forumId } = idParamsSchema.parse(request.params);
    const forumsData = forumBodySchema.parse(request.body);
    const updatedForum = await db.forum.update({
      where: { forumId },
      data: forumsData,
    });

    send(response).ok(updatedForum);
  } catch (error: any) {
    next(error);
  }

});

export default router;
