"use server"

import { Person } from "@/models/person"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getPersons(): Promise<Person[]> {
    const persons = await prisma.person.findMany()
    return persons ?? []
}

export async function voteForPerson(id: string): Promise<Person> {
    try {
        // Retrieve the person from the database
        const person = await prisma.person.findUnique({
            where: {
                id: id,
            },
        })

        // If the person exists, increment their votes by one and update the database
        if (person) {
            await prisma.person.update({
                where: {
                    id: id,
                },
                data: {
                    votes: person.votes + 1,
                },
            })
        } else {
            throw new Error("Person not found")
        }
        return person
    } catch (error) {
        console.error("Error increasing votes:", error)
        throw error
    }
}

export async function addPerson(
    email: string,
    firstname: string,
    lastname: string,
    votable: boolean
) {
    try {
        const newPerson = await prisma.person.create({
            data: {
                email,
                firstname,
                lastname,
                votable,
                votes: 0,
            },
        })

        return newPerson
    } catch (error) {
        console.error("Error adding person:", error)
        throw error
    }
}
