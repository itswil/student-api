import { HTTPException } from "hono/http-exception";
import { v1 as uuid } from "uuid";
import { db } from "../db/client";

export const findAll = async () => {
  await db.read();
  return db.data.students;
};

const findOneById = async (id: string) => {
  await db.read();
  return db.data.students.find((student) => student.id === id);
};

const findOneByEmail = async (email: string) => {
  await db.read();
  return db.data.students.find((student) => student.email === email);
};

export const createOne = async (student: Omit<Student, "id">) => {
  const studentEmailExists = await findOneByEmail(student.email);
  if (studentEmailExists) {
    throw new HTTPException(409, { message: "Email already exists" });
  }

  await db.read();
  const newStudent = { ...student, id: uuid() };
  db.data.students.push(newStudent);
  await db.write();

  return newStudent;
};

export const updateOneById = async (
  id: string,
  updatedValues: Partial<Student>
) => {
  const studentIdExists = await findOneById(id);
  if (!studentIdExists) {
    throw new HTTPException(404, { message: "User not found" });
  }

  await db.read();
  const existingRecord = db.data.students.find((student) => student.id === id);
  const updatedRecord = { ...existingRecord, ...updatedValues };
  db.data.students = db.data.students.filter((student) => student.id !== id);
  db.data.students.push(updatedRecord);
  await db.write();

  return updatedRecord;
};

export const deleteOneById = async (id: string): Promise<void> => {
  const studentIdExists = await findOneById(id);
  if (!studentIdExists) {
    throw new HTTPException(404, { message: "User not found" });
  }

  await db.read();
  db.data.students = db.data.students.filter((student) => student.id !== id);
  await db.write();
};
