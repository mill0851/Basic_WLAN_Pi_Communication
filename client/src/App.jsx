import { useState, useEffect } from "react";
import io from "socket.io-client"
import { Row, Col, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const socket = io("http://127.0.0.1:5000");

function App() {
    const [message, setMessage] = useState("");
    const pressedKeys = new Set();
    const validKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    const sendData = () => {
        socket.emit("send_data", { value: message });
    };

    useEffect(() => {
        const handleArrowKeyDown = async (e) => {
            if (!pressedKeys.has(e.key)) {
                pressedKeys.add(e.key);

                let driveState = "";
                if (e.key === "ArrowUp") {
                    driveState = "forward";
                    console.log(driveState);
                }
                else if (e.key === "ArrowDown") {
                    driveState = "reverse";
                    console.log(driveState);
                }
                else if (e.key === "ArrowLeft") {
                    driveState = "left";
                    console.log(driveState);
                }
                else if (e.key === "ArrowRight") {
                    driveState = "right";
                    console.log(driveState);
                }
                if (driveState) {
                    socket.emit('send_data', driveState);
                }
            }
        }

        const handleArrowKeyUp = async (e) => {
            if (pressedKeys.has(e.key)) {
                pressedKeys.delete(e.key);
                
                if ([...pressedKeys].every(key => !validKeys.includes(key))) {
                    socket.emit('send_data', 'stop');
                }
            }
        }

        window.addEventListener("keydown", handleArrowKeyDown);
        window.addEventListener("keyup", handleArrowKeyUp);

        return () => {
            window.removeEventListener("keydown", handleArrowKeyDown);
            window.removeEventListener("keyup", handleArrowKeyUp);
        }
    }, []);


    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6} className="text-center">
                    <h4>WebSocket Communication Example</h4>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={6} className="justify-content-center">
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className="form-control" />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={6} className="d-flex justify-content-center">
                    <Button onClick={sendData} className="mt-3">Send Data</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default App;