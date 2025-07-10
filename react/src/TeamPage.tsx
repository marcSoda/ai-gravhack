import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";

const Task = styled.p`
  font-style: italic;
  padding-bottom: 16px;
  opacity: 0.6;
`;

export interface TeamPageProps {}

const TeamPage: React.FunctionComponent<Readonly<TeamPageProps>> = () => {
  return (
    <div style={{ textAlign: "center", paddingTop: 16 }}>
      <h1>The Shadowbase AI Assistant Team</h1>
      <div style={{ opacity: 0.6 }}>
        <em>in alphabetical order</em>
      </div>
      <div style={{ paddingTop: 40, paddingBottom: 40 }}>
        <ul>
          <li>
            Alicia Handian
            <Task>Content acquisition and quality assurance</Task>
          </li>
          <li>
            Marc Soda
            <Task>Backend development, authentication, and user interface</Task>
          </li>
          <li>
            Paden Holenstein
            <Task>Optimizing accuracy and quality assurance</Task>
          </li>
          <li>
            Rich Ricciardi<Task>User interface and chat interaction</Task>
          </li>
          <li>
            Seth Davison<Task>Backend development and AI bridge</Task>
          </li>
        </ul>
      </div>

      <div style={{ textAlign: "center", opacity: 0.6 }}>
        A special thanks goes out to our team advisors, Chris Davison and Drew
        Bauernschmidt!
      </div>
    </div>
  );
};

export default observer(TeamPage);
