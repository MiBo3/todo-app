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
    api.fetch({}).then((res) => setTodoItems(res.data));
  }, []);

  const handleAdd = () => {
    api
      .create({ title: "TODO Title", description: "Description" })
      .then((res) => {
        setTodoItems([...todoItems, res.data]);
      });
  };

  const handleNoteChange = (id) => {
    return (item) => {
      api.update({ id, ...item }).then((res) => {
        const newItem = res.data;
        const idx = todoItems.findIndex((item) => item._id === newItem._id);
        const newItems = [...todoItems];
        newItems[idx] = newItem;
        setTodoItems(newItems);
      });
    };
  };

  const handleNoteDelete = (id) => {
    return () => {
      api.delete(id).then(() => {
        setTodoItems(todoItems.filter((item) => item.id === id));
      });
    };
  };

  return (
    <>
      <StickyHeader>
        <h1>TODO handling application</h1>
        <button onClick={handleAdd}>Add todo</button>
      </StickyHeader>
      <NotesContainer>
        <div>
          {Object.values(todoItems).map((note, idx) => (
            <Note
              {...note}
              key={idx}
              onChange={handleNoteChange(note._id)}
              onDelete={handleNoteDelete(note._id)}
            />
          ))}
        </div>
      </NotesContainer>
    </>
  );
};

export default Notes;
