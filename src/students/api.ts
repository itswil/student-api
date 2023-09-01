import { Hono } from "hono";
import { createOne, deleteOneById, findAll, updateOneById } from "./service";

const api = new Hono();

api.get("/", async (c) => {
  const allStudents = await findAll();
  return c.json({ students: allStudents });
});

api.post("/", async (c) => {
  const newStudent: Omit<Student, "id"> = await c.req.json();
  const addedStudent = await createOne(newStudent);

  return c.json(addedStudent);
});

api.put("/:studentId", async (c) => {
  const studentId = c.req.param("studentId");
  const partialStudent: Partial<Student> = await c.req.json();
  const updatedStudent = await updateOneById(studentId, partialStudent);

  return c.json(updatedStudent);
});

api.delete("/:studentId", async (c) => {
  const studentId = c.req.param("studentId");
  await deleteOneById(studentId);

  return c.text(null, 204);
});

export { api };
