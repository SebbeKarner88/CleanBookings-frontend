import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApprovedCleaning: React.FC = () => {
    const [completedCleanings, setCompletedCleanings] = useState<JobDto[]>([]);

    useEffect(() => {
        //Assuming an endpoint for fetching completed cleanings.
        axios.get('http://localhost:8080/api/v1/job/completed-cleanings')
            .then((response) => {
                setCompletedCleanings(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    //Handler for approving a cleaning.
    const approveCleaning = (id: string) => {
        //Endpoint for approving a cleaning
        axios.put(`http://localhost:8080/api/v1/job/approve-cleaning/${id}`)
            .then(() => {
                setCompletedCleanings(prev => prev.filter(cleaning => cleaning.id !== id));
                //Here you can also show some kind of success message or notification.
            })
            .catch((error) => {
                console.error("Error approving cleaning:", error);
            });
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Completed Cleanings</h1>
            {/*<Link to={`/booked-cleanings/${customerId}`}>See Booked Cleanings</Link>*/}
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Booking ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Service Type</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {completedCleanings.map((cleaning) => (
                    <tr key={cleaning.id}>
                        <td>{cleaning.id}</td>
                        <td>{new Date(cleaning.bookedDate).toLocaleDateString()}</td>
                        <td>{cleaning.type}</td>
                        <td>
                            <button onClick={() => approveCleaning(cleaning.id)}>Approve</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApprovedCleaning;

interface JobDto {
    id: string;
    bookedDate: string;
    type: string;
    message: string;
    status: string;
}
