/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node } from '@tiptap/core';


const MathJaxNode = Node.create({
  name: 'mathjaxnode',
  group: 'inline',
  inline: true,
  atom: false,
  selectable: true,


  parseHTML() {
    return [
      {
        tag: 'mathjax',
      },
    ];
  },

  addAttributes() {
    return {
      equation: {
        default: null,
        parseHTML: (element: any) => {
          const equationNode = [...element.childNodes]
            .filter(child => child.nodeType === 3)
            .filter(child => child.nodeValue.indexOf('begin{equation') >= 0)[0]
          if (equationNode) {
            return equationNode.nodeValue
          } else {
            return null;
          }
        }
      }
    }
  },

  renderHTML({ HTMLAttributes }) {
    const equation = (HTMLAttributes.equation || '')
      .replaceAll(/\\begin{equation}\s*\n?\s*{/mg, '$')
      .replaceAll(/}\n?\s*\\end{equation}/mg, '$');
    return ['span', {}, equation];
  },
})

export { MathJaxNode };
export default MathJaxNode;
