import { useState, useEffect } from "react";
import io from "socket.io-client"
import { Row, Col, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const socket = io("http://127.0.0.1:5000");

function App() {
    const [message, setMessage] = useState("");
    const pressedKeys = new Set();
    const validKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    const [driveMode, setDriveMode] = useState("stop");

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
                    setDriveMode("forward");
                    console.log(driveState);
                }
                else if (e.key === "ArrowDown") {
                    driveState = "reverse";
                    setDriveMode("reverse");
                    console.log(driveState);
                }
                else if (e.key === "ArrowLeft") {
                    driveState = "left";
                    setDriveMode("left");
                    console.log(driveState);
                }
                else if (e.key === "ArrowRight") {
                    driveState = "right";
                    setDriveMode("right");
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
                    setDriveMode("stop");
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
        <Container fluid className="bg-dark vh-100 text-light">
            <Row className="justify-content-center">
                <Col md={12} className="text-center">
                    <h4>Rapberry Pi Control Interface</h4>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col sm={12} md={8} lg={8} className="d-flex justify-content-center">
                    <div
                        className="border border-light p-2"
                        style={{ width: "750px", height: "600px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-center mt-3">
                <Col lg={6} className="text-center">
                    <h5>Drive Mode: {driveMode}</h5>
                </Col>
            </Row>
        </Container>
    );
}

export default App;