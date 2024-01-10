/* eslint-disable @typescript-eslint/no-explicit-any */
import { mergeAttributes, Node, nodeInputRule } from '@tiptap/core';

export interface VideoOptions {
  url: string;
  width: number;
  height: number;
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      /**
       * Set a video node
       */
      setVideo: (
        id: string,
        src: string,
        isCaptation: boolean,
        width?: number,
        height?: number,
        controls?: boolean,
        controlslist?: string,
      ) => ReturnType;
      /**
       * Toggle a video
       */
      toggleVideo: (src: string) => ReturnType;
    };
  }
}

const VIDEO_INPUT_REGEX = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

const Video = Node.create({
  name: 'video',
  group: 'block',
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (el: any) => (el as HTMLSpanElement).getAttribute('src'),
        renderHTML: (attrs: any) => ({ src: attrs.src }),
      },
      controls: {
        default: true,
        parseHTML: (el: any) => {
          if ((el as HTMLSpanElement).getAttribute('controls')) {
            return (el as HTMLSpanElement).getAttribute('controls');
          } else if ((el as HTMLSpanElement).hasAttribute('controls')) {
            return true;
          } else {
            return false;
          }
        },
        renderHTML: (attrs: any) => ({ controls: attrs.controls }),
      },
      documentId: {
        default: '',
        renderHTML: (attributes: any) => {
          return { 'data-document-id': attributes.documentId };
        },
        parseHTML: (element: any) => element.getAttribute('data-document-id'),
      },
      isCaptation: {
        default: false,
        renderHTML: (attributes: any) => {
          return { 'data-document-is-captation': attributes.isCaptation };
        },
        parseHTML: (element: any) =>
          element.getAttribute('data-document-is-captation'),
      },
      videoResolution: {
        default: '404x720',
        renderHTML: (attributes: any) => {
          return { 'data-video-resolution': attributes.videoResolution };
        },
        parseHTML: (element: any) =>
          element.getAttribute('data-video-resolution'),
      },
      width: {
        renderHTML: (attributes: any) => {
          return {
            width: parseInt(attributes.width),
          };
        },
        parseHTML: (element) => element.getAttribute('width'),
      },
      height: {
        renderHTML: (attributes: any) => {
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
        tag: 'video',
        getAttrs: (el: any) => ({
          src: (el as HTMLVideoElement).getAttribute('src'),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['video', mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      setVideo:
        (
          id: string,
          src: string,
          isCaptation: boolean,
          width = 350,
          height = 219,
          controls = true,
          controlslist = 'nodownload',
        ) =>
        ({ editor }) => {
          return editor.commands.insertContentAt(
            editor.view.state.selection,
            `<video 
              controls="${controls}" 
              controlslist="${controlslist}"
              src="${src}" 
              width="${width}"
              height="${height}"
              data-document-id="${id}" 
              data-document-is-captation="${isCaptation}"
              data-video-resolution="${width}x${height}" />`,
          );
        },

      toggleVideo:
        () =>
        ({ commands }) =>
          commands.toggleNode(this.name, 'paragraph'),
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: VIDEO_INPUT_REGEX,
        type: this.type,
        getAttributes: (match) => {
          const [, , src] = match;

          return { src };
        },
      }),
    ];
  },
});

export { Video };
export default Video;
