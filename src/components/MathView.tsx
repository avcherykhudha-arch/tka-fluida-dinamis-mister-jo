import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math?: string;
  text?: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, text, block = false, className = '' }) => {
  const content = useMemo(() => {
    // If explicit math prop is provided
    if (math) {
      try {
        const cleanMath = math.replace(/^\$\$|\$\$$|^\\$|\\$$/g, '').trim();
        const html = katex.renderToString(cleanMath, {
          displayMode: block,
          throwOnError: false,
          output: 'htmlAndMathml',
        });
        return { __html: html, isHtml: true };
      } catch {
        return { text: math, isHtml: false };
      }
    }

    // If text prop is provided, parse inline $...$ and block $$...$$
    if (text) {
      try {
        // Tokenize into plain text and math delimiters ($$...$$ and $...$)
        // This ensures KaTeX SVG path commands with internal newlines are NEVER corrupted by <br /> injection.
        let result = '';
        let lastIndex = 0;
        const mathRegex = /(\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$)/g;
        let match: RegExpExecArray | null;

        while ((match = mathRegex.exec(text)) !== null) {
          const plainText = text.slice(lastIndex, match.index);
          if (plainText) {
            result += plainText.replace(/\n/g, '<br />');
          }

          const rawMath = match[0];
          if (rawMath.startsWith('$$') && rawMath.endsWith('$$')) {
            const equation = rawMath.slice(2, -2).trim();
            try {
              result += `<div class="my-3 text-center overflow-x-auto">${katex.renderToString(equation, {
                displayMode: true,
                throwOnError: false,
              })}</div>`;
            } catch {
              result += rawMath;
            }
          } else if (rawMath.startsWith('$') && rawMath.endsWith('$')) {
            const equation = rawMath.slice(1, -1).trim();
            try {
              result += katex.renderToString(equation, {
                displayMode: false,
                throwOnError: false,
              });
            } catch {
              result += rawMath;
            }
          }

          lastIndex = match.index + match[0].length;
        }

        const remaining = text.slice(lastIndex);
        if (remaining) {
          result += remaining.replace(/\n/g, '<br />');
        }

        return { __html: result, isHtml: true };
      } catch {
        return { text, isHtml: false };
      }
    }

    return { text: '', isHtml: false };
  }, [math, text, block]);

  if (content.isHtml) {
    return (
      <span
        className={`math-rendered ${block ? 'block my-2 text-center' : 'inline'} ${className}`}
        dangerouslySetInnerHTML={{ __html: content.__html || '' }}
      />
    );
  }

  return <span className={className}>{content.text}</span>;
};

