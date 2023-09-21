export interface Vote {
    person: { 
        email: string;
        firstName: string;
        lastName: string;
        isVotable: boolean;
    };
    Stimmzahl: number;
}