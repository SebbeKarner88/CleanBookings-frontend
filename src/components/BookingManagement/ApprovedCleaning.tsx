import React, { useEffect, useState } from 'react';
import axios from 'axios';

//React functional component for displaying and handling approved cleanings.
const ApprovedCleaning: React.FC = () => {
    //Using React's useState hook to maintain a list of completed cleanings.
    const [completedCleanings, setCompletedCleanings] = useState<JobDto[]>([]);

    //useEffect hook to run side effects, in this case, to fetch the list of completed cleanings when the component mounts.
    useEffect(() => {
        //Making a GET request using axios to fetch completed cleanings.
        axios.get('http://localhost:8080/api/v1/job/completed-cleanings')
            .then((response) => {
                //Updating the component's state with the fetched data.
                setCompletedCleanings(response.data);
            })
            .catch((error) => {
                // Logging an error if the request fails.
                console.error("Error fetching data:", error);
            });
    }, []);

    //Function to handle the approval of a cleaning.
    const approveCleaning = (id: string) => {
        //Making a PUT request to approve the cleaning by its ID.
        axios.put(`http://localhost:8080/api/v1/job/approve-cleaning/${id}`)
            .then(() => {
                //Once approved, we remove the cleaning from our list (i.e., it's no longer in the 'completed' status).
                setCompletedCleanings(prev => prev.filter(cleaning => cleaning.id !== id));
            })
            .catch((error) => {
                //Logging an error if the request fails.
                console.error("Error approving cleaning:", error);
            });
    };

    //Rendering the component's JSX.
    return (
        <div className="container mt-4">
            <h1 className="text-center">Completed Cleanings</h1>
            {/*<Link to={`/booked-cleanings/${customerId}`}>See Booked Cleanings</Link>*/}

            {/* Table to display the list of completed cleanings */}
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
                {/* Renew through the completed cleanings and displays them in table rows. */}
                {completedCleanings.map((cleaning) => (
                    <tr key={cleaning.id}>
                        <td>{cleaning.id}</td>
                        <td>{new Date(cleaning.bookedDate).toLocaleDateString()}</td>
                        <td>{cleaning.type}</td>
                        <td>
                            {/* Button to approve a cleaning. When clicked, it invokes the approveCleaning function with the cleaning's ID */}
                            <button onClick={() => approveCleaning(cleaning.id)}>Approve</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

//Exporting the component for use in other parts of the application.
export default ApprovedCleaning;

//TypeScript interface to define the structure of a job/cleaning.
interface JobDto {
    id: string;
    bookedDate: string;
    type: string;
    message: string;
    status: string;
}
