/**
 * SurfaceProps
 * 
 * Dictates the visual "paint" of a container, including elevation and background.
 * 
 * @prop variant - The visual style (solid, outline, ghost, glass, subtle).
 * @prop radius - Corner rounding (sm, md, lg, pill, circle).
 * @prop shadow - Elevation depth mapping to z-axis design tokens.
 * @prop border - Border thickness.
 * @prop borderColor - Semantic or literal border color.
 * @prop bg - Background color.
 * @prop blur - Applies a CSS backdrop-filter blur. THOUGHT: A dedicated blur prop makes glassmorphism trivial to implement without writing custom CSS classes.
 * @prop themeForce - Forces a specific color scheme ("light" or "dark"). THOUGHT: Highly critical for sections that must remain dark (like a hero image with white text) even if the user switches their app to a light theme.
 * @prop hoverShadow - Elevation transformation on mouse hover.
 */
// export interface SurfaceProps extends BaseComponentProps {
//   variant?:     SurfaceVariant;
//   radius?:      SurfaceRadius;
//   shadow?:      SurfaceElevation;
//   border?:      SurfaceBorderWidth;
//   borderColor?: SurfaceColor;
//   bg?:          SurfaceColor;
//   blur?:        SurfaceBlur;
//   themeForce?:  "light" | "dark";
//   hoverShadow?: SurfaceElevation;
// }
