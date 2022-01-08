import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
  //history variable
  const history = useHistory();

  // Alert States
  const [wrong, setWrong] = useState(false);
  const [right, setRight] = useState(false);
  const [error, setError] = useState(false);
  const [tryNext, setTryNext] = useState("");

  // Modal related states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Word Related States
  const [checkWord, setCheckWord] = useState("");
  const [word, setWord] = useState("");
  const [arrayWord, setArrayWord] = useState("");

  // Game Related States
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [lives, setLives] = useState(5);
  const [submitCounter, setSubmitCounter] = useState(1);
  const [score, setScore] = useState(0);
  const [win, setWin] = useState(false);
  const [lost, setLost] = useState(false);

  //Saving Name to Local Storage
  localStorage.setItem("name", name);

  //Calling Api to get Word
  const loadWord = async () => {
    const response = await axios.get(
      "https://random-word-api.herokuapp.com/word"
    );
    setWord(response.data);
    let temp = [];
    let wd = Array.from(response.data[0]);
    wd.forEach((char, ind) => {
      temp.push(" _ ");
    });
    wd.forEach((char, ind) => {
      let num;
      if (ind <= Math.ceil(wd.length / 2)) {
        num = Math.floor(0 + Math.random() * (wd.length - 0));
        temp[num] = wd[num];
      }
    });
    setArrayWord(temp.join(""));
    console.log(response.data[0]);
  };

  //Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();
    if (checkWord.normalize() === "" || word[0].length !== checkWord.length) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      if (word[0].normalize() === checkWord.normalize()) {
        setScore(score + 1);
        if (score === 4) {
          setWin(true);
          setScore(0);
          setStarted(false);
          setTimeout(() => {
            setWin(false);
          }, 8000);
        }
        setCheckWord("");
        setWord("");
        loadWord();
        setArrayWord("");
        setRight(true);
        setTimeout(() => {
          setRight(false);
        }, 900);
      } else {
        setLives(lives - 1);
        console.log(lives);
        if (lives === 1) {
          setLost(true);
          setStarted(false);
          setWord("");
          setArrayWord("");
          setLives(5)
          setScore(0)
          setTimeout(() => {
            setLost(false);
          }, 8000);
        } else {
          setSubmitCounter(submitCounter + 1);
          if (submitCounter === 5) {
            setSubmitCounter(1);
            setTryNext("Try Next Word");
            setTimeout(() => {
              setTryNext("");
            }, 2000);
            setCheckWord("");
            setArrayWord("");
            setWord("");
            loadWord();
          }
          setWrong(true);
          setTimeout(() => {
            setWrong(false);
          }, 900);
        }
      }
    }
  };

  return (
    <div className="gamepage">
      {/* Modal Pop-Up for getting players name  */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Player Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
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
            <Form.Group>
              <Button type="submit" variant="secondary">
                Save
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      <Container fluid className="game">
        {/* Input Field Error  */}
        <Row>
          {error ? (
            <Alert variant="danger">
              Please Enter Complete Word of Same length !!
            </Alert>
          ) : (
            <></>
          )}
        </Row>

        {/*  Word Guess Success/Error  */}
        <Row>
          {wrong ? (
            <Alert className="alert" variant="danger">
              Wrong !!{tryNext}
            </Alert>
          ) : (
            <></>
          )}
        </Row>
        <Row>
          {right ? (
            <Alert className="alert" variant="sucess">
              Correct !!
            </Alert>
          ) : (
            <></>
          )}
        </Row>

        {/* Game Result Message Win/Lost  */}

        <Row>
          {win ? (
            <Alert variant="warning" className="alert">
              Congratulation ...!! {name} You Won the Game
            </Alert>
          ) : (
            <></>
          )}
        </Row>

        <Row>
          {lost ? (
            <Alert variant="danger" className="alert">
              Better luck next time ..!! You Lost the Game
            </Alert>
          ) : (
            <></>
          )}
        </Row>

        {/* Info Section of Name/Lives/Score  */}

        {/* Players Name  */}
        <Row className="gameArea">
          <Col className="c">
            <Button className="item" variant="dark">
              Player {name !== "" ? name : ""}
            </Button>
          </Col>

          {/* Lives  */}
          <Col className="c">
            <Button className="item" variant="warning">
              Lives {lives}
            </Button>
          </Col>

          {/* Score  */}
          <Col className="c">
            <Button className="item" variant="success">
              Score {score}
            </Button>
          </Col>
        </Row>

        <Row className="gameArea">
          <Col className="c">
            {started ? (
              // End Game Button
              <Button
                variant="dark"
                className="item"
                onClick={() => {
                  setStarted(false);
                  setWord("");
                  setLives(5);
                  setScore(0);
                  setSubmitCounter(1);
                  setCheckWord("");
                  setArrayWord("");
                  history.push("/game");
                }}
              >
                <Link to="/game">End Game</Link>
              </Button>
            ) : (
              // Start Game Button
              <Button
                variant="dark"
                className="item"
                onClick={() => {
                  setStarted(true);
                  if (name === "") {
                    handleShow();
                  }
                  loadWord();
                }}
              >
                Start Game
              </Button>
            )}
          </Col>

          {/* New Game Button  */}
          <Col className="c">
            <Button
              variant="dark"
              className="item"
              onClick={() => {
                localStorage.removeItem("name");
                setCheckWord("");
                window.location.reload();
              }}
            >
              <Link to="/game">New Game</Link>
            </Button>
          </Col>
        </Row>

        {/* Game Area Started */}
        {started ? (
          <>
            {/* Game Word  */}
            <Row className="gameAreamain ">
              <span className="word">{arrayWord}</span>
              {/* <span>{wordArray}</span> */}
            </Row>

            {/* Game Input Field  */}
            <Row className="gameAreamain">
              <Form className="inp" onSubmit={submitHandler}>
                <Form.Control
                  className="input"
                  type="text"
                  placeholder="Enter Word"
                  value={checkWord}
                  onChange={(e) => {
                    setCheckWord(e.target.value);
                  }}
                />
                <Form.Group>
                  {/* Game Submit Button  */}
                  <Button className="button" variant="primary" type="submit">
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Row>
          </>
        ) : (
          <></>
        )}

        {/* Game Area End here  */}
      </Container>
    </div>
  );
};

export default GamePage;
