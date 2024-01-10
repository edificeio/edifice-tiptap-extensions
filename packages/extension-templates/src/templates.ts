/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node } from '@tiptap/core';

const TemplatesNode = Node.create({
  name: 'templatesnode',
  group: 'inline',
  inline: true,
  atom: false,
  selectable: true,

  parseHTML() {
    return [
      {
        tag: 'div[class=row]'
      },
    ];
  },

  addAttributes() {
    return {
      columns: {
        default: [],
        parseHTML: (element) => {
          return Array.from(element.getElementsByTagName("article")).map((article: any) => {
            const title = article.getElementsByTagName("h2")[0];
            const text = article.getElementsByTagName("p")[0];
            const img = article.getElementsByTagName("img")[0];
            return {
              title: title ? title.textContent : "",
              content: text ? text.textContent : "",
              image: img ? img.src : ""
            };
          });
        }
      }
    };
  },

  renderHTML({ HTMLAttributes }) {
    const columns = HTMLAttributes.columns || [];
    const titles = columns.map((column) => {
      return ["th", {}, column.title]
    });
    const cells = columns.map((column) => {
      if(column.image) {
        return ["td", {}, ["img", { src: column.image }]]
      } else {
        return ["td", {}, column.content]
      }
    });
    return [
      "table", {},
      ["thead", {}, ["tr", {}, ...titles ]],
      ["tbody", {}, ["tr", {}, ...cells ]]
    ];
  },
});

export { TemplatesNode };
export default TemplatesNode;
