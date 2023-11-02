import Link from '@tiptap/extension-link';

/* Our own model of a link in a rich document. */
export type LinkerAttributes = {
  href: string | null;
  target: '_blank' | null;
  title: string | null;
  'data-id': string | null;
  'data-app-prefix': string | null;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    linker: {
      /**
       * Set a linker mark
       */
      setLinker: (attributes: LinkerAttributes) => ReturnType;
      /**
       * Unset a linker mark
       */
      unsetLinker: () => ReturnType;
    };
  }
}

/**
 * Extends `Link` extension.
 * Reproduces the legacy angularJs "linker" directive.
 *
 * Link to internal resources may have `title`, `data-id` and `data-app-prefix` attributes :
 * `<a href="/blog#/view/35fa4198-blog_id/5e654c71-article_id" data-app-prefix="blog" data-id="35fa4198-blog_id" target="_blank" title="Voir ce billet de blog" class="ng-scope">/blog#/view/35fa4198-57fe-45eb-94f4-a5e4defff305/5e654c71-1e61-4f84-86dc-6fcfaf33f513</a>`
 *
 * The `target` attribute has to be sanitized, so it is overriden.
 */
const Linker = Link.extend({
  /* Create a new extension by extending another. */
  name: 'linker',

  addOptions() {
    return {
      ...this.parent?.(),
      openOnClick: false,
    };
  },

  /* Manage `title`, `data-id` and `data-app-prefix` attributes. */
  addAttributes() {
    return {
      // Preserve attributes of parent extension...
      ...this.parent?.(),
      // ...then add or override the following :
      //------------------
      target: {
        default: this.options.HTMLAttributes.target,
        // Sanitize target value
        parseHTML: (element) =>
          element.getAttribute('target') !== '_blank' ? null : '_blank',
        renderHTML: (attributes) => ({
          target: attributes['target'],
        }),
      },
      title: {
        default: this.options.HTMLAttributes.title,
      },
      //------------------
      'data-id': {
        default: this.options.HTMLAttributes['data-id'],
      },
      //------------------
      'data-app-prefix': {
        default: this.options.HTMLAttributes['app-prefix'],
      },
    };
  },

  addCommands() {
    return {
      setLinker:
        (attributes) =>
        ({ chain }) =>
          chain()
            .setMark(this.name, attributes)
            .setMeta('preventAutolink', true)
            .run(),

      unsetLinker:
        () =>
        ({ chain }) =>
          chain()
            .unsetMark(this.name, { extendEmptyMarkRange: true })
            .setMeta('preventAutolink', true)
            .run(),
    };
  },
});

export { Linker };
export default Linker;
