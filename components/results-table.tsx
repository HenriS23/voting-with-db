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
    const peopleWithVotes = votes?.filter(vote => vote.person.isVotable && vote.Stimmzahl > 0)
        .sort((a, b) => b.Stimmzahl - a.Stimmzahl);

    const totalVoteCount = (peopleWithVotes ?? []).reduce((total, vote) => {
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
                <TableCell colSpan={4}>loading ...</TableCell>
                </TableRow> : null}
            {(peopleWithVotes && peopleWithVotes?.length < 1) && 
                <TableRow>
                <TableCell colSpan={4}>No people found.</TableCell>
                </TableRow>}
            {peopleWithVotes && peopleWithVotes.map(vote => {
        

                return (
                    <TableRow key={vote.person.email}>
                        <TableCell className="font-medium">{vote.Stimmzahl}</TableCell>
                        <TableCell>{`${(vote.Stimmzahl / totalVoteCount * 100).toFixed(1)}%`}</TableCell>
                        <TableCell>{vote.person.firstName}</TableCell>
                        <TableCell>{vote.person.lastName}</TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
        </Table>
    )
}