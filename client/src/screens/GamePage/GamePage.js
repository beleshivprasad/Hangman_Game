import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import axios from "axios";
import "./GamePage.css";
import { Link } from "react-router-dom";

const GamePage = () => {
  var wordSet = [];
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [lives, setLives] = useState(5);
  const [score, setScore] = useState(0);
  const [num, setNum] = useState(0);
  const [word, setWord] = useState("");
  const [checkWord, setCheckWord] = useState("");
  localStorage.setItem("name", name);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loadWord = async () => {
    const response = await axios.get(
      "https://random-word-api.herokuapp.com/word"
    );
    setWord(response.data);
    let wd = Array.from(response.data[0]);
    wordSet = wd;
    // console.log(wordSet);
    setNum(0 + Math.random() * (wd.length - 0));
  };
  // console.log(num);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(word[0], checkWord);
    if (word[0].normalize() === checkWord.normalize()) {
      setScore(score + 1);
      loadWord();
    } else {
      setLives(lives - 1);
      loadWord();
    }
  };

  return (
    <div className="gamepage">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Player Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Container fluid className="game">
        <Row>
          {score === 5 ? (
            <Alert variant="warning">
              Congratulation ...!! {name} You Won the Game
            </Alert>
          ) : (
            <></>
          )}
        </Row>
        <Row>
          {lives === 0 ? (
            <Alert variant="danger">
              Better luck next time ..!! You Lost the Game
            </Alert>
          ) : (
            <></>
          )}
        </Row>
        <Row className="gameArea">
          <Col className="c">
            <Button className="item" variant="dark">
              Player {name !== "" ? name : ""}
            </Button>
          </Col>
          <Col className="c">
            <Button className="item" variant="warning">
              Lives {lives}
            </Button>
          </Col>
          <Col className="c">
            <Button className="item" variant="success">
              Score {score}
            </Button>
          </Col>
        </Row>
        <Row className="col"></Row>
        <Row className="gameArea">
          <Col className="c">
            {started ? (
              <Button
                variant="dark"
                className="item"
                onClick={() => {
                  localStorage.removeItem("name");
                  setStarted(false);
                  window.location.reload();
                }}
              >
                <Link to="/start">End Game</Link>
              </Button>
            ) : (
              <Button
                variant="dark"
                className="item"
                onClick={() => {
                  setStarted(true);
                  if (name == "") {
                    handleShow();
                  }
                  loadWord();
                }}
              >
                Start Game
              </Button>
            )}
          </Col>
          <Col className="c">
            <Button
              variant="dark"
              className="item"
              onClick={() => {
                localStorage.removeItem("name");
                window.location.reload();
              }}
            >
              <Link to="/start">New Game</Link>
            </Button>
          </Col>
        </Row>
        <Row className="gameAreamain word">
          <span>{word}</span>
        </Row>
        <Row className="gameAreamain">
          <Form>
            <Form.Control
              type="text"
              placeholder="Enter Word"
              value={checkWord}
              onChange={(e) => {
                setCheckWord(e.target.value);
              }}
            />
          </Form>
        </Row>
        <Row className="gameArea">
          <Button variant="primary" type="submit" onClick={submitHandler}>
            Submit
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default GamePage;
