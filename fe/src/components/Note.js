import React, { useState } from 'react';

import Card from "./Card";
import styled from "styled-components";

const NoteHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  color: black;
  margin-bottom: 12px;
`

const StyledInput = styled.input`
  border: 0;
  background: transparent;
  font-size: 24px;
  display: block;
  width: calc(100% - 6px);
`

const NoteDescription = styled.div``

const StyledTextarea = styled.textarea`
  width: calc(100% - 6px);
  background-color: transparent;
  font-size: 15px;
  bottom: auto;
  resize: none;
  border: 0;
`

const StyledCheckbox = styled.input`
  min-width: 18px;
`

const NoteFooter = styled.div`
  display: flex;
  justify-content: end;
  justify-items: flex-end;
  
  button {
    margin-left: 4px;
  }
`

const Note = ({ title, description, checked, onChange, onDelete }) => {
  const [newDescription, setNewDescription] = useState(description);
  const [newTitle, setNewTitle] = useState(title);
  const [newChecked, setNewChecked] = useState(checked);
  const [hasChanged, setHasChanged] = useState(false);

  const onSave = () => {
    onChange({ description: newDescription, title: newTitle, checked: newChecked });
    setHasChanged(false);
  }

  const onClose = () => {
    setNewDescription(description);
    setNewTitle(title);
    setNewChecked(checked);
    setHasChanged(false);
  }

  const handleDescriptionChange = (textareaRef) => {
    setNewDescription(textareaRef.target.value);
    setHasChanged(true);
  }

  const handleTitleChange = (inputRef) => {
    setNewTitle(inputRef.target.value);
    setHasChanged(true);
  }

  const handleCheckboxChange = (checkboxRef) => {
    setNewChecked(checkboxRef.target.checked);
    setHasChanged(true);
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you wish to delete the item?')) {
      onDelete();
    }
  }

  return (
    <>
      <Card>
        <NoteHeader>
          <StyledCheckbox type="checkbox" checked={newChecked} disabled={checked} onChange={handleCheckboxChange} />
          <StyledInput value={newTitle} onChange={handleTitleChange} />
        </NoteHeader>
        <NoteDescription>
          <StyledTextarea value={newDescription} onChange={handleDescriptionChange}/>
        </NoteDescription>
        <NoteFooter>
          <button onClick={onSave} disabled={!hasChanged}>Save</button>
          <button onClick={onClose} disabled={!hasChanged}>Discard</button>
          <button onClick={handleDelete}> Delete</button>
        </NoteFooter>
      </Card>
    </>
  )
}

export default Note
