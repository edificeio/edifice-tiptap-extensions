import { Node, mergeAttributes } from '@tiptap/core';

export const AlignDiv = Node.create({
  name: 'aligndiv',
  content: 'inline+',
  marks: '',
  group: 'block',

  inline: false,
  selectable: true,
  draggable: true,
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },
  parseHTML() {
    return [
      {
        tag: 'div[style*="text-align"]',
      },
    ];
  },
  addAttributes() {
    return {
      style: {
        default: 'text-align: left',
        parseHTML: (element) => {
          return element.getAttribute('style');
        },
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});
