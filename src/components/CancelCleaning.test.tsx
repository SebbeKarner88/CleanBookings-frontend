import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CancelCleaning from './CancelCleaning';
import '@testing-library/jest-dom';  // Importerar jest-dom direkt.

// Definiera en explicit mock för fetch.
const mockFetch = jest.fn();
type ExtendedGlobal = typeof global & {
    fetch: typeof mockFetch;
};
(global as ExtendedGlobal).fetch = mockFetch;

describe('<CancelCleaning />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the cancel button', () => {
        render(<CancelCleaning />);
        const buttonElement = screen.getByText(/Avboka städning/i);
        expect(buttonElement).toBeInTheDocument();
    });

    test('should display modal when "Avboka städning" is clicked', () => {
        render(<CancelCleaning />);

        fireEvent.click(screen.getByText('Avboka städning'));
        expect(screen.getByText('Är du säker på att du vill avboka?')).toBeInTheDocument();
    });

    test('should hide modal when "Nej" is clicked', async () => {
        render(<CancelCleaning />);

        fireEvent.click(screen.getByText('Avboka städning'));
        fireEvent.click(screen.getByText('Nej'));

        expect(screen.queryByText('Är du säker på att du vill avboka?')).not.toBeInTheDocument();
    });

    test('should display success message after successful cancellation', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ message: 'Städningen har framgångsrikt avbokats.' }),
        });

        render(<CancelCleaning />);

        fireEvent.click(screen.getByText('Avboka städning'));
        fireEvent.click(screen.getByText('Ja'));

        // Väntar på att asynkrona operationer slutförs.
        await waitFor(() => screen.getByText('Städningen har framgångsrikt avbokats.'));

        expect(screen.getByText('Städningen har framgångsrikt avbokats.')).toBeInTheDocument();
    });

});
