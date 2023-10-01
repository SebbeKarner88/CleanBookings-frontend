import { render, waitFor, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import BookedCleanings from "../BookedCleanings";

//Mock the axios module to prevent actual HTTP requests and control the responses.
jest.mock('axios');
//Cast axios to its mocked version, allowing for detailed assertions and controls over its behavior.
const mockedAxios = axios as jest.Mocked<typeof axios>;

//Before each test runs, reset any mocked responses to ensure a clean slate for each test.
beforeEach(() => {
    mockedAxios.get.mockReset();
});

//Grouping related tests for the BookedCleanings Component
describe('BookedCleanings Component', () => {
    //Test to check if the component renders without any issues
    it('should render without crashing', async () => {
        //Mocking axios to resolve with empty data when called
        mockedAxios.get.mockResolvedValueOnce({ data: [] });

        //Wrapping render in act to make sure all state updates and side effects are finished before assertions.
        await act(async () => {
            render(
                //Use MemoryRouter to mock router functionality required by the component or any of its children.
                <MemoryRouter initialEntries={['/some-route']}>
                    <BookedCleanings />
                </MemoryRouter>
            );
        });
    });

    //Test to check if the component can fetch and display the bookings.
    it('should fetch and display booked cleanings', async () => {
        //Mock data representing booked cleanings.
        const mockData = [{
            id: '1',
            bookedDate: '2023-09-28',
            type: 'Basic Cleaning',
            message: 'Please clean the kitchen thoroughly.',
            status: 'Booked',
        }];

        //Mocking axios to resolve with the mockData when called.
        mockedAxios.get.mockResolvedValueOnce({ data: mockData });

        await act(async () => {
            render(
                <MemoryRouter initialEntries={['/some-route']}>
                    <BookedCleanings />
                </MemoryRouter>
            );
        });

        //After rendering, wait until axios has been called once.
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
        //Assertion to check if the data from the mockData is displayed in the component.
        expect(screen.getByText('Basic Cleaning'));
    });

    //Test to check how the component handles errors when fetching bookings.
    it('should handle errors during fetching booked cleanings', async () => {
        //Mocking axios to reject with an error when called.
        mockedAxios.get.mockRejectedValueOnce(new Error('Some error occurred'));

        //Mock console.error to track if errors are logged.
        console.error = jest.fn();

        await act(async () => {
            render(
                <MemoryRouter initialEntries={['/some-route']}>
                    <BookedCleanings />
                </MemoryRouter>
            );
        });

        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
        //Assertion to check if the expected error message was logged.
        expect(console.error).toHaveBeenCalledWith('Error fetching data:', expect.any(Error));
    });
});
