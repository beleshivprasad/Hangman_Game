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
  const [error, setError] = useState(false);

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
  const [win, setWin] = useState(false);
  const [lost, setLost] = useState(false);

  //Saving Name to Local Storage
  localStorage.setItem("name", name);

  //Calling Api to get Word
  const loadWord = async () => {
    const response = await axios.get(
      "https://random-word-api.herokuapp.com/word",
      {
        "Access-Control-Allow-Origin": "*",
        Connection: "close",
        "Content-Type": "application/json",
      }
    );
    // const response = {
    //   data: ["shivprasad"],
    // };

    setWord(response.data);
    let temp = [];
    let wd = Array.from(response.data[0]);
    wd.forEach((char, ind) => {
      temp.push("_");
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

    if (checkWord.normalize() === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      let flag = false;
      let temp = Array.from(word[0]);
      // console.log(temp, arrayWord);
      let wordTemp = Array.from(arrayWord);
      // console.log(wordTemp);
      temp.forEach((char, ind) => {
        if (checkWord.normalize() === char) {
          flag = true;
          wordTemp[ind] = temp[ind];
        }
      });

      if (flag === true) {
        setArrayWord(wordTemp.join(""));
        let str1 = wordTemp.join("");
        let str2 = word[0].normalize();
        console.log(str1, str2);

        if (str1 === str2) {
          setWin(true);
          setTimeout(() => {
            setWin(false);
          }, 6000);
        }
      } else {
        if (lives !== 1) {
          setWrong(true);
        }
        setTimeout(() => {
          setWrong(false);
        }, 1500);
        setLives(lives - 1);
        if (lives === 1) {
          setStarted(false);
          setLost(true);
          setTimeout(() => {
            setLost(false);
          }, 6000);
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
            <Alert variant="danger">Please Enter Something</Alert>
          ) : (
            <></>
          )}
        </Row>

        {/*  Word Guess Success/Error  */}
        <Row>
          {wrong ? (
            <Alert className="alert" variant="danger">
              Wrong !!
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
            <Button className="item" variant="warning">
              Player {name !== "" ? name : ""}
            </Button>
          </Col>

          {/* Lives  */}
          <Col className="c">
            <Button className="item" variant="success">
              Lives {lives}
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
                  setLives(5);
                  setWin(false);
                  setLost(false);
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
                  placeholder="Guess Letter for Above Word"
                  maxLength={1}
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
