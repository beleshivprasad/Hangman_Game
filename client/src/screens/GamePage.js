import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import "./GamePage.css";

const GamePage = () => {
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
    <>
      <Container fluid className="game">
        <Row>
          {" "}
          <Button variant="primary" onClick={loadWord}>
            Start
          </Button>{" "}
        </Row>
        <Row>
          <Form.Label htmlFor="inputPassword5">
            Enter Character of Word {word}
          </Form.Label>
          {}
        </Row>
      </Container>
    </>
  );
};

export default GamePage;
