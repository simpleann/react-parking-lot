import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import ParkingMap from "./ParkingMap";
import ParkingEntrace from "./ParkingEntrace";
import axios from "axios";

export class GenerateParkingLot extends Component {

    constructor(props){
        super(props);
        this.state = {
            fields: {},
            errors: "",
            showParkingMap:false
        };
    }

    componentDidMount() {
        axios.get('./json/map.json')
            .then(res => {
                const parkingLots = res.data.slot_array;
                this.setState({ parkingLots });
            })
    }

    handleChange (field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
    }

    handleSubmit = event => {
        event.preventDefault();

        let fields = this.state.fields;
        let errors = "";
        let tot_slot = 0;
        let small_slots = 0;
        let medium_slots = 0;
        let large_slots = 0;
        let showParkingMap = false;
        small_slots = parseInt(fields["small_slots"], 10);
        medium_slots = parseInt(fields["medium_slots"], 10);
        large_slots = parseInt(fields["large_slots"], 10);
        tot_slot = small_slots + medium_slots + large_slots;
        if(fields["total_slots"] !== '')
            if(!isNaN(fields["total_slots"]))
                if(tot_slot === parseInt(fields["total_slots"], 10))
                    showParkingMap = true;
                else
                    errors = 'The total of slots and its sizes should be equal';
            else
                errors = 'Enter correct value for total slots';
        else
            errors = 'Enter total number of parking slots';

        this.setState({errors: errors});

    }

    render() {
        return (
            <Container className="p-3">
                <h1 className="header">Generate Parking Lot</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Total Parking Slots</Form.Label>
                        <Form.Control type="number" name="total_slots" onChange={this.handleChange.bind(this, "total_slots")} value={this.state.fields["total_slots"]} />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Control placeholder="Small Slots" type="number" name="small_slots" onChange={this.handleChange.bind(this, "small_slots")} value={this.state.fields["small_slots"]} />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Medium Slots" type="number" name="medium_slots" onChange={this.handleChange.bind(this, "medium_slots")} value={this.state.fields["medium_slots"]}/>
                        </Col>
                        <Col>
                            <Form.Control placeholder="Large Slots" type="number" name="large_slots" onChange={this.handleChange.bind(this, "large_slots")} value={this.state.fields["large_slots"]}/>
                        </Col>
                    </Row>
                    <Button type="submit" variant="primary">Generate Map</Button>
                </Form>
                <Alert variant="danger" style={{display: this.state.errors ? 'block' : 'none'}}>
                    {this.state.errors}
                </Alert>
                <ParkingEntrace />
                <ParkingMap/>
            </Container>
        )
    }
}

export default GenerateParkingLot;