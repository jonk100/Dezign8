# TreeView Planning & Design Decisions

The `TreeView` component is a hierarchical list, commonly used for file explorers or nested navigation. Because of strict ARIA guidelines regarding keyboard navigation (Arrow keys to expand/collapse/traverse), it requires some upfront decisions.

Take your time thinking about these! When you're ready, just let me know which options you prefer.

---

## 1. Selection Model

What is the primary use case for this TreeView?

- **Option A: Navigation (Single-Select)**
  Acts like a standard file explorer. You click a folder to expand it, or click a file to navigate to a new page or select that specific item. Only one item is "active" at a time.
  
- **Option B: Checkboxes (Multi-Select)**
  Acts like a complex form input. Every item has a checkbox. If you check a "Parent" folder, it automatically checks all the children inside it. If you uncheck one child, the Parent goes into an "indeterminate" state (a little dash instead of a check).

## 2. Composition Pattern

How do you want developers to write the code for this component? *(Note: We can also support both, like we did with the `Menu` component!)*

- **Option A: Fully Data-Driven (Recursive)**
  You pass in a massive array of nested objects. The component recursively builds the entire tree for you.
  ```astro
  <TreeView items={[{ id: 'docs', label: 'Docs', children: [{ id: 'readme', label: 'Readme.md' }] }]} />
  ```
  *Pros:* Very fast to write.<br>
  *Cons:* Hard to customize individual nodes (e.g., if you want a specific button next to just one folder).

- **Option B: Slot-Driven Composition**
  You manually write out the nested structure using components.
  ```astro
  <TreeView>
    <TreeItem label="Documents">
      <TreeItem label="Taxes.pdf" />
      <TreeItem label="Resumes" />
    </TreeItem>
  </TreeView>
  ```
  *Pros:* Infinite flexibility. Easy to add custom icons or badges to specific items.<br>
  *Cons:* Takes more code to write out deeply nested structures.

## 3. Data Loading (Optional Consideration)

Do you need to support **Lazy Loading**? 
Meaning, when a user clicks the "+" to expand a folder, it makes a network request to fetch the children before rendering them. Or will all the data always be available upfront? 

*(Recommendation: Assume static/upfront data for Version 1, and add lazy loading later if needed).*
