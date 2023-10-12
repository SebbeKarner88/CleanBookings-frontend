import axios from 'axios';

interface JobApproveRequest {
    jobId: string;
    customerId: string;
    message?: string;
    isApproved?: boolean;
}

const BASE_URL = 'http://localhost:8080/api/v1/job';

export const handleApproveCleaning = async (
    bookingId: string,
    customerId: string,
    setCleanings: (jobs: any[]) => void,
    setErrorModal: (modal: {visible: boolean, message: string}) => void
) => {
    try {
        const requestPayload: JobApproveRequest = {
            jobId: bookingId,
            customerId: customerId,
            isApproved: true
        };

        const response = await axios.put(`${BASE_URL}/approve-fail-cleaning`, requestPayload, {
            headers: {
                'Content-Type': 'application/json',
            }

        });

        const updatedCleanings = response.data;
        setCleanings(updatedCleanings);

    } catch (error) {
        console.error("Error:", error.response.data);
        setErrorModal({visible: true, message: error.response.data || 'Ett okänt fel inträffade.'});
    }
};

export const handleDisapproveCleaning = async (
    bookingId: string,
    customerId: string,
    setCleanings: (jobs: any[]) => void,
    setErrorModal: (modal: {visible: boolean, message: string}) => void

) => {
    try {
        const requestPayload: JobApproveRequest = {
            jobId: bookingId,
            customerId: customerId,
            isApproved: false
        };

        const response = await axios.put(`${BASE_URL}/approve-fail-cleaning`, requestPayload, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const updatedCleanings = response.data;
        setCleanings(updatedCleanings);

    } catch (error) {
        console.error("Error:", error.response.data);
        setErrorModal({visible: true, message: error.response.data || 'Ett okänt fel inträffade.'});
    }
};
