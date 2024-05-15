import type { Express } from "express";
import { db } from "./db";
import { Router } from "express";
import { send } from "./response";
import { z } from "zod";
import { catchError } from "./errors";

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

router.get(
  "/",
  catchError(async (request, response) => {
    const forums = await db.forum.findMany({
      orderBy: { createdAt: "asc" },
      select: { name: true, forumId: true },
    });
    send(response).ok(forums);
  })
);

router.post(
  "/",
  catchError(async (request, response, next) => {
    const data = forumBodySchema.parse(request.body);
    const forum = await db.forum.create({ data });
    send(response).createdOk(forum);
  })
);

router.get(
  "/:id",
  catchError(async (request, response, next) => {
    const { id: forumId } = idParamsSchema.parse(request.params);
    const forum = await db.forum.findUniqueOrThrow({ where: { forumId } });
    send(response).ok(forum);
  })
);

router.put(
  "/:id",
  catchError(async (request, response, next) => {
    const { id: forumId } = idParamsSchema.parse(request.params);
    const forumsData = forumBodySchema.parse(request.body);
    const updatedForum = await db.forum.update({
      where: { forumId },
      data: forumsData,
    });
    send(response).ok(updatedForum);
  })
);

router.delete(
  "/:id",
  catchError(async (request, response, next) => {
    const { id: forumId } = idParamsSchema.parse(request.params);
    const deletedForum = await db.forum.delete({ where: { forumId } });
    send(response).deletedOk(deletedForum);
  })
);

export default router;
