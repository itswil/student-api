import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { api as studentsApi } from "./students/api";

const port = parseInt(process.env.PORT) || 3000;

const app = new Hono();

app.get("/", (c) => c.text("Student API"));
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    c.status(err.status);
    return c.json({
      error: {
        code: err.status,
        message: err.message,
      },
    });
  }
});

app.route("/api/v1/students", studentsApi);

console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
