import * as React from "react"

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
    return (
        <Table>
        <TableCaption>Only people with votes appear here.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[80px]">Votes</TableHead>
            <TableHead className="w-[80px]">%</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell className="font-medium">10</TableCell>
            <TableCell>80%</TableCell>
            <TableCell>Karl</TableCell>
            <TableCell>Karlson</TableCell>
            </TableRow>
        </TableBody>
        </Table>
    )
}