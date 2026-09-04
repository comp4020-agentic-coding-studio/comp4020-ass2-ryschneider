import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  spec?: unknown;
}

interface CourseApi {
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const byType = (type: string) => api.nodes.filter((node) => node.type === type);

describe("this course's own promises", () => {
  it("tells you, every week, what you should be able to do by the end of it", () => {
    for (const node of byType("sessions")) {
      const spec = node.spec;
      expect(Array.isArray(spec) && spec.length > 0, `${node.id} states no checkable outcome`).toBe(true);
    }
  });
});
