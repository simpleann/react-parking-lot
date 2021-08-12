import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from "react-bootstrap/Alert";

function ParkingEntrace() {
    const [inputList, setInputList] = useState([{ ticket_no: "", plate_no: "", size: "" }]);
    const [posts, setPosts] = useState( [] );

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('./json/map.json');
            const postsData = await response.json();
            setPosts(postsData.total_slots);
        };
        fetchPosts();
    }, []);

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = index => {
        const ctr = parseInt(posts, 10) - 1;
        if (ctr >= index) {
            setInputList([...inputList, { ticket_no: "", plate_no: "", size: "" }]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputList.length >= 3)
            console.log("InputFields", inputList);
        else {
            // e.preventDefault();
            ReactDOM.render(
                <Alert variant="danger" className="hide">The minimum of parking slots is 3</Alert>,
                document.getElementById('div-error')
            );
            console.log(inputList.length);
        }


    };

    return (
        <Container className="App" style={{display: (posts) ? 'block' : 'none' }}>
            <h1 className="header">Entrance of Parking Lot</h1>
            <Form onSubmit={handleSubmit}>
                {inputList.map((x, i) => {
                    const n = i +1;
                    return (
                        <Row className="box">
                            <h5 className="header">Entrance {n}</h5>
                            <Col>
                                <Form.Control
                                    name="ticket_no"
                                    placeholder="Enter Ticket No."
                                    value={x.ticket_no}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    className="ml10"
                                    name="plate_no"
                                    placeholder="Enter Plate No."
                                    value={x.plate_no}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    className="ml10"
                                    name="size"
                                    placeholder="Enter Size"
                                    value={x.size}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </Col>
                            <Col>
                                <ButtonGroup className="btn-box">
                                    {inputList.length !== 1 && <Button
                                        className="mr10" variant="danger"
                                        onClick={() => handleRemoveClick(i)}>Remove</Button>}
                                    {inputList.length - 1 === i && <Button variant="info" onClick={() => handleAddClick(i)}>Add</Button>}
                                </ButtonGroup>
                            </Col>
                        </Row>
                    );
                })}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                >Submit</Button>
                <div id="div-error"></div>
            </Form>
            {/*<div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>*/}
        </Container>
    );
}

export default ParkingEntrace;