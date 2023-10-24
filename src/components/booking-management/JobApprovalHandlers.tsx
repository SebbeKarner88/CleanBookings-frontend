import api from '../../api/ApiRootUrl';

interface JobApproveRequest {
    jobId: string;
    customerId: string;
    message?: string;
    isApproved?: boolean;
}

export const handleApproveCleaning = async (
    bookingId: string,
    customerId: string,
    message: string,
    setErrorModal: (modal: {visible: boolean, message: string}) => void
) => {
    try {
        const requestPayload: JobApproveRequest = {
            jobId: bookingId,
            customerId: customerId,
            isApproved: true,
            message: message
        };

        const response = await api.put(`/job/approve-fail-cleaning`, requestPayload, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

    } catch (error) {
        console.error("Error:", error.response?.data);
        setErrorModal({visible: true, message: error.response?.data || 'Ett okänt fel inträffade.'});
    }
};

export const handleDisapproveCleaning = async (
    bookingId: string,
    customerId: string,
    message: string,
    setCleanings: (jobs: any[]) => void,
    setErrorModal: (modal: {visible: boolean, message: string}) => void
) => {
    try {
        const requestPayload: JobApproveRequest = {
            jobId: bookingId,
            customerId: customerId,
            isApproved: false,
            message: message
        };

        const response = await api.put(`/job/approve-fail-cleaning`, requestPayload, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

    } catch (error) {
        console.error("Error:", error.response?.data);
        setErrorModal({visible: true, message: error.response?.data || 'Ett okänt fel inträffade.'});
    }
};
