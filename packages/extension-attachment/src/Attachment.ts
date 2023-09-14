import { Node } from '@tiptap/core';

export interface AttachmentOptions {
  HTMLAttributes: Record<string, string>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    attachment: {
      setAttachment: (attachment) => ReturnType;
    };
  }
}

const Attachment = Node.create<AttachmentOptions>({
  name: 'attachments',
  content: '',
  marks: '',
  group: 'block',
  selectable: true,
  atom: true,
  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'attachments',
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[class=attachments]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', this.options.HTMLAttributes, ['a', HTMLAttributes]];
  },

  addAttributes() {
    return {
      name: {
        default: null,
        parseHTML: (element) => element.textContent,
        renderHTML: (attributes) => {
          return { name: attributes.name };
        },
      },
      href: {
        default: null,
        parseHTML: (el) => {
          const elementHref = el.getElementsByTagName('a');
          return elementHref[0].getAttribute('href');
        },
        renderHTML: (attrs) => ({ href: attrs.href }),
      },
      documentId: {
        default: null,
        parseHTML: (element) => {
          const elementHref = element.getElementsByTagName('a');
          const href = elementHref[0].getAttribute('href');
          const pattern = /([^/]+$)/;
          const documentId = href.match(pattern)[0];
          return documentId;
        },
        renderHTML: (attributes) => {
          return { 'data-document-id': attributes.documentId };
        },
      },
      dataContentType: {
        default: null,
        renderHTML: (attributes) => {
          return { 'data-content-type': attributes.dataContentType };
        },
      },
    };
  },

  addCommands() {
    return {
      setAttachment:
        (
          attrs = {
            dataContentType: '',
            name: '',
            documentId: '',
            href: '',
          },
        ) =>
        ({ chain }) => {
          return chain().insertContent({ type: this.name, attrs }).run();
        },
    };
  },
});

export { Attachment };
export default Attachment;
