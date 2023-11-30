import { mergeAttributes, nodeInputRule } from '@tiptap/core';

import Image from '@tiptap/extension-image';

export const IMAGE_INPUT_REGEX =
  /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

export interface ImageOptions {
  HTMLAttributes: Record<string, string>;
  sizes: string[];
}

const ImageExtend = Image.extend<ImageOptions>({
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
      href: {
        default: null,
        renderHTML: (attributes) => {
          return {
            href: parseInt(attributes.href),
          };
        },
        parseHTML: (element) => element.getAttribute('href'),
      },
      'media-type': {
        default: null,
        renderHTML: (attributes) => {
          return {
            ['media-type']: parseInt(attributes['media-type']),
          };
        },
        parseHTML: (element) => element.getAttribute('media-type'),
      },
      alt: {
        default: null,
        renderHTML: (attributes) => {
          return {
            alt: parseInt(attributes.alt),
          };
        },
        parseHTML: (element) => element.getAttribute('alt'),
      },
      title: {
        default: null,
        renderHTML: (attributes) => {
          return {
            title: parseInt(attributes.title),
          };
        },
        parseHTML: (element) => element.getAttribute('title'),
      },
      width: {
        default: '100%',
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
            height: parseInt(attributes.width),
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
        getAttrs: (el) => ({
          src: (el as HTMLImageElement).getAttribute('src'),
          'media-type': 'img',
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { 'media-type': mediaType } = HTMLAttributes;

    if (mediaType === 'img') {
      return [
        'img',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      ];
    }

    if (!mediaType)
      console.error(
        'TiptapMediaExtension-renderHTML method: Media Type not set, going default with image',
      );

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
            'media-type': 'img',
          };
        },
      }),
    ];
  },

  addCommands() {
    return {
      ...this.parent?.(),
      /* setImage:
        (attrs) =>
        ({ tr, dispatch }) => {
          const { selection } = tr;
          const node = this.type.create(attrs);

          if (dispatch) {
            tr.replaceRangeWith(selection.from, selection.to, node);
          }

          return true;
        }, */
      setAttributes:
        (attributes) =>
        ({ tr, dispatch }) => {
          const { selection } = tr;
          const options = {
            ...selection.node.attrs,
            ...attributes,
          };
          const node = this.type.create(options);

          if (dispatch) {
            tr.replaceRangeWith(selection.from, selection.to, node);
          }
        },
    };
  },
});

export { ImageExtend };
export default ImageExtend;
