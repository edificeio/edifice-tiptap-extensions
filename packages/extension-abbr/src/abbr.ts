import { Mark, mergeAttributes } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    abbr: {
      /**
       * Set a video node
       */
      setAbbr: (src: string) => ReturnType;
      /**
       * Toggle a video
       */
      toggleAbbr: (src: string) => ReturnType;
    };
  }
}

const Abbr = Mark.create({
  name: 'abbr',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'abbr',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'abbr',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setAbbr:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleAbbr:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
    };
  },
});

export { Abbr };
export default Abbr;
