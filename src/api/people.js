export async function getPeople() {
    const res = await fetch('https://swapi.dev/api/people/');
    const data = await res.json();
    return data;
}