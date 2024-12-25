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
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>5:00 AM</td>
                            <td>BUS 01</td>
                        </tr>
                        <tr>
                            <td>12:00 AM</td>
                            <td>BUS 01</td>
                        </tr>
                        <tr>
                            <td>5:00 PM</td>
                            <td>BUS 01</td>
                        </tr>
                    </tbody>
                </Table>

                <Table striped bordered hover size="sm" className='time_table'>
                    <thead>
                        <tr>
                            <th>Rolla to STL</th>
                            <th>Buss Number</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>8:00 AM</td>
                            <td>BUS 01</td>
                        </tr>
                        <tr>
                            <td>2:00 PM</td>
                            <td>BUS 01</td>
                        </tr>
                        <tr>
                            <td>5:00 PM</td>
                            <td>BUS 01</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
};

export default TimeSchedule;