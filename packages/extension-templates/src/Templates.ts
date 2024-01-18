/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node } from '@tiptap/core';

export const Templates = Node.create({
  name: 'templates',
  group: 'block',
  inline: false,
  atom: false,
  selectable: true,

  parseHTML() {
    return [
      {
        tag: 'div[class^=row]',
      },
    ];
  },

  addAttributes() {
    return {
      columns: {
        default: [],
        parseHTML: (element) => {
          return Array.from(element.getElementsByTagName('article')).map(
            (article: any) => {
              const title = article.getElementsByTagName('h2')[0];  
              const img = article.getElementsByTagName('img')[0];
              let text;
              if(title) {
                article.removeChild(title);
                text = article;
              }
              return {
                title: title ? title.textContent : '',
                content: text ? text : '',
                image: img ? img.src : '',
              };
            },
          );
        },
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    const columns = HTMLAttributes.columns || [];
    const titles = columns.map((column) => {
      if (column.title) {
        return ['td', { class: 'title' }, ['h2', {}, column.title]];
      } else {
        return [
          'td',
          { class: 'image', rowspan: 2 },
          ['img', { src: column.image }],
        ];
      }
    });
    const cells = columns
      .filter((c) => !!c.content)
      .map((column) => {
        let children;
        if(column.content.children) {
          children = column.content.children;
        } else {
          column = [''];
        }
        return ['td', { class: 'text' }, ...children];
      });
    return [
      'table',
      { class: 'template' },
      ['tbody', {}, ['tr', {}, ...titles], ['tr', {}, ...cells]],
    ];
  },
});
