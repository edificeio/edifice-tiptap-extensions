import { Node, mergeAttributes } from '@tiptap/core';

export const FixedParagraph = Node.create({
  name: 'fixed-paragraph',
  key: 'fixed-paragraph',

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'fixed-paragraph',
      },
    };
  },

  group: 'block',
  isolating: true,
  selectable: true,

  parseHTML() {
    return [
      {
        tag: 'p[class^=fixed-paragraph]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'p',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      ' ', // Add a space to the end of the paragraph to make it selectable
    ];
  },
});

export default FixedParagraph;
