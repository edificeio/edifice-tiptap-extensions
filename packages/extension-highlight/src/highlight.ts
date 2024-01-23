import Highlight from '@tiptap/extension-highlight';

export const CustomHighlight = Highlight.extend({
  name: 'customHighlight',

  parseHTML() {
    return [
      {
        ...this.parent?.(),
        style: 'background-color',
        getAttrs: (style) => {
          return {
            color: style,
          };
        },
      },
    ];
  },
});
