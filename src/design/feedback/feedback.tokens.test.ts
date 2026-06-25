import test from "node:test";
import assert from "node:assert/strict";
import { FEEDBACK_TOKENS } from "./feedback.tokens.js"; // .js extension is required in ES modules in Node

test("FEEDBACK_TOKENS structural spec", () => {
  assert.ok(FEEDBACK_TOKENS, "FEEDBACK_TOKENS should be defined");
  
  // Size dimension
  assert.equal(FEEDBACK_TOKENS.size.key, "size");
  assert.ok(FEEDBACK_TOKENS.size.modifier);
  
  // Variant dimension
  assert.equal(FEEDBACK_TOKENS.variant.key, "variant");
  assert.ok(FEEDBACK_TOKENS.variant.modifier);
  
  // Color dimension
  assert.equal(FEEDBACK_TOKENS.color.key, "color");
  assert.ok(FEEDBACK_TOKENS.color.modifier);
  
  // Radius dimension
  assert.equal(FEEDBACK_TOKENS.radius.key, "radius");
  assert.equal(FEEDBACK_TOKENS.radius.modifier, undefined);
  
  // Value keys check
  const sizes = Object.keys(FEEDBACK_TOKENS.size.values);
  assert.ok(sizes.includes("sm"));
  assert.ok(sizes.includes("md"));
  
  const variants = Object.keys(FEEDBACK_TOKENS.variant.values);
  assert.ok(variants.includes("solid"));
  assert.ok(variants.includes("soft"));
  assert.ok(variants.includes("outlined"));
  assert.ok(variants.includes("ghost"));
  assert.ok(variants.includes("dashed"));
});
