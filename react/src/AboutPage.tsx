import { observer } from "mobx-react-lite";
import React from "react";
import showdown from "showdown";

export interface AboutPageProps {}

const AboutPage: React.FunctionComponent<Readonly<AboutPageProps>> = () => {
  const markdownToHtml = (markdown: string) => {
    const converter = new showdown.Converter();
    return converter.makeHtml(markdown);
  };

  const aboutPageMarkdown = `
  **Microsoft's Azure AI Foundry Model**
<br/><br/>
- *Microsoft's Foundry Model* is an LLM (Large language Model) based off OpenAI's ChatGPT (Chat Generative Pre-trained Transformer)
- User inputs are answered based on an easily searchable Index trained on "private data," in this case, Shadowbase Manuals, Softdocs (Software Documentation), Training, and Publications.
- This LLM leverages a *Retrieval Augmented Generation (RAG)*, "a pattern used in AI that uses an LLM to generate answers with your own data." (not just OpenAI's ChatGPT, which is trained solely on publicly available information on the Internet).

  <br/>

**Resource Augmented Generation (RAG)**
<br/>
*RAG is a pattern that uses your data with an LLM to generate answers specific to your data.*
<br/><br/>
- When a user asks a question, the data store is searched based on user input.
- The user question is then combined with the matching results and sent to the LLM using a prompt (explicit instructions to an AI or machine learning model) to generate the desired answer.
  <br/><br/>![rag-pattern](https://storage.basecamp.com/bc4-production-blobs/bd7db29a-5d91-11f0-8f3b-0242ac120005?response-content-disposition=inline%3B%20filename%3D%22rag-pattern.png%22%3B%20filename%2A%3DUTF-8%27%27rag-pattern.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=PSFBSAZROHOHENDNACPGDOPOONMFHLBHNMKOEBGFNK%2F20250710%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250710T145147Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=8210d46386f0f07866a6c09b4be6421fd3fece959cdf625e58ee0ce2b47093fa)

  <br/>
  
**Index**
<br/>
*An index "is a data store that allows you to search data efficiently."*
<br/><br/>
- An index can be optimized for LLMs by creating vectors (text data converted to number sequences using an embedding model).
- It defines what models the index can use to search, defines vectors, and the embedding model for those vectors.
- A good index usually has efficient search capabilities like keyword searches, semantic searches, vector searches, or a combination of these features.
  Zoom rag-pattern-with-index.png
  <br/><br/>![rag-pattern-with-index](https://storage.basecamp.com/bc4-production-blobs/31d7d1ca-5d92-11f0-9446-0242ac120005?response-content-disposition=inline%3B%20filename%3D%22rag-pattern-with-index.png%22%3B%20filename%2A%3DUTF-8%27%27rag-pattern-with-index.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=PSFBSAZROHOHENDNACPGDOPOONMFHLBHNMKOEBGFNK%2F20250710%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250710T145247Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=c2d48bd543148273696ecc182f598d14454ae306e9a21f85c04b2872f0359eb8)

<br/>
Source: https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/retrieval-augmented-generation
`;

  return (
    <div
      style={{ padding: "20px 40px 0 40px" }}
      dangerouslySetInnerHTML={{ __html: markdownToHtml(aboutPageMarkdown) }}
    />
  );
};

export default observer(AboutPage);
