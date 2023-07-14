// @ts-nocheck

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { htmlToJson, jsonToHtml } from '@edifice-tiptap-extensions/transform';

import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import { Abbr } from '@edifice-tiptap-extensions/extension-abbr';

const html = '<p>Example <strong>Text</strong> <abbr>HTML</abbr></p>';

const json = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Example ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Text',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'abbr',
            },
          ],
          text: 'Text',
        },
      ],
    },
  ],
};

document.querySelector('#html-to-json')!.innerHTML = `<pre>
<code>${JSON.stringify(
  htmlToJson(html, [Document, Paragraph, Text, Abbr]),
  null,
  2,
)}</code>
</pre>`;

document.querySelector('#json-to-html')!.innerText = `${jsonToHtml(json, [
  Document,
  Paragraph,
  Text,
  Bold,
  Abbr,
])}`;
