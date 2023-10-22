
import React, {useContext, useEffect, useState} from 'react';
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Pagination from 'react-bootstrap/Pagination';
import MyModal from "../../common/MyModal";
import {handleApproveCleaning, handleDisapproveCleaning} from "./JobApprovalHandlers";
import ActionHandlerModal from "../modals/ActionHandlerModal";
const CleaningsPerType: React.FC = () => {
    // const  customerId  = "a02d79b0-9402-4b56-9def-ec2544be0afd";
    // const  isAuthenticated  = true;
    const { customerId, isAuthenticated } = useContext(AuthContext);
    const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
    const [cleanings, setCleanings] = useState<JobDto[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1); // Current page number
    const [jobsPerPage] = useState<number>(5); // Number of jobs to display per page
    const [errorModal, setErrorModal] = useState<{visible: boolean, message: string}>({visible: false, message: ""});
    const [actionModal, setActionModal] = useState<{
        show: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
    }>({
        show: false,
        title: '',
        message: '',
        onConfirm: () => {}
    });
    const handleConfirmApprove = (bookingId: string) => {
        handleApproveCleaning(bookingId, customerId, "Ditt meddelande här", setCleanings, setErrorModal);
        setActionModal({ ...actionModal, show: false });
    };

    const handleConfirmDisapprove = (bookingId: string) => {
        handleDisapproveCleaning(bookingId, customerId, "Ditt meddelande här", setCleanings, setErrorModal);
        setActionModal({ ...actionModal, show: false });
    };

    const promptApprove = (bookingId: string) => {
        setActionModal({
            show: true,
            title: 'Bekräfta Godkännande',
            message: 'Är du säker på att du vill godkänna?',
            onConfirm: () => handleConfirmApprove(bookingId)
        });
    };

    const promptDisapprove = (bookingId: string) => {
        setActionModal({
            show: true,
            title: 'Bekräfta Nekande',
            message: 'Är du säker på att du vill neka?',
            onConfirm: () => handleConfirmDisapprove(bookingId)
        });
    };
    // Job status options
    const jobStatusOptions = [
        'OPEN',
        'ASSIGNED',
        'WAITING_FOR_APPROVAL',
        'NOT_APPROVED',
        'APPROVED',
        'CLOSED',
        ];

    useEffect(() => {
        if (!customerId) {
            return; // Ensure customerId is available
        }

/*         console.log('customerId:', customerId);
        console.log('selectedStatus:', selectedStatus);
        console.log('isAuthenticated:', isAuthenticated); */

        if (isAuthenticated) {
            let statusValue = selectedStatus;

            // Handle the "ALL" option
            if (selectedStatus === "ALL") {
                statusValue = "";
            }

            // Fetch cleanings based on the selected status and customer ID
            axios.get(`http://localhost:8080/api/v1/job/cleanings/${customerId}?status=${statusValue}`)
                .then((response) => {
                    setCleanings(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [customerId, selectedStatus, isAuthenticated]);

    const closeErrorModal = () => {
        setErrorModal({visible: false, message: ""});
    };



    // Pagination logic
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = cleanings.slice(indexOfFirstJob, indexOfLastJob);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-4">
            <div className="form-group">
                <label htmlFor="statusSelect">Select Job Status:</label>
                <select
                    id="statusSelect"
                    className="form-control"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <option value="ALL">ALL</option>
                    {jobStatusOptions.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>
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
                {currentJobs.map((booking) => (
                    <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{new Date(booking.bookedDate).toLocaleDateString()}</td>
                        <td>{booking.type}</td>
                        <td>
                            <button onClick={() => promptApprove(booking.id)}>Approve</button>
                            <button onClick={() => promptDisapprove(booking.id)}>Disapprove</button>
                        </td>
                        <ActionHandlerModal
                            show={actionModal.show}
                            title={actionModal.title}
                            message={actionModal.message}
                            onConfirm={actionModal.onConfirm}
                            onCancel={() => setActionModal({ ...actionModal, show: false })}
                        />
                    </tr>
                ))}
                </tbody>
            </table>
            {/* Pagination */}
            <div className="d-flex justify-content-center">
                <Pagination>
                    {Array.from({ length: Math.ceil(cleanings.length / jobsPerPage) }).map(
                        (_, index) => (
                            <Pagination.Item
                                key={index}
                                active={index + 1 === currentPage}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        )
                    )}
                </Pagination>
            </div>
            <MyModal
                header="Error"
                description={errorModal.message}
                modalVisible={errorModal.visible}
                onRequestClose={closeErrorModal}
            />
        </div>
    );
};

export default CleaningsPerType;

interface JobDto {
    id: string;
    bookedDate: string;
    type: string;
    message: string;
    status: string;
}