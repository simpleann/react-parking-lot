import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Table from "react-bootstrap/Table";
import axios from "axios";

export class ParkingMap extends Component {

    constructor(props){
        super(props);
        this.state = {
            parkingLots:[],
            reg_no: "",
            total_slots: "",
            small_slots: "",
            medium_slots: "",
            large_slots: "",
        };
    }

    componentDidMount() {
        axios.get('./json/map.json')
            .then(res => {
                const parkingLots = res.data.slot_array;
                this.setState({ parkingLots });
            })
    }

    handleSubmit = event => {
        event.preventDefault();

        axios.delete(`./json/map.json/${this.state.reg_no}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (
            <Container style={{display: isNaN(this.state.parkingLots) ? 'block' : 'none' }}>
                <h1 className="header">Parking Lot Map</h1>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th className="h4">Ticket No.</th>
                        <th className="h4">Size</th>
                        <th className="h4">Distance</th>
                        <th className="h4">Time (HR)</th>
                        <th className="h4">Cost (PHP)</th>
                        <th className="h4">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.parkingLots.map((parkingLot, index) =>
                            <tr key={index}>
                                <td className="col-4">{parkingLot.reg_no}</td>
                                <td className="col-4">{parkingLot.size}</td>
                                <td className="col-2">{parkingLot.dist}</td>
                                <td className="col-2">{parkingLot.time}</td>
                                <td className="col-2">{parkingLot.cost}</td>
                                <td className="col-2"><button className="btn btn-sm btn-danger" disabled={!parkingLot.reg_no}>Exit</button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default ParkingMap;