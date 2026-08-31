import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  course: {
    code: string;
  };
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const byType = (type: string) => api.nodes.filter((node) => node.type === type);

describe("assignment 2 spec", () => {
  it("keeps the three digits the repo was provisioned with", () => {
    expect(api.course.code.slice(-3)).toBe("972");
  });

  it("runs across twelve dated teaching weeks", () => {
    const sessions = byType("sessions");
    expect(sessions).toHaveLength(12);
    const weeks = sessions.map((node) => node.meta?.week).sort((a, b) => Number(a) - Number(b));
    expect(weeks).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    for (const node of sessions) {
      expect(node.meta?.date, `${node.id} has no date`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("has at least one lecture linked to a real deck", () => {
    const lecturesWithSlides = byType("lectures").filter((node) => typeof node.meta?.slides === "string");
    expect(lecturesWithSlides.length).toBeGreaterThanOrEqual(1);
  });

  it("adds assessment weights up to 100", () => {
    const total = byType("assessments").reduce((sum, node) => sum + Number(node.meta?.weight ?? 0), 0);
    expect(total).toBe(100);
  });
});
