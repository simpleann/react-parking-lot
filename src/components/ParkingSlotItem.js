import React from 'react';
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

const ParkingSlotItem = (props) => {
    console.log(props.parkingLots !== undefined);
    return (
        // { this.props.parkingLots ? (
            <Container>
                <h1 className="header">Parking Lot Map</h1>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th className="col-4 h4">Reg No.</th>
                        <th className="col-4 h4">Size</th>
                        <th className="col-2 h4">Distance</th>
                        <th className="col-2 h4">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*{*/}
                    {/*    props.data.map((item, index) =>*/}
                    {/*        <tr className="row table-row">*/}
                    {/*            <td className="col-4"></td>*/}
                    {/*            <td className="col-4">{item.size}</td>*/}
                    {/*            <td className="col-2">{item.dist}</td>*/}
                    {/*            <td className="col-2"><button className="btn btn-sm btn-danger" disabled={!item.reg_no}>Exit</button></td>*/}
                    {/*        </tr>*/}
                    {/*)}*/}
                    </tbody>
                </Table>
            </Container>
        // ) : (
        //         <span>No Parking Map</span>
        // )}
    )
}

export default ParkingSlotItem;