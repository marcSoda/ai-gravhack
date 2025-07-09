import type { FC } from "react";

interface HtmlRendererProps {
  html: string;
}

const HtmlRenderer: FC<HtmlRendererProps> = ({ html }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default HtmlRenderer;
