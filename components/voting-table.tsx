"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { Person } from "@/models/person"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { getPersons, voteForPerson } from "@/app/queries/queries"

export function VotingTable() {
    const [isLoading, setIsLoading] = useState(true)
    const [persons, setPersons] = useState<Person[]>([])

    useEffect(() => {
        getPersons().then((persons): void => {
            setIsLoading(false)
            setPersons(persons)
        })
    }, [])
    const { toast } = useToast()

    // Filter out people where isVotable is false
    const votablePeople = persons?.filter((person) => person.votable)

    const [open, setOpen] = useState(false)
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

    const handleRowClick = (person: Person) => {
        setSelectedPerson(person)
        setOpen(true)
        console.log("Table row clicked!")
    }

    const voteFor = (selectedPerson: Person) => {
        voteForPerson(selectedPerson.id).then((votedForPerson): void => {
            toast({
                title: "Successfully Voted",
                description: `${votedForPerson.firstname} ${votedForPerson.lastname}`,
            })
            setOpen(false)
        })
    }

    const closeDialog = () => {
        setOpen(false)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild></DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            Vote for {selectedPerson?.firstname}{" "}
                            {selectedPerson?.lastname}
                        </DialogTitle>
                        <DialogDescription>
                            Do you want to vote for {selectedPerson?.firstname}{" "}
                            {selectedPerson?.lastname}?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4"></div>
                        <div className="grid grid-cols-4 items-center gap-4"></div>
                    </div>
                    <DialogFooter>
                        <Button variant="secondary" onClick={closeDialog}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            onClick={() =>
                                selectedPerson && voteFor(selectedPerson)
                            }
                        >
                            Yes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Table>
                <TableCaption>
                    Only people you can vote for appear here.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={4}>loading ...</TableCell>
                        </TableRow>
                    ) : votablePeople.length < 1 ? (
                        <TableRow>
                            <TableCell colSpan={4}>No people found.</TableCell>
                        </TableRow>
                    ) : (
                        votablePeople
                            .sort((a, b) => a.email.localeCompare(b.email))
                            .map((person) => {
                                return (
                                    <TableRow
                                        key={person.email}
                                        onClick={() => handleRowClick(person)}
                                    >
                                        <TableCell>
                                            {person.firstname}
                                        </TableCell>
                                        <TableCell>{person.lastname}</TableCell>
                                    </TableRow>
                                )
                            })
                    )}
                </TableBody>
            </Table>
        </>
    )
}
