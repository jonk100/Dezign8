// src/plugins/rehype-heading-level.mjs
/**
 * A simple visitor that walks the AST and injects a `level` property
 * into heading elements. This allows us to map all h1-h6 MDX tags
 * to a single `<Heading>` component that expects a `level={n}` prop.
 */
function visit(node, callback) {
  if (node.type === 'element') {
    callback(node);
  }
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      visit(child, callback);
    }
  }
}

export function rehypeHeadingLevel() {
  return (tree) => {
    visit(tree, (node) => {
      if (/^h[1-6]$/.test(node.tagName)) {
        node.properties = node.properties || {};
        node.properties.level = parseInt(node.tagName.charAt(1), 10);
      }
    });
  };
}
