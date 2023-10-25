import Button from 'react-bootstrap/Button';
import {ChangeEvent, useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import Pagination from 'react-bootstrap/Pagination';
import SortJobByStatus from "./SortJobByStatus.tsx";
import {getJobsByStatus, handleCustomerFeedback} from "../../api/CustomerApi.ts";
import {Alert} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

type JobStatus = undefined | "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";

interface Job {
    id: string;
    bookedDate: string;
    type: string;
    message: string;
    status: string;
}

const CleaningsPerType = () => {
    const {customerId} = useContext(AuthContext);
    const [selectedStatus, setSelectedStatus] = useState<JobStatus>(undefined);
    const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => setSelectedStatus(event.target.value as JobStatus);
    const [cleanings, setCleanings] = useState<Job[]>([]);
    const [jobId, setJobId] = useState<string>("");
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const closeConfirmModal = () => setShowConfirmModal(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [message, setMessage] = useState<string>("");
    const [updateNeeded, setUpdateNeeded] = useState<boolean>(false);
    const [isSendingFeedback, setIsSendingFeedback] = useState<boolean>(false);

    // Pagination logic
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [jobsPerPage] = useState<number>(5); // Number of jobs to display per page
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = cleanings.slice(indexOfFirstJob, indexOfLastJob);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleFeedback = useCallback(async (jobId: string, isApproved: boolean, message: string) => {
        setIsSendingFeedback(true);
        const response = await handleCustomerFeedback(
            jobId,
            customerId,
            isApproved,
            message
        );
        if (response.status == 200) {
            setIsSendingFeedback(false);
            setUpdateNeeded(updateNeeded => !updateNeeded);
            closeConfirmModal();
        } else
            setErrorMessage(response?.data);
    }, [customerId]);

    useEffect(() => {
            const fetchJobsByStatus = async () => {
                try {
                    const response = await getJobsByStatus(
                        customerId,
                        selectedStatus
                    );
                    if (response?.status === 200)
                        return response.data;
                } catch (error) {
                    console.error(error);
                }
            }
            fetchJobsByStatus().then(data => setCleanings(data));
        }, [customerId, selectedStatus, updateNeeded]
    );

    return (
        <div className="container">
            <SortJobByStatus selectedStatus={selectedStatus} handleStatusChange={handleStatusChange}/>
            {
                errorMessage != undefined &&
                <Alert
                    dismissible={true}
                    variant="danger"
                    onClose={() => setErrorMessage(undefined)}
                >
                    {errorMessage}
                </Alert>
            }
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Boknings ID</th>
                        <th scope="col">Datum</th>
                        <th scope="col">Städtjänst</th>
                        <th scope="col">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentJobs.filter((job: Job) => !["APPROVED", "CLOSED"].includes(job.status)).map((job: Job) => (
                        <tr key={job.id}>
                            <td>{job.id}</td>
                            <td>{new Date(job.bookedDate).toLocaleDateString()}</td>
                            <td>{job.type}</td>
                            <td>
                                {
                                    job.status === "WAITING_FOR_APPROVAL"
                                        ?
                                            <Button
                                                variant="dark"
                                                className="btn-dark-purple"
                                                onClick={() => {
                                                    setJobId(job.id);
                                                    setShowConfirmModal(true);
                                                }}
                                            >
                                                Lämna återkoppling
                                            </Button>
                                        : job.status
                                }
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-center">
                <Pagination>
                    {Array.from({length: Math.ceil(cleanings.length / jobsPerPage)}).map(
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

            {/* TODO: Extract modal to separate component... */}
            <Modal
                show={showConfirmModal}
                onHide={closeConfirmModal}
                fullscreen="md-down"
            >
                <Modal.Header
                    closeButton
                    closeVariant="white"
                    className="bg-dark-purple text-beige border-0"
                >
                    <Modal.Title className="fs-5 fw-bold">
                        Bekräfta ditt val
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-light-brown">
                    <p>Vill du godkänna detta jobb?</p>
                    <div>
                        <label htmlFor="message" className="form-label fw-semibold">
                            Meddelande (frivilligt)
                            <div className="form-text">
                                Lämna eventuell återkoppling här
                            </div>
                        </label>
                        <textarea
                            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setMessage(event.target.value)}
                            className="form-control"
                            id="message"
                            rows={4}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer className="bg-light-brown border-0">
                    <Button variant="danger" onClick={() => handleFeedback(jobId, false, message)}>
                        {isSendingFeedback ? "Skickar..." : "Ej godkänd"}
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => handleFeedback(jobId, true, message)}
                    >
                        {isSendingFeedback ? "Skickar..." : "Godkänd"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CleaningsPerType;