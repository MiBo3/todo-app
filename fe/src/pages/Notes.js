import React, { useEffect, useState } from "react";

import styled from "styled-components";

import api from "../api/Todo";
import Note from "../components/Note";

const NotesContainer = styled.div`
  margin: 24px 24px 24px 24px;
`;

const StickyHeader = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;
  background: white;
  height: 64px;
  top: 0;
  padding-left: 24px;

  button {
    margin: auto 32px;
    height: 32px;
  }

  h1 {
    margin: auto 0;
  }
`;

const Notes = () => {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    api
      .fetch({})
      .then((res) => setTodoItems(res.data))
      .catch(() => {});
  }, []);

  const handleAdd = () => {
    api
      .create({ title: "TODO Title", description: "Description" })
      .then((res) => {
        setTodoItems([...todoItems, res.data]);
      })
      .catch(() => {});
  };

  const handleNoteChange = (id) => {
    return (item) => {
      api
        .update({ id, ...item })
        .then((res) => {
          const newItem = res.data;
          const idx = todoItems.findIndex((item) => item._id === newItem._id);
          const newItems = [...todoItems];
          newItems[idx] = newItem;
          setTodoItems(newItems);
        })
        .catch(() => {});
    };
  };

  const handleNoteDelete = (id) => {
    return () => {
      api
        .delete(id)
        .then(() => {
          // There's some weird interaction, where the render would not reflect the correct state without
          // seting items to empty list first
          setTodoItems([]);
          setTodoItems(todoItems.filter((item) => item._id !== id));
        })
        .catch(() => {});
    };
  };

  return (
    <>
      <StickyHeader>
        <h1>TODO handling application</h1>
        <button onClick={handleAdd}>Add todo</button>
      </StickyHeader>
      <NotesContainer>
        {todoItems.map((note, idx) => {
          return (
            <Note
              title={note.title}
              checked={note.checked}
              description={note.description}
              key={idx}
              onChange={handleNoteChange(note._id)}
              onDelete={handleNoteDelete(note._id)}
            />
          )
        })}
      </NotesContainer>
    </>
  );
};

export default Notes;
