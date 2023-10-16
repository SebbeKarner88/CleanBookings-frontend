import { Footer } from "../common/Footer"
import NavBar from "../common/NavBar"
import {useContext, useEffect, useState} from 'react';
// import BookingHistory from '../components/booking-management/BookingHistory';
import { AuthContext } from '../context/AuthContext'
import {useNavigate} from 'react-router-dom';
import CleaningsPerType from "./booking-management/CleaningsPerType.tsx";
import { Button } from "react-bootstrap";
import {getJobsByCustomerId} from "../api/CustomerApi.ts";
import StatusFilter from "./tables/jobs/StatusFilter.tsx";
import JobsTablePlaceholder from "./tables/jobs/JobsTablePlaceholder.tsx";
import {CustomerJobsTable} from "./tables/jobs/CustomerJobsTable.tsx";
import CustomerJobsFiltered from "./tables/jobs/CustomerJobsFiltered.tsx";

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

    const { isAuthenticated, name } = useContext(AuthContext);
    const navigate = useNavigate ();
    const {customerId} = useContext(AuthContext);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<JobStatus[]>(["OPEN", "ASSIGNED", "WAITING_FOR_APPROVAL", "NOT_APPROVED", "APPROVED", "CLOSED"]);
    const [triggerUpdateOfJobs, setTriggerUpdateOfJobs] = useState<boolean>(false);
    const [isLoadingJobsData, setIsLoadingJobsData] = useState<boolean>(true);

    useEffect(() => {
        setIsLoadingJobsData(true);
        fetchJobsData().then(data => {
            setJobs(data);
            setIsLoadingJobsData(false);
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

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('Login');
        }
    }, [isAuthenticated, navigate]);

    const handleOnClick = () => {
        navigate("/gdpr-customer-data")
    }


    {/* TODO: logic to check if user is already logged in, if not, send to log in page */ }

    return (
        <>
            <NavBar />
            <div className="container">
                <h1>Hejsan {name}!</h1>
                <Button variant="primary"
                onClick={handleOnClick}>Inställningar</Button>
                <h2>Dina Bokningar</h2>
                <CleaningsPerType />
                {/*<h2>Dina stängda bokningar</h2>*/}
                {/*<BookingHistory />*/}
                </div>

            {/*<p className="text-info my-3 my-md-0 mx-2 mx-md-3">Signed in as: {username.toLowerCase()}</p>*/}

            <h1 className="text-md-center fw-bold my-3 mb-md-5 mx-2">Cleaner Dashboard</h1>

            <div className="container">
                <h2 className="text-md-center fw-bold my-3 text-info">My assignments</h2>
                <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
                <div className="my-3">
                    {
                        isLoadingJobsData
                            ? <JobsTablePlaceholder/>
                            : <CustomerJobsTable
                                jobs={jobs}
                                statuses={selectedStatus}
                                setTriggerUpdateOfJobs={setTriggerUpdateOfJobs}
                                setIsLoadingJobsData={setIsLoadingJobsData}
                            />
                    }
                </div>
                {/*<div className="my-3">*/}
                {/*    {*/}
                {/*        isLoadingJobsData*/}
                {/*            ? <JobsTablePlaceholder/>   // You can also replace this with a loading spinner or some other placeholder if you want*/}
                {/*            : <CustomerJobsFiltered jobs={jobs} statuses={selectedStatus} />*/}
                {/*    }*/}
                {/*</div>*/}
                <h2 className="text-md-center fw-bold my-3 text-info">My assignments (Alternative Way)</h2>
                <div className="my-3">
                    {
                        isLoadingJobsData
                            ? <JobsTablePlaceholder/>
                            : (
                                <>
                                    {/*<CustomerJobsFiltered jobs={jobs} statuses={selectedStatus} />*/}
                                    <CustomerJobsFiltered jobs={jobs} />
                                    {/*<button onClick={() => setTriggerUpdateOfJobs(true)}>Refresh Jobs</button>*/}
                                </>
                            )
                    }
                </div>
            </div>

            {/* 
            TODO: show the name of the person who's logged in?
            TODO: add the BookedCleanings component
            TODO: add the BookingHistory component */}
            <Footer />
        </>
    )
}

export default MyPages