import React  from 'react'
import type { FC} from 'react'
import type { InputHTMLAttributes} from 'react'
import type { ButtonHTMLAttributes} from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
`

const sharedStyles = `
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  font-size: 1rem;
`

const StyledInput = styled.input`
  ${sharedStyles}
  border-right: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  flex: 1;
  outline: none;
`

const StyledButton = styled.button`
  ${sharedStyles}
  background-color: #3e4043;
  color: white;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  cursor: pointer;
  
  &:not(:disabled):hover {
    transition: background-color 0.2s;
    background-color: #2c3139;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`

interface InputGroupProps {
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>
}

export const InputGroup: FC<InputGroupProps> = ({
  inputProps,
  buttonProps,
}) => (
  <Wrapper>
    <StyledInput type="text" {...inputProps} />
    <StyledButton {...buttonProps}>{buttonProps?.children}</StyledButton>
  </Wrapper>
)

export default InputGroup
