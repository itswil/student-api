import { test, expect, describe, spyOn } from "bun:test";
import { api, getMessage } from "./api";
import * as service from "./service";

const data = [
  {
    id: 1,
    name: "John",
    dob: "2000-01-18",
    email: "john@example.com",
  },
  {
    id: 2,
    name: "Jane",
    dob: "1998-06-30",
    email: "jane@example.com",
  },
];

describe("/api/v1/students", () => {
  test("GET", async () => {
    spyOn(service, "getA").mockReturnValue("B");
    const msg = getMessage();
    expect(msg).toBe("HelloA");

    // const res = await api.request("/");
    // console.log("🚀 ~ test ~ res:", await res.json());

    // expect(res.status).toBe(200);
    // expect(await res.json()).toBe({
    //   students: data,
    // });
  });
});
