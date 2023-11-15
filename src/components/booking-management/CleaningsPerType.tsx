import Button from 'react-bootstrap/Button';
import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Pagination from 'react-bootstrap/Pagination';
import SortJobByStatus from "./SortJobByStatus.tsx";
import { cancelJob, getJobsByStatus, handleCustomerFeedback } from "../../api/CustomerApi.ts";
import { Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import formatDate from "../../utils/formatDate.ts";
import translateStatus from "../../utils/translateStatus.ts";
import translateJobType from "../../utils/translateJobType.ts";
import ConfirmCancelModal from "../modals/ConfirmCancelModal.tsx";
import convertTimeslot from "../../utils/convertTimslot.ts";

export interface Job {
    id: string;
    bookedDate: string;
    timeslot: string;
    type: string;
    message: string;
    status: string;
}

type JobStatus = undefined | "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";

interface ICleaningsPerType {
    onUpdate: () => void;
}

const CleaningsPerType = ({ onUpdate }: ICleaningsPerType) => {
    const { customerId } = useContext(AuthContext);
    const [ selectedStatus, setSelectedStatus ] = useState<JobStatus>(undefined);
    const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => setSelectedStatus(event.target.value as JobStatus);
    const [ cleanings, setCleanings ] = useState<Job[]>([]);
    const [ jobId, setJobId ] = useState<string>("");
    const [ showConfirmModal, setShowConfirmModal ] = useState<boolean>(false);
    const closeConfirmModal = () => setShowConfirmModal(false);
    const [ showConfirmCancelModal, setShowConfirmCancelModal ] = useState<boolean>(false);
    const closeConfirmCancelModal = () => setShowConfirmCancelModal(false);
    const [ errorMessage, setErrorMessage ] = useState<string | undefined>(undefined);
    const [ message, setMessage ] = useState<string>("");
    const [ isSendingRequest, setIsSendingRequest ] = useState<boolean>(false);
    const [ updateNeeded, setUpdateNeeded ] = useState<boolean>(false);

    // Pagination logic
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ jobsPerPage ] = useState<number>(5); // Number of jobs to display per page
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = cleanings.slice(indexOfFirstJob, indexOfLastJob);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleFeedback = useCallback(async (jobId: string, isApproved: boolean, message: string) => {
        setIsSendingRequest(true);
        const response = await handleCustomerFeedback(
            jobId,
            customerId,
            isApproved,
            message
        );
        if (response.status == 200) {
            setIsSendingRequest(false);
            setUpdateNeeded(updateNeeded => !updateNeeded);
            onUpdate();
            closeConfirmModal();
        } else
            setErrorMessage(response?.data);
    }, [ customerId ]);

    const handleCancelRequest = async () => {
        setIsSendingRequest(true);
        const response = await cancelJob(jobId);
        if (response?.status == 204) {
            setIsSendingRequest(false);
            closeConfirmCancelModal();
        } else {
            alert("Något gick fel. Försök igen!");
        }
    }

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
    }, [ customerId, selectedStatus, updateNeeded, isSendingRequest ]
    );

    function renderFeedbackButton(job: Job) {
        return <Button
            variant="dark"
            className="btn-dark-purple"
            onClick={() => {
                setJobId(job.id);
                setShowConfirmModal(true);
            }}
        >
            Lämna återkoppling
        </Button>;
    }

    function renderCancelButton(job: Job) {
        return <Button
            variant="danger"
            onClick={() => {
                setJobId(job.id);
                setShowConfirmCancelModal(true);
            }}
        >
            Avboka förfrågan
        </Button>
    }

    return (
        <>
            <SortJobByStatus selectedStatus={selectedStatus} handleStatusChange={handleStatusChange} />
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
                            <th scope="col">Boknings-ID</th>
                            <th scope="col">Datum</th>
                            <th scope="col">Tid</th>
                            <th scope="col">Städtjänst</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentJobs.filter((job: Job) => ![ "APPROVED", "CLOSED" ].includes(job.status)).map((job: Job) => (
                            <tr key={job.id}>
                                <td>{job.id}</td>
                                <td>{formatDate(job.bookedDate)}</td>
                                <td>{convertTimeslot(job.timeslot)}</td>
                                <td>{translateJobType(job.type)}</td>
                                <td>
                                    {
                                        job.status === "WAITING_FOR_APPROVAL" ? renderFeedbackButton(job) :
                                            job.status === "OPEN" ? renderCancelButton(job)
                                                : translateStatus(job.status)
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-center">
                <Pagination>
                    {Array.from({ length: Math.ceil(cleanings.length / jobsPerPage) }).map(
                        (_, index) => (
                            <Pagination.Item
                                linkStyle={{backgroundColor: 'var(--dark-purple)'}}
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

            <ConfirmCancelModal
                show={showConfirmCancelModal}
                onClose={closeConfirmCancelModal}
                jobId={jobId}
                handleRequest={handleCancelRequest}
                isSendingRequest={isSendingRequest}
            />

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
                        {isSendingRequest ? "Skickar..." : "Ej godkänd"}
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => handleFeedback(jobId, true, message)}
                    >
                        {isSendingRequest ? "Skickar..." : "Godkänd"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CleaningsPerType;