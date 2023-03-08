import { render, screen } from '@testing-library/react';
import { getPeople } from './api/people';
import App from './App';
import data from './data.json';

test('It should show a six characters of the list from API', async () => {
    const list = await getPeople();
    console.log("Running test async...");
    expect(list.results[6].name).toBe("Beru Whitesun lars");
});

describe("StarsWars", () => {

    beforeAll(() => jest.spyOn(window, 'fetch'));

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

    test('It should show an error when has a network error', async () => {
        window.fetch.mockRejectedValueOnce(new Error('Network error'));

        render(<App />);
        expect(await screen.findByText("Network error")).toBeInTheDocument();
    });
    

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
});
