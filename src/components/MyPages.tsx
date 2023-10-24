import {Footer} from "../common/Footer.tsx"
import NavBar from "../common/NavBar.tsx"
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext'
import CleaningsPerType from "./booking-management/CleaningsPerType.tsx";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {IoSettingsOutline} from "react-icons/io5";
import '../styles/MyPages.css'
import {getJobsByStatus} from "../api/CustomerApi.ts";
import ClosedJobsTable from "./tables/jobs/ClosedJobsTable.tsx";

interface Job {
    id: string;
    bookedDate: string;
    type: string;
    message: string;
    status: string;
}

function MyPages() {
    const {customerId, username} = useContext(AuthContext);
    const navigate = useNavigate();
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        fetchJobs().then(data => setJobs(data));

        async function fetchJobs() {
            try {
                const response = await getJobsByStatus(customerId);
                if (response?.status == 200)
                    return response.data;
            } catch (error) {
                console.error(error);
            }
        }
    }, [customerId]);

    return (
        <>
            <NavBar/>
            <div className="bg-image min-vw-100 py-4 text-start">
                <h1 className="fw-bold my-4 mx-2 text-center text-white">Mina sidor</h1>
                <div className="container bg-light-brown p-4 rounded rounded-4 shadow">
                    <div className="d-flex justify-content-between">
                        <p className="my-3 mx-2 mx-md-0">
                            Inloggad som: <span className="fw-bold">{username}</span>
                        </p>
                        <Button
                            size="lg"
                            variant="btn-link"
                            className="btn-dark-purple m-3 focus-ring focus-ring-dark"
                            onClick={() => navigate("/my-pages/settings")}
                        >
                            <IoSettingsOutline
                                color="var(--beige)"
                                size={30}
                                aria-label="Inställningar"/>
                        </Button>
                    </div>
                    <h2 className="fw-bold my-3">Pågående städjobb</h2>
                    {/* TODO: Add dependency to update jobs-data when approving/disapproving a job */}
                    <CleaningsPerType />
                    <h2 className="fw-bold my-3">Tidigare städjobb</h2>
                    <ClosedJobsTable jobs={jobs} />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default MyPages