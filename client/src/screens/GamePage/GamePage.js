import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";
import "./GamePage.css";

const GamePage = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [word, setWord] = useState("");
  const [once, setOnce] = useState(0);

  const loadWord = async () => {
    const response = await axios.get(
      "https://random-word-api.herokuapp.com/word"
    );
    setWord(response.data);
  };

  var renderField = (char, ind) => {
    return (
      <div className="field">
        <Form.Control type="text" maxLength={1} />
      </div>
    );
  };

  return (
    <div className="gamepage">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Container fluid className="game">
        <Row>
          <Col className="col">
            <Button variant="dark">Start</Button>
          </Col>
          <Col className="col">
            <Button variant="dark">Start</Button>
          </Col>
        </Row>
        <Row>
          <Button variant="dark" onClick={handleShow}>
            Start
          </Button>
        </Row>
        <Row>
          <Form.Label htmlFor="inputPassword5">
            Enter Character of Word {word}
          </Form.Label>
          {}
        </Row>
      </Container>
    </div>
  );
};

export default GamePage;
