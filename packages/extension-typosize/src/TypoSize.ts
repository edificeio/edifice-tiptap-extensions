import { mergeAttributes } from '@tiptap/core';
import Heading from '@tiptap/extension-heading';

export declare type TypoSizeLevel = 1 | 2 | 3 | 4 | 5 | 6;

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    typoSize: {
      /**
       * Change text size (normal size is level 5)
       */
      setTypoSize: (attributes: { level: TypoSizeLevel }) => ReturnType;
      /**
       * Toggle text size
       */
      toggleTypoSize: (attributes: { level: TypoSizeLevel }) => ReturnType;
      /**
       * Reset text size to normal
       */
      unsetTypoSize: () => ReturnType;
    };
  }
}

const TypoSize = Heading.extend({
  name: 'typoSize',

  parseHTML() {
    return this.options.levels.map((level: TypoSizeLevel) => {
      switch (level) {
        // Level 6 is small text, modeled as a <small> tag
        case 6:
          return {
            tag: `small`,
            attrs: { level },
          };
        // Level 5 is normal text, modeled as a <p> tag
        case 5:
          return {
            tag: `p`,
            attrs: { level },
          };
        // Other levels are <hX> tags
        default:
          return {
            tag: `h${level}`,
            attrs: { level },
          };
      }
    });
  },

  renderHTML({ node, HTMLAttributes }) {
    const level = this.options.levels.includes(node.attrs.level)
      ? node.attrs.level
      : this.options.levels[0];
    switch (level) {
      case 6:
        return [
          `small`,
          mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
          0,
        ];
      case 5:
        return [
          `p`,
          mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
          0,
        ];
      default:
        return [
          `h${level}`,
          mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
          0,
        ];
    }
  },

  addCommands() {
    return {
      setTypoSize:
        (attributes) =>
        ({ commands }) => {
          if (!this.options.levels.includes(attributes.level)) {
            return false;
          }

          return commands.setNode(this.name, attributes);
        },
      toggleTypoSize:
        (attributes) =>
        ({ commands }) => {
          if (!this.options.levels.includes(attributes.level)) {
            return false;
          }

          return commands.toggleNode(this.name, 'paragraph', attributes);
        },
      unsetTypoSize:
        () =>
        ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph', { level: 5 });
        },
    };
  },
});

export { TypoSize };
export default TypoSize;
