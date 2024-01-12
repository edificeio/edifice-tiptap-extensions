/* eslint-disable @typescript-eslint/no-explicit-any */
import { mergeAttributes, Node } from '@tiptap/core';

export interface AudioOptions {
  url: string;
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    audio: {
      /**
       * Set a audio node
       */
      setAudio: (id: string, src: string) => ReturnType;
    };
  }
}

export const Audio = Node.create({
  name: 'audio',

  group: 'block',

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (el: any) => (el as HTMLSpanElement).getAttribute('src'),
        renderHTML: (attrs: any) => ({ src: attrs.src }),
      },
      documentId: {
        default: '',
        renderHTML: (attributes: any) => {
          return { 'data-document-id': attributes.documentId };
        },
        parseHTML: (element: any) => element.getAttribute('data-document-id'),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'audio',
        getAttrs: (el: any) => ({
          src: (el as HTMLAudioElement).getAttribute('src'),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['audio', mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      setAudio:
        (id: string, src: string) =>
        ({ editor }) => {
          return editor.commands.insertContentAt(
            editor.view.state.selection,
            `<audio 
              src="${src}" 
              controls preload="none"
              data-document-id="${id}"></audio>`,
          );
        },
    };
  },
});
