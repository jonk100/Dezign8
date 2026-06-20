# Component Checklist

## Components by Usage

### Tier 1 - Ubiquitous (The Anatomy of the Web)

These are the foundational building blocks. Nearly every single web page, from a basic blog to a complex web app, uses these components.

- [x] 01. `Text` (typography) - 
- [x] 02. `Heading` (typography) -
- [x] 03. `Link` (nav) -
- [x] 04. `Image` (assets) - 
- [x] 05. `Button` (trigger) -
- [x] 06. `Box` (layout) - 
- [x] 07. `Container` (layout) -
- [x] 08. `Flex` (layout) -
- [x] 09. `Grid` (layout) -
- [x] 10. `Section` (layout) -
- [x] 11. `Header` (layout) - 
- [x] 12. `Footer` (layout) - 
- [x] 13. `List` (data) - 

### Tier 2 - Very Common (Standard Web Design)

These components are standard for forms, typical data display, and basic navigation. You will find them on the vast majority of commercial and informational websites.

- [o] 16. `Input` (form) - 
- [ ] 17. `Label` (typography) - Form field label. Associates with a control via `for`. | `for`, `required`, `size`, `weight`, `uppercase` |
- [ ] 18. `Checkbox` (form) - Single boolean checkbox with label. | `checked`, `defaultChecked`, `indeterminate`, `value`, `label` |
- [ ] 19. `Radio` (form) - Single radio button. Used inside `RadioGroup`. | `value`, `label`, `checked` |
- [ ] 20. `Select` (form) - Dropdown for selecting one option from a list. | `value`, `options`, `placeholder`, `size`, `invalid` |
- [ ] 21. `Textarea` (form) - 
- [ ] 22. `Search` (form) - Search input with clear button and optional debounce. | `value`, `onSearch`, `debounce`, `placeholder`, `size` |
- [ ] 23. `Navbar` (nav) - 
- [ ] 24. `Menu` (nav) - 
- [ ] 25. `Card` (surface) - 
- [ ] 26. `Separator` (layout) - 
- [ ] 27. `Table` (data) - 

### Tier 3 - Common (Modern Web Applications)

This tier represents the shift from static websites to interactive web applications. If a site requires a user to log in or interact with an interface, these components appear frequently.

- [ ] 28. `Stack` (layout) - 
- [ ] 29. `Spacer, ` (layout) - 
- [ ] 30. `Center` (layout) - 
- [ ] 31. `Panel` (surface) - 
- [ ] 32. `Caption` (typography) - 
- [ ] 33. `Field` (form) - 
- [ ] 34. `InputGroup` (form) - 
- [ ] 35. `RadioGroup` (form) - 
- [ ] 36. `ButtonGroup` (form) - 
- [ ] 37. `Modal` (overlay) - 
- [ ] 38. `Tabs` (nav) - 
- [ ] 39. `DropdownMenu` (overlay) - 
- [ ] 40. `Popover` (overlay) - 
- [ ] 41. `Tooltip` (overlay) - 
- [ ] 42. `Breadcrumbs` (nav) - 
- [ ] 43. `Pagination` (nav) - 
- [ ] 44. `Avatar` (assets) - 
- [ ] 45. `Badge` (feedback) - 
- [ ] 46. `Spinner` (feedback) - 
- [ ] 47. `Video` (assets) - 
- [ ] 48. `banner` (feedback) - 
- [ ] 49. `Feedback` (feedback) -

### Tier 4: Specialized (Dashboards & Complex Forms)

These components are used heavily in SaaS (Software as a Service) platforms, admin dashboards, and e-commerce sites, but you won't typically see them on simple landing pages or blogs.

- [ ] 50. `Switch` (form) - Toggle switch for binary on/off state. | `checked`, `defaultChecked`, `onChange`, `size`, `label` |
- [ ] 51. `Slider` (form) - 
- [ ] 52. `RangeSlider` (form) - 
- [ ] 53. `DatePicker` (form) - 
- [ ] 54. `Combobox` (form) - 
- [ ] 55. `FileUpload` (form) - 
- [ ] 56. `Stat` (data) - 
- [ ] 57. `Metric` (data) - 
- [ ] 58. `BarChart` (data) - 
- [ ] 59. `PieChart` (data) - 
- [ ] 60. `Timeline` (data) - 
- [ ] 61. `Drawer` (overlay) - 
- [ ] 62. `Sheet` (overlay) - 
- [ ] 63. `Backdrop` (overlay) - 
- [ ] 64. `Toast` (feedback) - 
- [ ] 65. `ToastRegion` (feedback) - 
- [ ] 66. `AlertDialog` (overlay) - 
- [ ] 67. `Skeleton` (feedback) - 
- [ ] 68. `Progress` (feedback) - 
- [ ] 69. `EmptyState` (feedback) - 
- [ ] 70. `Carousel` (data) - 
- [ ] 71. `Gallery` (data) - 
- [o] 72. `ThemeToggle` (trigger) -

### Tier 5: Niche (Highly Specific Use Cases)

These components are highly specialized. They are only used when a specific feature demands them (like audio editing, specialized data picking, or niche layout styles).

- [ ] 73. `ColorPicker` (form) - 
- [ ] 74. `TimePicker` (form) - 
- [ ] 75. `Multiselect` (form) - 
- [ ] 76. `SegmentedControl` (form) - 
- [ ] 77. `VisuallyHidden` (accessibility) - 
- [ ] 78. `SkipLink` (nav) - 
- [ ] 79. `Portal` (overlay) - 
- [ ] 80. `CommandPalette` (overlay) - 
- [ ] 81. `Kbd` (typography) - 
- [ ] 82. `Code` (typography) - 
- [ ] 83. `BentoGrid` (layout) - 
- [ ] 84. `BentoCell` (layout) - 
- [ ] 85. `AspectRatio` (layout) - 
- [ ] 86. `Screen` (layout) - 
- [ ] 87. `Columns` (layout) - 
- [ ] 88. `Inline` (layout) - 
- [ ] 89. `Well` (layout) - 
- [ ] 90. `Tile` (layout) - 
- [ ] 91. `Paper` (layout) - 
- [ ] 92. `Frame` (layout) - 
- [ ] 93. `TreeView` (data) - 
- [ ] 94. `Feed` (data) - 
- [ ] 95. `Event` (data) - 
- [ ] 96. `ResultItem` (data) - 
- [ ] 97. `KeyValue` (data) - 
- [ ] 98. `KeyValueList` (data) - 
- [ ] 99. `DescriptionList` (data) - 
- [ ] 100. `Sparkline` (data) - 
- [ ] 101. `Indicator` (feedback) - 
- [ ] 102. `Dot` (feedback) - 
- [ ] 103. `Chip` (feedback) - 
- [ ] 104. `Tag` (feedback) - 
- [ ] 105. `AvatarGroup` (assets) - 
- [ ] 106. `Waveform` (assets) - 
- [ ] 107. `Cropper` (assets) - 
- [ ] 108. `Lightbox` (assets) - 
- [ ] 109. `Audio` (assets) - 
- [ ] 110. `FilePreview` (assets) - 
- [ ] 111. `GalleryItem` (assets) - 
- [ ] 112. `Prose` (typography) - 
- [ ] 113. `Quote` (typography) - 
- [ ] 114. `Toolbar` (nav) - 
- [ ] 115. `Stepper` (nav) - 
- [ ] 116. `ContextMenu` (overlay) -