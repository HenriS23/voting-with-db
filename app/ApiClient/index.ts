export interface Person {
    email: string
    firstName: string
    lastName: string
    isVotable: boolean;
}

export default class ApiClient {

    public baseUrl: string

    constructor() { 
        this.baseUrl = "http://127.0.0.1:8000";
    }

    public async getPeople(): Promise<Person[]> {

        const res = await fetch(this.baseUrl + '/persons', {
            method: "GET",
        });
        const data = await res.json();

        return data;
    }
    public async createPerson(person: Person): Promise<void> {

        const res = await fetch(this.baseUrl + '/persons', {
            method: "POST",
            body: JSON.stringify(person),
        });
        const data = await res.json();

        return data;
    }
}