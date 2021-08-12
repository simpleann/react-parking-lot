import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

export class ParkingEntrace2 extends Component {

    constructor(props){
        super(props);
        this.state = {
            fields: {},
            ticket_nos: [],
            reg_nos: [],
            sizes: [],
            ctr: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('./json/map.json')
            .then(res => {
                const parkingLots = res.data.slot_array;
                const LotCount = res.data.total_slots - 1;
                this.setState({ parkingLots, LotCount });
            })
    }

    handleChange (field, e, i) {
        let fields = this.state.fields;
        fields[i] = i.target.value;
        this.setState({fields});
    }

    addField() {
        this.state.LotCount = this.state.LotCount - 1;
        if (this.state.LotCount >= 0) {
            this.setState({
                sizes: [...this.state.sizes, ""]
            })
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        let errors = "";

        if(this.state.ctr >= 1)
            console.log(this.state.fields);
            // alert('A name was submitted: ' + this.state.fields.join(', '));
        else
            errors = 'The minimum of parking slots is 3';

        this.setState({errors: errors});

    }

    render() {
        return (
            <Container className="p-3" style={{display: isNaN(this.state.parkingLots) ? 'block' : 'none' }}>
                <h1 className="header">Entrance of Parking Lot</h1>
                <Form onSubmit={this.handleSubmit}>
                    {
                        this.state.sizes.map((size, index) => {
                            index = index + 1
                            this.state.ctr = index
                            return (
                                <Row key={index}>
                                    <h5 className="header">Entrance {index}</h5>
                                    <Col>
                                        <Form.Label>Ticket No.</Form.Label>
                                        <Form.Control type="text" name="ticket_no[]" placeholder="AB-12-XY-1234-small" onChange={this.handleChange.bind(this, "ticket_nos", index)} value={this.state.fields["ticket_no"]}/>
                                    </Col>
                                    <Col>
                                        <Form.Label>Plate No.</Form.Label>
                                        <Form.Control type="text" name="reg_no[]" placeholder="AB-12-XY-1234" onChange={this.handleChange.bind(this, "reg_nos", index)} value={this.state.fields["reg_no"]}/>
                                    </Col>
                                    <Col>
                                        <Form.Label>Size</Form.Label>
                                        <Form.Select aria-label="slot size" name="size[]">
                                            <option>Open this select slot size</option>
                                            <option value="1">Small</option>
                                            <option value="2">Medium</option>
                                            <option value="3">Large</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                    <div>
                        <Button className="btn btn-sm secondary" onClick={(e) => this.addField.bind(this)}>Add</Button>
                    </div>
                    <ButtonGroup size="lg">
                        <Button size="lg" type="submit" className="btn btn-sm btn-success">Submit</Button>
                    </ButtonGroup>
                    <Alert variant="danger" style={{display: this.state.errors ? 'block' : 'none'}}>
                        {this.state.errors}
                    </Alert>
                </Form>
            </Container>
        )
    }
}

export default ParkingEntrace2;