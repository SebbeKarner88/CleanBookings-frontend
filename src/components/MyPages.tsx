import {Footer} from "../common/Footer.tsx"
import NavBar from "../common/NavBar.tsx"
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext'
import CleaningsPerType from "./booking-management/CleaningsPerType.tsx";
import {getJobsByCustomerId} from "../api/CustomerApi.ts";
import StatusFilter from "./tables/jobs/StatusFilter.tsx";
import {CustomerJobsTable} from "./tables/jobs/CustomerJobsTable.tsx";
import CustomerJobsFiltered from "./tables/jobs/CustomerJobsFiltered.tsx";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {IoSettingsOutline} from "react-icons/io5";

type JobStatus = "OPEN" | "ASSIGNED" | "WAITING_FOR_APPROVAL" | "NOT_APPROVED" | "APPROVED" | "CLOSED";

interface Job {
    jobId: string,
    jobType: string,
    jobStatus: JobStatus,
    jobMessage: string,
    customerId: string,
    employees: string[]
}

function MyPages() {
    const {customerId, username} = useContext(AuthContext);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<JobStatus[]>(["OPEN", "ASSIGNED", "WAITING_FOR_APPROVAL", "NOT_APPROVED", "APPROVED", "CLOSED"]);
    const [triggerUpdateOfJobs, setTriggerUpdateOfJobs] = useState<boolean>(false);

    useEffect(() => {
        fetchJobsData().then(data => {
            setJobs(data);
        });
    }, [triggerUpdateOfJobs]);

    async function fetchJobsData() {
        try {
            const response = await getJobsByCustomerId(customerId);
            if (response?.status == 200)
                return response.data;
            else
                return [];
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <NavBar/>
            <p className="text-end my-3 mx-2 mx-md-5">Signed in as: {username || 'N/A'}</p>

            <div className="container text-md-start">
                <div className="d-flex justify-content-between">
                    <h1 className="fw-bold my-3 mb-md-5 mx-2 mx-md-0">My pages</h1>

                    <Link to="/my-pages/settings">
                        <Button size="lg" variant="btn-link" className="btn-dark-purple m-3">
                            <IoSettingsOutline
                                color="var(--beige)"
                                size={30}
                                aria-label="Inställningar" />
                        </Button>
                    </Link>
                </div>

                <h2 className="fw-bold my-3">My bookings (1)</h2>
                <CleaningsPerType/>

                <h2 className="fw-bold my-3">My bookings (2)</h2>
                <StatusFilter
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                />
                <div className="my-3">
                    <CustomerJobsTable
                        jobs={jobs}
                        statuses={selectedStatus}
                        setTriggerUpdateOfJobs={setTriggerUpdateOfJobs}
                    />
                </div>

                <h2 className="fw-bold my-3">My bookings (3)</h2>
                <div className="my-3">
                    <CustomerJobsFiltered jobs={jobs}/>
                </div>

            </div>
            <Footer/>
        </>
    )
}

export default MyPages