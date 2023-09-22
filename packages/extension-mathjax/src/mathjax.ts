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
          const children = [...element.childNodes]
          const textNodes = children.filter(child => child.nodeType === 3)
          return textNodes.length > 0 ? textNodes[textNodes.length - 1].nodeValue : null;
        }
      }
    }
  },

  renderHTML({ HTMLAttributes }) {
    let equation = (HTMLAttributes.equation || '')
      .replaceAll(/\\begin{equation}\s*\n?\s*{/mg, '$')
      .replaceAll(/}\n?\s*\\end{equation}/mg, '$');
    if (equation.length > 0) {
      if (equation.charAt(0) !== '$') {
        equation = `$${equation}`
      }
      if (equation.charAt(equation.length - 1) !== '$') {
        equation = `${equation}$`
      }
    }
    return ['span', {}, equation];
  },
})

export { MathJaxNode };
export default MathJaxNode;
