
import React, { useState, useEffect, useContext } from "react";
import { getJobsByCustomerId } from "../../../api/CustomerApi.ts";
import { AuthContext } from "../../../context/AuthContext.tsx";
import {handleApproveCleaning, handleDisapproveCleaning} from "../../booking-management/JobApprovalHandlers2";

type JobStatus = "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";

type SelectedStatuses = {
    [key in JobStatus]?: boolean;
}

type Job = {
    jobId: string;
    jobType: string;
    jobStatus: JobStatus;
    jobMessage: string;
    customerId: string;
    employees: string[];
};

const JOB_STATUSES: JobStatus[] = ["OPEN", "ASSIGNED", "WAITING_FOR_APPROVAL", "NOT_APPROVED", "APPROVED", "CLOSED"];

interface CustomerJobsFilteredProps {
    jobs: Job[];
}

const CustomerJobsFiltered: React.FC<CustomerJobsFilteredProps> = ({ jobs }) => {
    const { customerId } = useContext(AuthContext);
    // const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const initialStatuses: SelectedStatuses = {
        OPEN: true,
        ASSIGNED: true,
        WAITING_FOR_APPROVAL: true,
        NOT_APPROVED: true,
        APPROVED: true,
        CLOSED: true
    };
    const [selectedStatuses, setSelectedStatuses] = useState(initialStatuses);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(10); // Show 10 jobs per page.
    // const [cleanings, setCleanings] = useState([]);
    // @ts-ignore
    const [cleanings, setCleanings] = useState<Job[]>([]);
    // @ts-ignore
    const [errorModal, setErrorModal] = useState({ visible: false, message: '' });
    // const updateCleanings = (jobs: any[]) => {
    //     setCleanings(jobs);
    // }

    useEffect(() => {
        async function fetchJobs() {
            const response = await getJobsByCustomerId(customerId);
            if (response) {
                setFilteredJobs(response.data);
            }
        }
        fetchJobs();
    }, [customerId]);

    useEffect(() => {
        const filterJobs = () => {
            const filtered = jobs.filter(job => selectedStatuses[job.jobStatus]);
            setFilteredJobs(filtered);
        };
        filterJobs();
    }, [selectedStatuses]);

    const toggleStatusFilter = (status: JobStatus) => {
        setSelectedStatuses(prev => ({ ...prev, [status]: !prev[status] }));
    };

    const checkAllStatuses = () => {
        setSelectedStatuses(initialStatuses);
    };

    const clearAllStatuses = () => {
        setSelectedStatuses({
            OPEN: false,
            ASSIGNED: false,
            WAITING_FOR_APPROVAL: false,
            NOT_APPROVED: false,
            APPROVED: false,
            CLOSED: false
        });
    };

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredJobs.length / jobsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <div className="d-flex justify-content-center mb-3">
                {JOB_STATUSES.map(status => (
                    <div className="form-check me-3" key={status}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value={status}
                            id={`status-${status}`}
                            checked={!!selectedStatuses[status]}
                            onChange={() => toggleStatusFilter(status)}
                        />
                        <label className="form-check-label" htmlFor={`status-${status}`}>
                            {status}
                        </label>
                    </div>
                ))}
            </div>
            <div className="mb-3">
                <button className="btn btn-primary me-2" onClick={checkAllStatuses}>Check All</button>
                <button className="btn btn-secondary" onClick={clearAllStatuses}>Clear All</button>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Job Id</th>
                    <th scope="col">Job Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Message</th>
                    <th scope="col">Cleaners</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {currentJobs.map(job => (
                    <tr key={job.jobId}>
                        <td>{job.jobId}</td>
                        <td>{job.jobType}</td>
                        <td>{job.jobStatus}</td>
                        <td>{job.jobMessage}</td>
                        <td>{job.employees.join(", ")}</td>
                        {/*<td>*/}
                        {/*    <button onClick={() => handleApproveCleaning(job.jobId, customerId, setCleanings, setErrorModal)}>Approve</button>*/}
                        {/*    <button onClick={() => handleDisapproveCleaning(job.jobId, customerId, setCleanings, setErrorModal)}>Disapprove</button>*/}
                        {/*    /!*<button onClick={() => handleApproveCleaning(job.jobId, customerId, updateCleanings, setErrorModal)}>Approve</button>*!/*/}
                        {/*    /!*<button onClick={() => handleDisapproveCleaning(job.jobId, customerId, updateCleanings, setErrorModal)}>Disapprove</button>*!/*/}
                        {/*</td>*/}
                        <td>
                            {job.jobStatus === "WAITING_FOR_APPROVAL" && (
                                <>
                                    <button onClick={() => handleApproveCleaning(job.jobId, customerId, setCleanings, setErrorModal)}>Approve</button>
                                    <button onClick={() => handleDisapproveCleaning(job.jobId, customerId, setCleanings, setErrorModal)}>Disapprove</button>
                                </>
                            )}
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
            <ul className="pagination justify-content-center mt-3">
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                        <button onClick={() => setCurrentPage(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CustomerJobsFiltered;