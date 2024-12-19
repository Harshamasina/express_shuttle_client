import Table from 'react-bootstrap/Table';

const TimeSchedule = () => {
    return (
        <div className='schedule_table_container'>
            <div className='schedule_table'>
                <h3>Our Daily Shuttle Schedule</h3>

                <Table striped bordered hover size="sm" className='time_table'>
                    <thead>
                        <tr>
                            <th>STL to Rolla</th>
                            <th>Buss Number</th>
                            <th>Driver Name</th>
                            <th>Driver Number</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>6:30 AM</td>
                            <td>BUS XXX</td>
                            <td>Jhon Doe</td>
                            <td>+1 (573) 647-XXXX</td>
                        </tr>
                        <tr>
                            <td>10:30 AM</td>
                            <td>BUS XXX</td>
                            <td>Jhon Doe</td>
                            <td>+1 (573) 647-XXXX</td>
                        </tr>
                        <tr>
                            <td>3:30 PM</td>
                            <td>BUS XXX</td>
                            <td>Jhon Doe</td>
                            <td>+1 (573) 647-XXXX</td>
                        </tr>
                        <tr>
                            <td>6:30 PM</td>
                            <td>BUS XXX</td>
                            <td>Jhon Doe</td>
                            <td>+1 (573) 647-XXXX</td>
                        </tr>
                    </tbody>
                </Table>

                <Table striped bordered hover size="sm" className='time_table'>
                    <thead>
                        <tr>
                            <th>Rolla to STL</th>
                            <th>Buss Number</th>
                            <th>Driver Name</th>
                            <th>Driver Number</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>9:00 AM</td>
                            <td>BUS XXX</td>
                            <td>Jhon Doe</td>
                            <td>+1 (573) 647-XXXX</td>
                        </tr>
                        <tr>
                            <td>12:30 PM</td>
                            <td>BUS XXX</td>
                            <td>Jhon Doe</td>
                            <td>+1 (573) 647-XXXX</td>
                        </tr>
                        <tr>
                            <td>4:30 PM</td>
                            <td>BUS XXX</td>
                            <td>Jhon Doe</td>
                            <td>+1 (573) 647-XXXX</td>
                        </tr>
                        <tr>
                            <td>7:30 PM</td>
                            <td>BUS XXX</td>
                            <td>Jhon Doe</td>
                            <td>+1 (573) 647-XXXX</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
};

export default TimeSchedule;