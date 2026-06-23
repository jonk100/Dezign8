/**
 * src/design/icons/index.ts
 * AUTO-GENERATED FILE
 * DO NOT EDIT MANUALLY
 *
 * Design System Icon Registry
 *
 * This file defines the public icon contract for the design system.
 *
 * Architecture:
 * - SVG files are stored in /src/design/shared/icons as the source of truth
 * Each SVG is transformed into an importable Astro SVG component
 * - Internal component names are prefixed with "Icon" to avoid collision
 *   with UI components (e.g. CardHeader, TableRow)
 * - Public API uses kebab-case string identifiers
 *
 * Layers:
 * - UI Components:       CardHeader, TableRow, ButtonGroup
 * - Icon Components:     IconCardHeader, IconTableRow, IconButtonGroup
 * - Public Icon API:     'card-header', 'table-row', 'button-group'
 *
 * Usage:
 * <Svg name="card-header" />
 *
 * Type Safety:
 * - SvgName is derived from the registry keys
 * - Invalid icon names fail at compile time
 * Rules:
 * - Do not manually edit this file
 * - Treat this file as read-only output of the icon generation process
 * - Add new icons only by adding SVG files to /src/design/shared/icons
 * - Run the generator script to update this registry
 */

import type { SvgComponent } from 'astro/types';

import IconAlertCircle from './alert-circle.svg';
import IconAlertDialog from './alert-dialog.svg';
import IconAlertTriangle from './alert-triangle.svg';
import IconAlert from './alert.svg';
import IconArrowLeft from './arrow-left.svg';
import IconArrowUpRight from './arrow-up-right.svg';
import IconAstro from './astro.svg';
import IconAvatar from './avatar.svg';
import IconBadgeGroup from './badge-group.svg';
import IconBadge from './badge.svg';
import IconBentoCell from './bento-cell.svg';
import IconBentoGrid from './bento-grid.svg';
import IconBold from './bold.svg';
import IconBox from './box.svg';
import IconButtonGroup from './button-group.svg';
import IconButton from './button.svg';
import IconCallout from './callout.svg';
import IconCardContent from './card-content.svg';
import IconCardFooter from './card-footer.svg';
import IconCardHeader from './card-header.svg';
import IconCard from './card.svg';
import IconCenter from './center.svg';
import IconCheckCircle from './check-circle.svg';
import IconCheck from './check.svg';
import IconCheckbox from './checkbox.svg';
import IconChevronDown from './chevron-down.svg';
import IconChevronLeft from './chevron-left.svg';
import IconChevronRight from './chevron-right.svg';
import IconChevronUp from './chevron-up.svg';
import IconCode from './code.svg';
import IconColumns from './columns.svg';
import IconCombobox from './combobox.svg';
import IconContainer from './container.svg';
import IconDatePicker from './date-picker.svg';
import IconDebug from './debug.svg';
import IconDescriptionList from './description-list.svg';
import IconDivider from './divider.svg';
import IconEvent from './event.svg';
import IconFrame from './frame.svg';
import IconGrid from './grid.svg';
import IconHelperText from './helper-text.svg';
import IconHome from './home.svg';
import IconIcon from './icon.svg';
import IconImage from './image.svg';
import IconInfo from './info.svg';
import IconInline from './inline.svg';
import IconInputGroup from './input-group.svg';
import IconInput from './input.svg';
import IconItalic from './italic.svg';
import IconJavascript from './javascript.svg';
import IconKeyValueList from './key-value-list.svg';
import IconLink from './link.svg';
import IconList from './list.svg';
import IconMenu from './menu.svg';
import IconModal from './modal.svg';
import IconNodeJs from './node-js.svg';
import IconPaper from './paper.svg';
import IconPlayground from './playground.svg';
import IconPopover from './popover.svg';
import IconRadioGroup from './radio-group.svg';
import IconRadio from './radio.svg';
import IconSearch from './search.svg';
import IconSectionLabel from './section-label.svg';
import IconSelect from './select.svg';
import IconSheet from './sheet.svg';
import IconSkeleton from './skeleton.svg';
import IconSpacer from './spacer.svg';
import IconSparkline from './sparkline.svg';
import IconSpinnerThree from './spinner-three.svg';
import IconSpinnerTwo from './spinner-two.svg';
import IconSpinner from './spinner.svg';
import IconStack from './stack.svg';
import IconStrikethrough from './strikethrough.svg';
import IconSwitch from './switch.svg';
import IconTableCell from './table-cell.svg';
import IconTableHead from './table-head.svg';
import IconTableRow from './table-row.svg';
import IconTable from './table.svg';
import IconTailwind from './tailwind.svg';
import IconTechStackList from './tech-stack-list.svg';
import IconText from './text.svg';
import IconTimeline from './timeline.svg';
import IconTooltip from './tooltip.svg';
import IconTreeView from './tree-view.svg';
import IconTypescript from './typescript.svg';
import IconUnderline from './underline.svg';
import IconX from './x.svg';
import IconZap from './zap.svg';

