import { Mark } from '@tiptap/core';

export const Alerts = Mark.create({
  name: 'alerts',

  parseHTML() {
    return [
      {
        tag: 'p[class=info]',
      },
      {
        tag: 'p[class=warning]',
      },
    ];
  },
  addAttributes() {
    return {
      type: {
        default: 'info',
        parseHTML: (element) => element.getAttribute('class'),
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    const type = HTMLAttributes.type;
    return ['div', { class: type }, 0];
  },
});
