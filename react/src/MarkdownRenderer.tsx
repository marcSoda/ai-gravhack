import { type FC, useMemo } from "react";
import showdown from "showdown";

interface MarkdownRendererProps {
  markdown: string;
}

export const markdownToHtml = (markdown: string) => {
  const converter = useMemo(() => new showdown.Converter(), []);
  return useMemo(() => converter.makeHtml(markdown), [converter, markdown]);
};
const MarkdownRenderer: FC<MarkdownRendererProps> = ({ markdown }) => {
  const html = markdownToHtml(markdown);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default MarkdownRenderer;
