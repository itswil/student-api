import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

type Data = {
  students: Array<Student>;
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db.json");

const adapter = new JSONFile<Data>(file);
const defaultData = {
  students: [
    {
      name: "Dan",
      dob: "2000-01-20",
      email: "dan@x.com",
      id: "55855300-48b7-11ee-bee5-5babe03ad2e8",
    },
    {
      name: "Jane",
      dob: "2000-01-20",
      email: "jane@x.com",
      id: "5a917040-48b7-11ee-bee5-5babe03ad2e8",
    },
    {
      name: "Ed",
      dob: "2000-01-20",
      email: "ed@x.com",
      id: "5d3b0c70-48b7-11ee-bee5-5babe03ad2e8",
    },
    {
      name: "Paul",
      dob: "2000-01-20",
      email: "paul@x.com",
      id: "61864ab0-48b7-11ee-bee5-5babe03ad2e8",
    },
  ],
};

const db = new Low<Data>(adapter, defaultData);

export { db };
