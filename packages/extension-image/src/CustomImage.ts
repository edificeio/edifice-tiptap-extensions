import { mergeAttributes, nodeInputRule } from '@tiptap/core';

import Image from '@tiptap/extension-image';

export const IMAGE_INPUT_REGEX =
  /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

export interface CustomImageOptions {
  HTMLAttributes: Record<string, string>;
  sizes: string[];
}

interface AttributesProps {
  width: number | string;
  height: number | string;
  size: string;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customImage: {
      setAttributes: (options: AttributesProps) => ReturnType;
      setNewImage: (options: {
        src: string;
        alt?: string;
        title?: string;
      }) => ReturnType;
    };
  }
}

export const CustomImage = Image.extend<CustomImageOptions>({
  name: 'custom-image',
  draggable: true,
  selectable: true,

  addOptions() {
    return {
      ...this.parent?.(),
      sizes: ['small', 'medium', 'large'],
      HTMLAttributes: {
        class: 'custom-image',
      },
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      size: {
        default: 'medium',
        rendered: false,
      },
      alt: {
        renderHTML: (attributes) => {
          return {
            alt: attributes.alt,
          };
        },
        parseHTML: (element) => element.getAttribute('alt'),
      },
      title: {
        renderHTML: (attributes) => {
          return {
            title: attributes.title,
          };
        },
        parseHTML: (element) => element.getAttribute('title'),
      },
      width: {
        default: '350',
        renderHTML: (attributes) => {
          return {
            width: parseInt(attributes.width),
          };
        },
        parseHTML: (element) => element.getAttribute('width'),
      },
      height: {
        default: 'auto',
        renderHTML: (attributes) => {
          return {
            height: parseInt(attributes.height),
          };
        },
        parseHTML: (element) => element.getAttribute('height'),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]:not([src^="data:"])',
        getAttrs: (el: HTMLImageElement) => {
          const attr = {};
          // Check old content format and get the width from the parent element
          if (el.parentElement?.className.includes('image-container')) {
            if (el.parentElement.style.width) {
              attr['width'] = el.parentElement.style.width;
            }
          }
          return { ...attr, src: (el as HTMLImageElement).getAttribute('src') };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'img',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: IMAGE_INPUT_REGEX,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title] = match;

          return {
            src,
            alt,
            title,
          };
        },
      }),
    ];
  },

  addCommands() {
    return {
      setNewImage:
        (attrs) =>
        ({ tr, dispatch }) => {
          const { selection } = tr;
          const node = this.type.create(attrs);

          if (dispatch) {
            tr.replaceRangeWith(selection.from, selection.to, node);
          }

          return true;
        },
      setAttributes:
        (attributes) =>
        ({ tr, dispatch }) => {
          const { selection } = tr;

          const nodeAttrs = tr.doc.nodeAt(tr.selection.from);
          const options = {
            ...nodeAttrs.attrs,
            ...attributes,
          };
          const node = this.type.create(options);

          if (dispatch) {
            tr.replaceRangeWith(selection.from, selection.to, node);
          }

          return true;
        },
    };
  },
});
