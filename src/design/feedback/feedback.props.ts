/**
 * FeedbackProps
 * 
 * Communicates system status and transient states.
 * 
 * @prop variant - Semantic meaning (info, success, warning, danger).
 * @prop size - Visual scale of the feedback element.
 * @prop showIcon - Auto-injects the correct semantic icon based on the variant.
 * @prop closable - Renders an 'x' button to dismiss the element.
 * @prop onClose - Callback fired when dismissed.
 * @prop duration - THOUGHT: Auto-dismissal timer in milliseconds. Building this directly into the prop saves you from writing `setTimeout` wrappers manually every time you trigger a Toast.
 * @prop pulse - THOUGHT: Adds a subtle CSS animation loop. Perfect for drawing the eye to critical live indicators (e.g., "System Outage" dots or "Recording" badges).
 * @prop placement - Absolute positioning coordinates for badges/indicators relative to their parent containers.
 */
export interface FeedbackProps extends BaseComponentProps {
  variant?:   SemanticStatus;
  size?:      FeedbackSize;
  showIcon?:  boolean;
  closable?:  boolean;
  onClose?:   () => void;
  duration?:  number;
  pulse?:     boolean;
  placement?: FeedbackPlacement; 
}
