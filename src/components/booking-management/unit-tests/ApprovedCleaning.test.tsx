import { render, waitFor, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import ApprovedCleaning from "../ApprovedCleaning";

//Mocking axios to avoid actual HTTP requests during testing.
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

//Resetting the mocked axios methods before each test to ensure a clean setup.
beforeEach(() => {
    mockedAxios.get.mockReset();
    mockedAxios.put.mockReset();
});

//Grouping tests for the ApprovedCleaning component.
describe('ApprovedCleaning Component', () => {

    //Test for initial rendering of the component.
    it('should render without crashing', async () => {
        //Mocking the GET request with an empty list.
        mockedAxios.get.mockResolvedValueOnce({ data: [] });

        //Rendering the component inside an asynchronous act to handle state updates.
        await act(async () => {
            render(<ApprovedCleaning />);
        });

        //Checking if the header text is present in the document.
        expect(screen.getByText('Completed Cleanings'));
    });

    //Test for fetching and displaying the completed cleanings.
    it('should fetch and display completed cleanings', async () => {
        //Mock data to simulate the fetched cleanings.
        const mockData = [{
            id: '1',
            bookedDate: '2023-09-28',
            type: 'Basic Cleaning',
            message: 'Please clean the kitchen thoroughly.',
            status: 'Completed',
        }];

        //Mocking the GET request to return the mock data.
        mockedAxios.get.mockResolvedValueOnce({ data: mockData });

        //Rendering the component.
        await act(async () => {
            render(<ApprovedCleaning />);
        });

        //Expecting the axios GET method to have been called once.
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

        //Checking if the mock data's cleaning type is displayed.
        expect(screen.getByText('Basic Cleaning'));
    });

    //Test to ensure that the component handles the approval of a cleaning.
    it('should handle approval of a cleaning', async () => {
        const mockData = [{
            id: '1',
            bookedDate: '2023-09-28',
            type: 'Basic Cleaning',
            message: 'Please clean the kitchen thoroughly.',
            status: 'Completed',
        }];

        mockedAxios.get.mockResolvedValueOnce({ data: mockData });
        //Mocking the PUT request to simulate a successful approval.
        mockedAxios.put.mockResolvedValueOnce({ /* your mocked response here */ });

        await act(async () => {
            render(<ApprovedCleaning />);
        });

        //Simulating a button click to open the approval modal.
        const approveButton = screen.getByText('Approve');
        act(() => {
            approveButton.click();
        });

        // Simulate entering feedback.
        const feedbackTextarea = screen.getByPlaceholderText("Enter positive feedback...");
        act(() => {
            fireEvent.change(feedbackTextarea, { target: { value: 'Great job!' } });
        });

        // Click the 'Submit Feedback' button to approve the cleaning.
        const submitButton = screen.getByText('Submit Feedback');
        act(() => {
            submitButton.click();
        });

        //Expecting the axios PUT method to have been called with the correct endpoint.
        await waitFor(() => expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/api/v1/job/approve-cleaning/1', {"feedback": "Great job!"}));
    });

    //Test to handle potential errors during the fetching of completed cleanings.
    it('should handle errors during fetching completed cleanings', async () => {
        //Mocking a rejected GET request to simulate an error.
        mockedAxios.get.mockRejectedValueOnce(new Error('Failed to fetch data'));

        //Mocking console.error to check later if the error is being logged.
        console.error = jest.fn();

        await act(async () => {
            render(<ApprovedCleaning />);
        });

        //Expecting the axios GET method to have been called once.
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

        //Verifying that the error was logged to the console.
        expect(console.error).toHaveBeenCalledWith('Error fetching data:', expect.any(Error));
    });

    //Test to handle potential errors during the approval of a cleaning.
    it('should handle approval of a cleaning', async () => {
        const mockData = [{
            id: '1',
            bookedDate: '2023-09-28',
            type: 'Basic Cleaning',
            message: 'Please clean the kitchen thoroughly.',
            status: 'Completed',
        }];
        mockedAxios.get.mockResolvedValueOnce({ data: mockData });
        //Mocking the PUT request to simulate a successful approval.
        mockedAxios.put.mockResolvedValueOnce({ /* your mocked response here */ });

        await act(async () => {
            render(<ApprovedCleaning />);
        });
        //Simulating a button click to approve a cleaning.
        const approveButton = screen.getByText('Approve');
        fireEvent.click(approveButton);

        //Expecting the axios PUT method to have been called with the correct endpoint.
        await waitFor(() => expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/api/v1/job/approve-cleaning/1'));
    });

    //Test when there are no completed cleanups.
    it('should handle no completed cleanings', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: [] });

        await act(async () => {
            render(<ApprovedCleaning />);
        });

        //Verifying no cleanings are displayed
        expect(screen.queryByText('Basic Cleaning')).toBeNull();
    });

    //Test closing modal window.
    it('should close the modal without submitting feedback', async () => {
        const mockData = [{
            id: '1',
            bookedDate: '2023-09-28',
            type: 'Basic Cleaning',
            message: 'Please clean the kitchen thoroughly.',
            status: 'Completed',
        }];

        mockedAxios.get.mockResolvedValueOnce({ data: mockData });
        await act(async () => {
            render(<ApprovedCleaning />);
        });

        const approveButton = screen.getByText('Approve');
        fireEvent.click(approveButton);

        const closeButton = screen.getByText('Close');
        fireEvent.click(closeButton);

        //Modal should no longer be visible.
        expect(screen.queryByText('Approve Cleaning for 1')).toBeNull();
    });

    //Test potential errors during approval of a cleanup.
    it('should handle errors during the approval of a cleaning', async () => {
        const mockData = [{
            id: '1',
            bookedDate: '2023-09-28',
            type: 'Basic Cleaning',
            message: 'Please clean the kitchen thoroughly.',
            status: 'Completed',
        }];

        mockedAxios.get.mockResolvedValueOnce({ data: mockData });
        mockedAxios.put.mockRejectedValueOnce(new Error('Failed to approve cleaning'));
        console.error = jest.fn();

        await act(async () => {
            render(<ApprovedCleaning />);
        });

        const approveButton = screen.getByText('Approve');
        fireEvent.click(approveButton);

        const feedbackTextarea = screen.getByPlaceholderText("Enter positive feedback...");
        fireEvent.change(feedbackTextarea, { target: { value: 'Great job!' } });

        const submitButton = screen.getByText('Submit Feedback');
        fireEvent.click(submitButton);

        //Expecting the axios PUT method to have been called once.
        await waitFor(() => expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/api/v1/job/approve-cleaning/1', {"feedback": "Great job!"}));

        //Verifying that the error was logged to the console.
        expect(console.error).toHaveBeenCalledWith('Error approving cleaning:', expect.any(Error));
    });

});
