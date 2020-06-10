import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import './style.css';

const baseApi = 'http://localhost:3001';

function Todo() {
  return (
    <Container>
      <Row>
        <Col md={{ offset: 3, span: 6 }}>
          <TodoListCard />
        </Col>
      </Row>
    </Container>
  );
}

function TodoListCard() {
  const [items, setItems] = useState(null);

  React.useEffect(() => {
    fetch(`${baseApi}/items`)
      .then(r => r.json())
      .then(setItems);
  }, []);

  const onNewItem = React.useCallback(
    newItem => {
      setItems([...items, newItem]);
    },
    [items],
  );

  const onItemUpdate = React.useCallback(
    item => {
      const index = items.findIndex(i => i.id === item.id);
      setItems([
        ...items.slice(0, index),
        item,
        ...items.slice(index + 1),
      ]);
    },
    [items],
  );

  const onItemRemoval = React.useCallback(
    item => {
      const index = items.findIndex(i => i.id === item.id);
      setItems([...items.slice(0, index), ...items.slice(index + 1)]);
    },
    [items],
  );

  if (items === null) return 'Loading...';

  return (
    <React.Fragment>
      <AddItemForm onNewItem={onNewItem} />
      {items.length === 0 && (
        <p className="text-center">You have no todo items yet! Add one above</p>
      )}
      {items.map(item => (
        <ItemDisplay
          item={item}
          key={item.id}
          onItemUpdate={onItemUpdate}
          onItemRemoval={onItemRemoval}
        />
      ))}
    </React.Fragment>
  );
}

function AddItemForm({ onNewItem }) {

  const [newItem, setNewItem] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submitNewItem = e => {
    e.preventDefault();
    setSubmitting(true);
    fetch(`${baseApi}/items`, {
      method: 'POST',
      body: JSON.stringify({ name: newItem }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(r => r.json())
    .then(item => {
      onNewItem(item);
      setSubmitting(false);
      setNewItem('');
    });
  };

  return (
    <Form onSubmit={submitNewItem}>
      <InputGroup className="mb-3">
        <Form.Control
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          type="text"
          placeholder="New Item"
          aria-describedby="basic-addon1"
        />
        <InputGroup.Append>
          <Button
            type="submit"
            variant="success"
            disabled={!newItem.length}
            className={submitting ? 'disabled' : ''}
          >
            {submitting ? 'Adding...' : '+ Add Item'}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
}

function ItemDisplay({ item, onItemUpdate, onItemRemoval }) {

  const toggleCompletion = () => {
    fetch(`${baseApi}/items/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify({
          completed: !item.completed,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(r => r.json())
    .then(onItemUpdate);
  };

  const removeItem = () => {
    fetch(`${baseApi}/items/${item.id}`, { method: 'DELETE' }).then(() =>
      onItemRemoval(item),
    );
  };

  return (
    <Container fluid className={`item ${item.completed && 'completed'}`}>
      <Row>
        <Col xs={1} className="text-center">
          <Button
            className="toggles"
            size="sm"
            variant="link"
            aria-label={
              item.completed
                ? 'Mark item as incomplete'
                : 'Mark item as complete'
            }
          >
            <i
              onClick={toggleCompletion}
              className={`fa ${
                  item.completed ? 'fa-check-square-o' : 'fa-square-o'
              }`}
            />
          </Button>
        </Col>
        <Col xs={10} className="name">
          {item.name}
        </Col>
        <Col xs={1} className="text-center remove">
          <Button
            size="sm"
            variant="link"
            onClick={removeItem}
            aria-label="Remove Item"
          >
            <i className="fa fa-trash text-danger" />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Todo;
