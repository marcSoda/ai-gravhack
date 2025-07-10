import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";

const Title = styled.p`
  font-weight: 600;
  padding-bottom: 16px;
  padding-top: 16px;
`;

export interface HelpPageProps {}

const HelpPage: React.FunctionComponent<Readonly<HelpPageProps>> = () => {
  return (
    <div style={{ padding: "16px 40px" }}>
      <div style={{ textAlign: "center" }}>
        <h1>ShadowbaseAI Help</h1>
        <div style={{ opacity: 0.6 }}>
          <em>tips and tricks</em>
        </div>
      </div>
      <div style={{ paddingTop: 16 }}>
        <p>
          ShadowbaseAI chat is an expert in all things Shadowbase. Consider it
          to be your personal Shadowbase assistant that can help answer your
          questions by combing through a repository of manuals, documentation,
          training data, and publications.
          <Title>Use Cases</Title>
          <ul>
            <li>
              Quickly summarize relevant search results across Shadowbase
              content
            </li>
            <li>Guidance for configuring Shadowbase in your environment</li>
            <li>Get recommendations for troubleshooting your system</li>
          </ul>
          <Title>Sample Questions</Title>
          <ul>
            <li>What is a user exit?</li>
            <li>What is AUDCOM?</li>
          </ul>
          <Title>Warnings and Limitations</Title>
          <p>
            While this Chatbot provides indexing across Shadowbase-related data,
            since it is an LLM that leverages AI, some answers may be generated
            from the LLM/AI's interpretation of the source data, which may be
            inaccurate or irrelevant to the user's specific situation.
          </p>
          <Title>Context</Title>
          <p>
            ShadowbaseAI chat supports a moderate level of context-relevant
            answers, but since the data spans a variety of sources, some
            responses may not be 100% accurate specific to the your environment.
          </p>
        </p>
      </div>
    </div>
  );
};

export default observer(HelpPage);
