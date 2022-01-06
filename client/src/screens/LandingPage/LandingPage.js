import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing">
      <Container className="start">
        <Row style={{ textAlign: "center" }}>
          <h1>Welcome to the Hangman </h1>
        </Row>
        <br></br>
        <hr></hr>
        <br></br>
        <Row>
          <h2>Instructions</h2>
          <ul>
            <li>This is a word guessing game</li>
            <li>
              A random word is showed with some blank space for some of its
              letter
            </li>
            <li>You have to enter the letter to complete the word</li>
            <li>You get 5 lives to play this game</li>
            <li>
              Every time you make wrong letter guess your 1 live will be reduced
              from total
            </li>
          </ul>
        </Row>
        <Row
          style={{
            backgroundColor: "black",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <Link to="/start">Start Playing Game</Link>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
