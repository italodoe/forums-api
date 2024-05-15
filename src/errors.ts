import type { ErrorRequestHandler } from "express";
import { send } from "./response";
import type { ZodError } from "zod";

const zodErrorMessage = (err: ZodError) => {
  const { issues } = err;
  const [firstIssue] = issues;
 const { code , path} = firstIssue
  switch (code) {
    case "to_small": {
      return `${firstIssue} is to small`;
    }

    default:
      return `Input data is wrong`;
  }
};

export const defaultErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  console.error("err>>>1", err.name);

  switch (err.name) {

    case "NotFoundError":
      return send(res).notFound();

    case "ZodError":
      console.error("err>>>", err);
      return send(res).badRequest(zodErrorMessage(err));

    default:
      return send(res).internalError("Internal error");
  }
};
