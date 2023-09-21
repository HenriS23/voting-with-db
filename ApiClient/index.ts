import { Person } from "@/models/person";
import { Vote } from "@/models/vote";

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

    public async getVotes(): Promise<Vote[]> {

        const res = await fetch(this.baseUrl + '/vote', {
            method: "GET",
        });
        const data = await res.json();

        return data;
    }

    public async voteForPerson(person: Person): Promise<void> {

        const res = await fetch(this.baseUrl + '/vote', {
            method: "POST",
            body: JSON.stringify(person),
        });
        const data = await res.json();

        return data;
    }
}