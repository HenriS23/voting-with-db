"use client"

import * as React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Person } from "@/models/person"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getPersons } from "@/app/queries/queries"

import persons from "./../lib/data/persons.json"

export function ResultsTable() {
    const [isLoading, setIsLoading] = useState(true)
    const [persons, setPersons] = useState<Person[]>([])

    useEffect(() => {
        getPersons().then((persons): void => {
            setIsLoading(false)
            setPersons(persons)
        })
    }, [])

    const totalVoteCount = (persons ?? []).reduce((total, person) => {
        return total + person.votes
    }, 0)

    return (
        <Table>
            <TableCaption>Only people with votes appear here.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[60px]">Votes</TableHead>
                    <TableHead className="w-[80px]">%</TableHead>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading ? (
                    <TableRow>
                        <TableCell colSpan={2}>loading ...</TableCell>
                    </TableRow>
                ) : persons.length < 1 ? (
                    <TableRow>
                        <TableCell colSpan={4}>No people found.</TableCell>
                    </TableRow>
                ) : (
                    persons
                        .filter((person) => person.votes > 0)
                        .sort((a, b) => b.votes - a.votes)
                        .map((person) => {
                            return (
                                <TableRow key={person.email}>
                                    <TableCell className="font-medium">
                                        {person.votes}
                                    </TableCell>
                                    <TableCell>{`${(
                                        (person.votes / totalVoteCount) *
                                        100
                                    ).toFixed(1)}%`}</TableCell>
                                    <TableCell>{person.firstname}</TableCell>
                                    <TableCell>{person.lastname}</TableCell>
                                </TableRow>
                            )
                        })
                )}
            </TableBody>
        </Table>
    )
}
