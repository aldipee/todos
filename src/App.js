import React, { Component } from 'react'

import {
  Row,
  Container,
  Col,
  Input as BsInput,
  Button,
  Card as BsCard,
  ModalHeader,
  Modal,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import styled from 'styled-components'
import { MdCheckCircle, MdEdit, MdDeleteForever } from 'react-icons/md'

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
  margin: 0px 0px 20px 0px;
`

const Action = styled('spane')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 100px;
  padding: 0px 10px;
`

export default class App extends Component {
  state = {
    todos: [],
    input: '',
    showModal: false,
    selectedId: 0,
    inputEdit: ''
  }
  inputComponent = React.createRef()
  inputEdit = React.createRef()
  editTask = index => {
    this.setState({
      showModal: true,
      selectedId: index + 1,
      inputEdit: this.state.todos[index] && this.state.todos[index].task
    })
  }
  saveEdit = index => {
    const { todos, inputEdit } = this.state
    todos[index].task = inputEdit
    this.setState({
      showModal: false
    })
  }

  deleteTask = index => {
    let { todos } = this.state
    todos = todos.filter((v, i) => i !== index)
    this.setState({
      todos
    })
  }

  checkTask = index => {
    const todo = this.state.todos
    todo[index].isCompleted = !todo[index].isCompleted
    console.log(todo)
    this.setState({ todos: todo })
  }

  addTodo = e => {
    if (e.keyCode === 13) {
      const { todos } = this.state
      todos.push({ task: e.target.value, isCompleted: false })
      this.setState({
        todos,
        input: ''
      })
    }
  }

  render() {
    return (
      <>
        <Container>
          <Header>
            <Row>
              <Col md={12}>
                <Input
                  ref={this.inputComponent}
                  onKeyUp={this.addTodo}
                  placeholder="Enter your today tasks!"
                  type="text"
                />
              </Col>
            </Row>
          </Header>
          <Body>
            <Row>
              {this.state.todos.length !== 0 &&
                this.state.todos.map((data, i) => (
                  <Col md={12}>
                    <Card>
                      <span>{data.task}</span>
                      <Action>
                        <MdCheckCircle
                          onClick={() => this.checkTask(i)}
                          color={data.isCompleted ? '#35d660' : '#888'}
                          size={25}
                        />
                        <MdEdit onClick={() => this.editTask(i)} color="#888" size={25} />
                        <MdDeleteForever onClick={() => this.deleteTask(i)} color="#888" size={25} />
                      </Action>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Body>
        </Container>
        <Modal isOpen={this.state.showModal}>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalBody>
            <BsInput
              onChange={e => this.setState({ inputEdit: e.currentTarget.value })}
              ref={this.inputEdit}
              type="text"
              value={this.state.inputEdit}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => this.saveEdit(this.state.selectedId - 1)}>Ok</Button>
            <Button onClick={() => this.setState({ showModal: false })}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}
