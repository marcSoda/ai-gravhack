import React from "react";
import styled from "styled-components";

const Row = styled.div`
  align-self: self-end;
  display: table;
  margin-bottom: 8px;
`;

const Chip = styled.div`
  float: right;
  margin: 4px 0 4px 6px;
  border-style: solid;
  border-radius: 6px;
  border-width: 2px;
  border-color: #2655ec;
  padding: 0 8px;
  background-color: #000050;
  font-size: 1rem;
  cursor: pointer;
`;

export interface FollowUpQuestionsProps {
  questions: string[];
  onClick?: (questionText: string) => void;
}

const FollowUpQuestions: React.FunctionComponent<
  Readonly<FollowUpQuestionsProps>
> = ({ questions, onClick }) => {
  return (
    <Row>
      {questions.map((question, index) => (
        <Chip
          key={index}
          onClick={
            onClick && typeof onClick === "function"
              ? () => onClick(question)
              : undefined
          }
        >
          {question}
        </Chip>
      ))}
    </Row>
  );
};

export default FollowUpQuestions;
