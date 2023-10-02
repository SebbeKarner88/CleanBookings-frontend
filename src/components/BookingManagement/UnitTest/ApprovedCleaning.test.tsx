import { render, waitFor, screen, act } from '@testing-library/react';
import axios from 'axios';
import ApprovedCleaning from "../ApprovedCleaning";

// Mock axios requests
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
    mockedAxios.get.mockReset();
    mockedAxios.put.mockReset();
});

describe('ApprovedCleaning Component', () => {

    it('should render without crashing', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: [] });

        await act(async () => {
            render(<ApprovedCleaning />);
        });

        expect(screen.getByText('Completed Cleanings'));
    });

    it('should fetch and display completed cleanings', async () => {
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

        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
        expect(screen.getByText('Basic Cleaning'));
    });

    it('should handle approval of a cleaning', async () => {
        const mockData = [{
            id: '1',
            bookedDate: '2023-09-28',
            type: 'Basic Cleaning',
            message: 'Please clean the kitchen thoroughly.',
            status: 'Completed',
        }];

        mockedAxios.get.mockResolvedValueOnce({ data: mockData });
        mockedAxios.put.mockResolvedValueOnce({});

        await act(async () => {
            render(<ApprovedCleaning />);
        });

        const approveButton = screen.getByText('Approve');
        act(() => {
            approveButton.click();
        });

        await waitFor(() => expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/api/v1/job/approve-cleaning/1'));
    });

    it('should handle errors during fetching completed cleanings', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Failed to fetch data'));

        console.error = jest.fn(); // Mocking console.error to check if the error is being logged

        await act(async () => {
            render(<ApprovedCleaning />);
        });

        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
        expect(console.error).toHaveBeenCalledWith('Error fetching data:', expect.any(Error));
    });

    it('should handle errors during approval of a cleaning', async () => {
        const mockData = [{
            id: '1',
            bookedDate: '2023-09-28',
            type: 'Basic Cleaning',
            message: 'Please clean the kitchen thoroughly.',
            status: 'Completed',
        }];

        mockedAxios.get.mockResolvedValueOnce({ data: mockData });
        mockedAxios.put.mockRejectedValueOnce(new Error('Failed to approve cleaning'));

        await act(async () => {
            render(<ApprovedCleaning />);
        });

        const approveButton = screen.getByText('Approve');
        act(() => {
            approveButton.click();
        });

        await waitFor(() => expect(axios.put).toHaveBeenCalledTimes(1));
        expect(console.error).toHaveBeenCalledWith('Error approving cleaning:', expect.any(Error));
    });
});
