import { InferSelectModel } from "drizzle-orm";
import { Hono } from "hono";
import pick from "lodash/pick";

import {
  createOne,
  deleteOneById,
  findAll,
  getA,
  updateOneById,
} from "./service";
import { students } from "../db/schema";

const api = new Hono();

api.get("/", async (c) => {
  const students = await findAll();
  return c.json({ students });
});

api.post("/", async (c) => {
  const newStudent = await c.req.json();
  return c.json(await createOne(newStudent));
});

api.put("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const valuesToUpdate = await c.req.json();
  const studentValuesToUpdate: Partial<
    Omit<InferSelectModel<typeof students>, "id">
  > = pick(valuesToUpdate, ["name", "dob", "email"]);

  const updatedStudent = await updateOneById(id, studentValuesToUpdate);

  return c.json(updatedStudent);
});

api.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  await deleteOneById(id);

  return c.text(null, 204);
});

export { api };

export const getMessage = () => "Hello" + getA();
