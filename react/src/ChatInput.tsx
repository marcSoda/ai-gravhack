import React, { useState } from 'react'
import InputGroup from './InputGroup'

export interface ChatInputProps{
    
}
function ChatInput() {
  const [value, setValue] = useState('')

    const handleOnClick=()=>{

  }

  return (
      <InputGroup
        inputProps={{
          placeholder: 'Ask Question',
          value,
          onChange: e => setValue(e.target.value),
        }}
        buttonProps={{
          onClick: handleOnClick,
          children: "Ask",
          disabled: value.trim() === '',
        }}
      />

  )
}

export default ChatInput
