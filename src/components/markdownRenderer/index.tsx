import ReactMarkdown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';

import './styles.css'
import { coldarkCold, coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../theme/theme-provider';

interface MarkdownRendererProps {
  content: string; 
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const { theme } = useTheme();

  const components: Components = {
    h1: ({ children }) => <h1 className="text-3xl text-primary font-bold mt-4 mb-2">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl text-description font-semibold mt-8 mb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl text-description font-semibold mt-4 mb-2">{children}</h3>,
    p: ({ children }) => <p className="text-sm text-description mt-2 mb-2">{children}</p>,
    a: ({ children, href }) => (
      <a href={href} className="text-blue underline">
        {children}
      </a>
    ),
    ul: ({ children }) => <ul className="list-disc text-description list-inside pl-5">{children}</ul>,
    li: ({ children }) => <li className="text-sm text-description mt-1">{children}</li>,
    ol: ({ children }) => <ol className="list-decimal text-description list-inside pl-5">{children}</ol>,
    hr: () => (
      <hr className="border-t-2 border-description my-8" />
    ),
    pre: ({ children }) => (
      <div>
        {children}
      </div>
    ),
    code: ({ children, className }) => {
      const language = className ? className.replace('language-', '') : '';
      return (
        <SyntaxHighlighter language={language} style={ theme === 'dark' ? coldarkDark : coldarkCold } className="custom-syntax-highlighter" >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      );
    }
  };

  return (
    <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  );
};

