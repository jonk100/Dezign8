/**
 * LayoutProps
 * 
 * Defines the structural box model and flex/grid behaviors.
 * 
 * @prop direction - Sets the flex-direction (row, col, row-reverse, etc.).
 * @prop wrap - Controls whether flex items wrap onto multiple lines.
 * @prop justify - Aligns items along the main axis.
 * @prop align - Aligns items along the cross axis.
 * @prop gap - Uniform spacing between children, syncing with theme tokens.
 * @prop rowGap - Spacing exclusively between rows.
 * @prop colGap - Spacing exclusively between columns.
 * @prop padding - Inner spacing. THOUGHT: Accepting a record (e.g., { sm: "2", md: "4" }) allows native responsive design without needing CSS media queries inside the component.
 * @prop margin - Outer spacing.
 * @prop grow - Defines the flex-grow factor.
 * @prop shrink - Defines the flex-shrink factor.
 * @prop basis - Defines the default size of an element before remaining space is distributed.
 * @prop overflow - Controls how content that exceeds the box is handled (hidden, auto, scroll).
 * @prop ratio - Forces a specific aspect ratio natively. THOUGHT: Doing this at the layout level eliminates the need for a separate `<AspectRatio>` wrapper component for simple boxes.
 */
// export interface LayoutProps extends BaseComponentProps {
//   direction?:   LayoutDirection;
//   wrap?:        LayoutWrap;
//   justify?:     LayoutJustify;
//   align?:       LayoutAlign;
//   gap?:         LayoutSpacing;
//   rowGap?:      LayoutSpacing;
//   colGap?:      LayoutSpacing;
//   padding?:     LayoutSpacing | Record<Breakpoint, LayoutSpacing>;
//   margin?:      LayoutSpacing;
//   grow?:        number | boolean;
//   shrink?:      number | boolean;
//   basis?:       string;
//   overflow?:    LayoutOverflow;
//   ratio?:       number; 
// }