import { observer } from "mobx-react-lite";
import React from "react";

export interface AboutPageProps {}

const AboutPage: React.FunctionComponent<Readonly<AboutPageProps>> = () => {
  return (
    <div>
      <h1>OpenAI's Azure AI Foundry Model</h1>
      <ul>
        <li>
          <em>OpenAI's Foundry Model</em> is an LLM (Large language Model) based
          off OpenAI's ChatGPT (Chat Generative Pre-trained Transformer)
        </li>
        <li>
          User inputs are answered based on an easily searchable <em>Index</em>{" "}
          trained on "<em>private data</em>," in this case, Shadowbase Manuals,
          Softdocs (Software Documentation), Training, and Publications.
        </li>
        <li>
          This LLM leverages a <em>Retrieval Augmented Generation (RAG)</em>, "a
          pattern used in AI that uses an LLM to generate answers with your own
          data." (not just OpenAI's ChatGPT, which is trained solely on publicly
          available information on the Internet).
        </li>
      </ul>
      <div>
        <strong>Resource Augmented Generation (RAG)</strong>
        <br /> RAG is a pattern that uses your data with an LLM to generate
        answers specific to your data.&nbsp;
      </div>
      <ul>
        <li>
          When a user asks a question, the data store is searched based on user
          input.&nbsp;
        </li>
        <li>
          The user question is then combined with the matching results and sent
          to the LLM using a prompt (explicit instructions to an AI or machine
          learning model) to generate the desired answer.&nbsp;
        </li>
      </ul>
      <div>
        <br />
        <strong>Index</strong>
        <br />
        An index "is a data store that allows you to search data
        efficiently."&nbsp;
      </div>
      <ul>
        <li>
          An index can be optimized for LLMs by creating vectors (text data
          converted to number sequences using an embedding model).&nbsp;
        </li>
        <li>
          It defines what models the index can use to search, defines vectors,
          and the embedding model for those vectors.
        </li>
        <li>
          A good index usually has efficient search capabilities like keyword
          searches, semantic searches, vector searches, or a combination of
          these features.
          <br />
          <strong>Source</strong>:
          <a
            target="_blank"
            rel="noreferrer"
            href="https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/retrieval-augmented-generation"
          >
            https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/retrieval-augmented-generation
          </a>
        </li>
      </ul>
    </div>
  );
};

export default observer(AboutPage);
