export async function getPeople() {
    try {
        const response = await fetch('https://swapi.dev/api/people/');
            if (!response.ok) {
                throw new NetworkError();
        }
        const data = await response.json();
        return data;
    } catch (err) {
        throw err;
    }
}

export async function getCharacter(id = 1) {
    try {
        const response = await fetch(`https://swapi.dev/api/people/${id}`)
        if (!response.ok) {
            throw new NetworkError();
        }
        const data = await response.json();
        return data;
    } catch (err) {
        throw err;
    }
}

export async function getCurrentSearch(name) {
    try {
        const response = await fetch(`https://swapi.dev/api/people/?search=${name}`)
        if (!response.ok) {
            throw new NetworkError();
        }
        const data = await response.json();
        return data;
    } catch (err) {
        throw err;
    }
}

class NetworkError extends Error {
    constructor() {
        super('Network error');
    }
}