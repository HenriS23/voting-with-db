'use client'

import * as React from "react"

import { useState } from "react"

import ApiClient from "../ApiClient"
import { useMutation, useQueryClient, useQuery } from "react-query";

import { Vote } from "@/models/vote";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  


export function ResultsTable() {
    const queryClient = useQueryClient()
    const apiClient = new ApiClient();
    
    const { isLoading: isLoadingVotes, isError, data: votes, error: votesErr } = useQuery('votes', apiClient.getVotes.bind(apiClient));
    
    // Filter out people where isVotable is false
    const votablePeople = votes?.filter(vote => vote.person.isVotable);
    const totalVoteCount = (votablePeople ?? []).reduce((total, vote) => {
        return total + vote.Stimmzahl;
    }, 0);

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
            {isLoadingVotes ? 
                <TableRow>
                <TableCell>loading ...</TableCell><TableCell></TableCell>
                </TableRow> : null}
            {(votablePeople && votablePeople?.length < 1) && 
                <TableRow>
                <TableCell>No people found.</TableCell><TableCell></TableCell>
                </TableRow>}
            {votablePeople && votablePeople.map(vote => {
        

                return (
                    <TableRow key={vote.person.email}>
                        <TableCell className="font-medium">{vote.Stimmzahl}</TableCell>
                        <TableCell>{vote.Stimmzahl !== 0 ? `${(vote.Stimmzahl / totalVoteCount * 100).toFixed(1)}%` : 'N/A'}</TableCell>
                        <TableCell>{vote.person.firstName}</TableCell>
                        <TableCell>{vote.person.lastName}</TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
        </Table>
    )
}