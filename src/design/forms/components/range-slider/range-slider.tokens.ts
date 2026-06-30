import { composeTokens, dimension, scale } from "~/shared/tokens";
import { FORM_TOKENS } from "../../forms.tokens";

export const RANGE_SLIDER_TOKENS = composeTokens(FORM_TOKENS, {
  trackHeight: dimension("track-height", scale({ default: "var(--space--1)" }), { scope: "range-slider" }),
  thumbSize: dimension("thumb-size", scale({ default: "var(--space--4)" }), { scope: "range-slider" }),
});
