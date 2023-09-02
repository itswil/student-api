import { InferInsertModel, InferSelectModel, eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";

import { students } from "../db/schema";
import { db } from "../db/client";

export const findAll = async () => await db.select().from(students);

const findOneById = async (id: number) =>
  await db.select().from(students).where(eq(students.id, id));

const findOneByEmail = async (email: string) =>
  await db.select().from(students).where(eq(students.email, email));

export const createOne = async (
  newStudent: InferInsertModel<typeof students>
) => {
  const studentsByEmail = await findOneByEmail(newStudent.email);
  if (studentsByEmail.length) {
    throw new HTTPException(409, { message: "Email already exists" });
  }

  return await db.insert(students).values(newStudent).returning();
};

export const updateOneById = async (
  id: number,
  updatedValues: Partial<Omit<InferSelectModel<typeof students>, "id">>
) => {
  const studentsById = await findOneById(id);
  if (studentsById.length === 0) {
    throw new HTTPException(404, { message: "User not found" });
  }

  return await db
    .update(students)
    .set(updatedValues)
    .where(eq(students.id, id))
    .returning();
};

export const deleteOneById = async (id: number): Promise<void> => {
  const studentsById = await findOneById(id);
  if (studentsById.length === 0) {
    throw new HTTPException(404, { message: "User not found" });
  }

  await db.delete(students).where(eq(students.id, id));
};