export const icons = {
  'alert-circle': IconAlertCircle,
  'alert-dialog': IconAlertDialog,
  'alert-triangle': IconAlertTriangle,
  'alert': IconAlert,
  'arrow-left': IconArrowLeft,
  'arrow-up-right': IconArrowUpRight,
  'astro': IconAstro,
  'avatar': IconAvatar,
  'badge-group': IconBadgeGroup,
  'badge': IconBadge,
  'bento-cell': IconBentoCell,
  'bento-grid': IconBentoGrid,
  'bold': IconBold,
  'box': IconBox,
  'button-group': IconButtonGroup,
  'button': IconButton,
  'callout': IconCallout,
  'card-content': IconCardContent,
  'card-footer': IconCardFooter,
  'card-header': IconCardHeader,
  'card': IconCard,
  'center': IconCenter,
  'check-circle': IconCheckCircle,
  'check': IconCheck,
  'checkbox': IconCheckbox,
  'chevron-down': IconChevronDown,
  'chevron-left': IconChevronLeft,
  'chevron-right': IconChevronRight,
  'chevron-up': IconChevronUp,
  'code': IconCode,
  'columns': IconColumns,
  'combobox': IconCombobox,
  'container': IconContainer,
  'date-picker': IconDatePicker,
  'debug': IconDebug,
  'description-list': IconDescriptionList,
  'divider': IconDivider,
  'event': IconEvent,
  'frame': IconFrame,
  'grid': IconGrid,
  'helper-text': IconHelperText,
  'home': IconHome,
  'icon': IconIcon,
  'image': IconImage,
  'info': IconInfo,
  'inline': IconInline,
  'input-group': IconInputGroup,
  'input': IconInput,
  'italic': IconItalic,
  'javascript': IconJavascript,
  'key-value-list': IconKeyValueList,
  'link': IconLink,
  'list': IconList,
  'menu': IconMenu,
  'modal': IconModal,
  'node-js': IconNodeJs,
  'paper': IconPaper,
  'playground': IconPlayground,
  'popover': IconPopover,
  'radio-group': IconRadioGroup,
  'radio': IconRadio,
  'search': IconSearch,
  'section-label': IconSectionLabel,
  'select': IconSelect,
  'sheet': IconSheet,
  'skeleton': IconSkeleton,
  'spacer': IconSpacer,
  'sparkline': IconSparkline,
  'spinner-three': IconSpinnerThree,
  'spinner-two': IconSpinnerTwo,
  'spinner': IconSpinner,
  'stack': IconStack,
  'strikethrough': IconStrikethrough,
  'switch': IconSwitch,
  'table-cell': IconTableCell,
  'table-head': IconTableHead,
  'table-row': IconTableRow,
  'table': IconTable,
  'tailwind': IconTailwind,
  'tech-stack-list': IconTechStackList,
  'text': IconText,
  'timeline': IconTimeline,
  'tooltip': IconTooltip,
  'tree-view': IconTreeView,
  'typescript': IconTypescript,
  'underline': IconUnderline,
  'x': IconX,
  'zap': IconZap
} satisfies Record<string, SvgComponent>;

export type SvgName = keyof typeof icons;
