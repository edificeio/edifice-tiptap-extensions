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
    return [
      'div',
      this.options.HTMLAttributes,
      ['a', HTMLAttributes, HTMLAttributes.name],
    ];
  },

  addAttributes() {
    return {
      name: {
        default: null,
        parseHTML: (element) => {
          const el = element.getElementsByTagName('a');
          let text = '';
          const nodes = el[0].childNodes;
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].nodeType === 3) {
              text += nodes[i].nodeValue;
            }
          }
          return text;
        },

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
          let documentId = null;
          const elementHref = element.getElementsByTagName('a');
          if (elementHref[0].getAttribute('data-document-id')) {
            documentId = elementHref[0].getAttribute('data-document-id');
          } else {
            const href = elementHref[0].getAttribute('href');
            const pattern = /([^/]+$)/;
            documentId = href.match(pattern)[0];
          }

          return documentId;
        },
        renderHTML: (attributes) => {
          return { 'data-document-id': attributes.documentId };
        },
      },
      dataContentType: {
        default: null,
        parseHTML: (el) => {
          const elementHref = el.getElementsByTagName('a');
          return elementHref[0].getAttribute('data-content-type');
        },
        renderHTML: (attributes) => {
          return { 'data-content-type': attributes.dataContentType };
        },
      },
      thumbnails: {
        default: null,
        parseHTML: (el) => {
          const elementA = el.getElementsByTagName('a');
          const elementThumbnail =
            elementA[0].getElementsByTagName('thumbnail');
          const objectThumbnail = [];
          for (let i = 0; i < elementThumbnail.length; i++) {
            const objectVide = { resolution: '', idThumbnail: '' };
            objectVide.resolution =
              elementThumbnail[i].getAttribute('resolution');
            objectVide.idThumbnail = elementThumbnail[i].textContent;
            objectThumbnail.push(objectVide);
          }
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
