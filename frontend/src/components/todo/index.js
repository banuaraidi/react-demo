import React, { Component } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import './style.css';

class Todo extends Component {
  state = { 
    items: []
  }

  componentDidMount() {
   this.getTestQuery(); 
  }
  
  getTestQuery() {
    fetch("http://localhost:3001/test_query")
      .then(data => data.json())
      .then(res => {
        this.setState({items: res})
        console.log(res)
      });
  }

  addItemForm() {
    const newItem = [];
    const submitting = '';
    return (
      <Form>
        <InputGroup className="mb-3">
          <Form.Control/>
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

  itemDisplay() {
    const items = this.state.items;
    const li = items.map((item) => 
      <li key={item.id}>{item.firstname} {item.lastname}</li>
    );
    if(items.length > 0) {
      return this.itemCard(items[0]);
    }else{
      return <p className="text-center">You have no todo items yet! Add one above</p>
    }
  }

  itemCard(item) {
    const { firstname, lastname } = item;
    return (
      <Container fluid className={`item`}>
        <Row>
          <Col xs={1} className="text-center">
            <Button
              className="toggles"
              size="sm"
              variant="link"
              // onClick={toggleCompletion}
              aria-label={
                false
                ? 'Mark item as incomplete'
                : 'Mark item as complete'
              }
            >
              <i
                // onClick={toggleCompletion}
                className={`fa fa-check-square-o`}
              />
            </Button>
          </Col>
          <Col xs={10} className="name">
            {firstname} - {lastname}
          </Col>
          <Col xs={1} className="text-center remove">
            <Button
              size="sm"
              variant="link"
              // onClick={removeItem}
              aria-label="Remove Item"
            >
              <i className="fa fa-trash text-danger" />
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  todoListCard() {
    return (
      <React.Fragment>
        {this.addItemForm()}
        {this.itemDisplay()}
      </React.Fragment>
    );
  }

  render() {

    return (
      <Container>
        <Row>
          <Col md={{ offset: 3, span: 6}}>
            {this.todoListCard()}
          </Col>
        </Row>
      </Container>
    )
  }

}

export default Todo;
