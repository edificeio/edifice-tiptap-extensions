import TextAlign from '@tiptap/extension-text-align';

export const AlignContent = TextAlign.extend({
  name: 'alignContent',

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textAlign: {
            default: this.options.defaultAlignment,
            parseHTML: (element) => {
              element.style.textAlign || this.options.defaultAlignment;
            },
            renderHTML: (attributes) => {
              if (attributes.textAlign === this.options.defaultAlignment) {
                return {};
              }

              switch (attributes.textAlign) {
                case 'center':
                  return {
                    style:
                      'margin-left: auto; margin-right: auto; text-align: center',
                  };
                case 'left':
                  return { style: 'margin-right: auto; text-align: left' };
                case 'right':
                  return { style: 'margin-left: auto; text-align: right' };
                case 'justify':
                  return {
                    style:
                      'margin-left: auto; margin-right: auto; text-align: justify',
                  };
                default:
                  return {};
              }
            },
          },
        },
      },
    ];
  },
});
