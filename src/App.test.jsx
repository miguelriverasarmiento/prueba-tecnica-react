import { render, screen } from '@testing-library/react';
import App from './App';
import data from './data.json';

describe("StarsWars", () => {
    beforeAll(() => jest.spyOn(window, 'fetch'));

    /*test('It should show a list of characters including Luke Skywalker', () => {
        render(<App />);
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    test('It should show a list of characters from json file', () => {
        render(<App />);

        for (let character of data.results) {
            expect(screen.getByText(character.name)).toBeInTheDocument
        }
    });*/

    test('It should show a list of characters from API', async () => {
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => data,
        });
        render(<App />);
        expect(window.fetch).toHaveBeenCalledTimes(1)
        expect(window.fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/');

        for (let character of data.results) {
            expect(await screen.findByText(character.name)).toBeInTheDocument();
        }
    });
});