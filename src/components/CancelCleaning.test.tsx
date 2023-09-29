import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CancelCleaning from './CancelCleaning';
import '@testing-library/jest-dom';

//Creates a mock fetch function.
const mockFetch = jest.fn();
//Extend the global object with our mocked fetch.
type ExtendedGlobal = typeof global & {
    fetch: typeof mockFetch;
};
(global as ExtendedGlobal).fetch = mockFetch;

//Starts describing our test suite for the CancelCleaning component.
describe('<CancelCleaning />', () => {
    //After each test, clear all mocks to avoid side effects between tests.
    afterEach(() => {
        jest.clearAllMocks();
    });

    //Test to make sure the cancel button renders correctly.
    it('renders the cancel button', () => {
        render(<CancelCleaning />);
        const buttonElement = screen.getByText(/Avboka städning/i);
        expect(buttonElement);
    });

    //Test to see if the modal is displayed when the cancel button is clicked.
    test('should display modal when "Avboka städning" is clicked', () => {
        render(<CancelCleaning />);

        //Simulate a click on the button.
        fireEvent.click(screen.getByText('Avboka städning'));
        expect(screen.getByText('Är du säker på att du vill avboka?'));
    });

    //Test to check that the modal is hidden when "No" is clicked.
    test('should hide modal when "Nej" is clicked', async () => {
        render(<CancelCleaning />);

        //Simulate a click on the button.
        fireEvent.click(screen.getByText('Avboka städning'));
        fireEvent.click(screen.getByText('Nej'));
        expect(screen.queryByText('Är du säker på att du vill avboka?'));
    });

    //Test to see if a success message is displayed after a successful cancellation.
    test('should display success message after successful cancellation', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ message: 'Städningen har framgångsrikt avbokats.' }),
        });

        render(<CancelCleaning />);

        //Simulate a click on the button.
        fireEvent.click(screen.getByText('Avboka städning'));
        fireEvent.click(screen.getByText('Ja'));

        //Wait for the message to appear on the screen.
        await waitFor(() => screen.getByText('Städningen har framgångsrikt avbokats.'));
        expect(screen.getByText('Städningen har framgångsrikt avbokats.'));
    });

    //Test to see if an error message is displayed after an unsuccessful cancellation.
    test('should display error message after unsuccessful cancellation', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            json: () => Promise.resolve({ message: 'Ett fel inträffade vid avbokningen.' }),
        });

        render(<CancelCleaning />);

        // Simulate a click on the button.
        fireEvent.click(screen.getByText('Avboka städning'));
        fireEvent.click(screen.getByText('Ja'));

        // Wait for the error message to appear on the screen.
        await waitFor(() => screen.getByText('Ett fel inträffade vid avbokningen.'));
        expect(screen.getByText('Ett fel inträffade vid avbokningen.'));
    });
});
