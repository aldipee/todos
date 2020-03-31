import React, { Component } from 'react'

import { Row, Container, Col, Input as BsInput, Button, Card as BsCard } from 'reactstrap'
import styled from 'styled-components'
import { MdCheckCircle } from 'react-icons/md'

const Header = styled('div')`
  display: flex;
  height: 60px;
  background-color: #2db495;
  flex-direction: column;
  padding: 10px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
`

const Input = styled(BsInput)`
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  &:focus {
    background-color: rgba(255, 255, 255, 0.3);
    color: #fff;
    border: none;
  }
  &&::placeholder {
    color: #fff;
  }
`

const Body = styled('div')`
  background-color: #7de0e0;
  padding: 10px;
  min-height: 500px;
`
const Card = styled(BsCard)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  color: #777;
  cursor: pointer;
`

export default class App extends Component {
  state = {
    todos: []
  }

  render() {
    return (
      <Container>
        <Header>
          <Row>
            <Col md={12}>
              <Input placeholder="Enter your today tasks!" type="text" />
            </Col>
          </Row>
        </Header>
        <Body>
          <Row>
            {this.state.todos.length &&
              this.state.todos.map((data, i) => (
                <Col md={12}>
                  <Card>
                    <span>Todo 1</span>
                    <span>
                      <MdCheckCircle color="#35d660" size={25} />
                    </span>
                  </Card>
                </Col>
              ))}
          </Row>
        </Body>
      </Container>
    )
  }
}
