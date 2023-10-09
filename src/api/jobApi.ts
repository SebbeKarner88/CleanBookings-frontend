import api from "./ApiRootUrl.ts";

export const fetchBookedCleanings = async (customerId: string) => {
    return await api.get(`/job/booked-cleanings/${customerId}`);
};

export const fetchCompletedCleanings = async () => {
    return await api.get('/job/completed-cleanings');
};

export const approveCleaning = async (jobId: string, feedback: string) => {
    return await api.put('/job/approve-fail-cleaning', { jobId, feedback });
};

export const disapproveCleaning = async (jobId: string, feedback: string) => {
    return await api.put('/job/reissue-failed-cleaning', { jobId, feedback });
};
