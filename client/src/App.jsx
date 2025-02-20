import { useState, useEffect } from "react";
import io from "socket.io-client"
import { Row, Col, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const socket = io("http://127.0.0.1:5000");

function App() {
    const [message, setMessage] = useState("");

    const sendData = () => {
        // When this function is triggered, it will emit a socket event called "send_data" with the value of the message
        // On the server side, the event "send_data" is listened to and the value is then emitted back with the event "response"
        socket.emit("send_data", { value: message });
    };


    // When socket.emit("response", data) is called in the server, this function will be triggered
    socket.on("response", (data) => {
        console.log("Server Response: ", data);
    });

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