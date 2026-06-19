/**
 * NavProps
 * 
 * Manages arrays of routes, active states, and history replacement logic.
 * 
 * @prop items - Array of navigation item data (labels, icons, routes).
 * @prop orientation - Determines if the nav renders horizontally or vertically.
 * @prop activeId - The ID or href of the currently active navigation item.
 * @prop onChange - Callback fired when a navigation item is selected.
 * @prop exactMatch - Determines if the active state requires an exact URL match or just a partial/sub-route match.
 * @prop replace - THOUGHT: If true, uses `history.replaceState` instead of `history.pushState`. Critical for things like Tabs where navigating shouldn't clog up the browser's "Back" button history.
 * @prop prefetch - THOUGHT: Optimizes Single Page App (SPA) performance by fetching the route's assets/data silently when the user hovers over the link.
 * @prop collapsible - Allows vertical navs (like sidebars) to collapse down to just their icons.
 */
// export interface NavProps extends BaseComponentProps {
//   items:        NavItemData[];
//   orientation?: "horizontal" | "vertical";
//   activeId?:    string;
//   onChange?:    (id: string) => void;
//   exactMatch?:  boolean;
//   replace?:     boolean;
//   prefetch?:    boolean;
//   collapsible?: boolean;
// }