'use client';

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import ApiClient from "../ApiClient"
import { useMutation, useQueryClient, useQuery } from "react-query";

import { Person } from "@/models/person";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export function VotingTable() {
    const queryClient = useQueryClient()
    const apiClient = new ApiClient();

    const { isLoading: isLoadingPeople, isError, data: people, error: peopleErr } = useQuery('persons', apiClient.getPeople.bind(apiClient));
    const { isLoading: isLoadingVotes, data: votes, error: votesErr } = useQuery('votes', apiClient.getVotes.bind(apiClient));

    const { toast } = useToast()

    // Filter out people where isVotable is false
    const votablePeople = people?.filter(person => person.isVotable);

    const [open, setOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null); 

    const voteForPersonMutation = useMutation(apiClient.voteForPerson.bind(apiClient), {
        // Invalidate the 'vote' query key
        onSuccess: () => {
            queryClient.invalidateQueries('vote');
            toast({
                title: "Successfully Voted",
                description: `${selectedPerson?.firstName} ${selectedPerson?.lastName}`,
              });
        },
    });

    const handleRowClick = (person: Person) => {
        setSelectedPerson(person);
        setOpen(true);
        console.log('Table row clicked!');
    };
      
    const closeDialog = () => {
        setOpen(false);
    };

    const voteFor = (selectedPerson: Person) => {
        voteForPersonMutation.mutate(selectedPerson, {
            onSuccess: () => { 
            }
          });
        closeDialog();
    };

    return (
        
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Vote for {selectedPerson?.firstName} {selectedPerson?.lastName}</DialogTitle>
                        <DialogDescription>
                            Do you want to vote for {selectedPerson?.firstName} {selectedPerson?.lastName}?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="secondary" onClick={closeDialog}>Cancel</Button>
                        <Button type="submit" onClick={() => selectedPerson && voteFor(selectedPerson)}>Yes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Table>
                <TableCaption>Only people you can vote for appear here.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoadingPeople ? 
                        <TableRow>
                        <TableCell colSpan={2}>loading ...</TableCell>
                        </TableRow> : null}
                        
                    {(votablePeople && votablePeople?.length < 1) && 
                        <TableRow>
                        <TableCell colSpan={2}>No people found.</TableCell>
                        </TableRow>}
                    {votablePeople && votablePeople.map(person => {
                    return (
                        <TableRow key={person.email} onClick={() => handleRowClick(person)}>
                            <TableCell>{person.firstName}</TableCell>
                            <TableCell>{person.lastName}</TableCell>
                        </TableRow>
                    )
                    })} 
                </TableBody>
            </Table>
        </>
        
    )
}
