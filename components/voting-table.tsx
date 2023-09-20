'use client';

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"


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

    const [open, setOpen] = useState(false);

    const handleRowClick = () => {
        // Handle the click event here, e.g., navigate to a different page or perform an action.
        setOpen(true);
        console.log('Table row clicked!');
    };
      
    const closeDialog = () => {
        setOpen(false);
    };

    return (
       // {/* Conditionally render the modal */}
    //   {isModalOpen && (
    //     <Modal onClose={handleCloseModal}>
    //       {/* Modal content */}
    //       <h2>Modal Title</h2>
    //       <p>Modal content goes here.</p>
    //       <button onClick={handleCloseModal}>Close Modal</button>
    //     </Modal>
    //   )}
            <>
            <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Vote for </DialogTitle>
                <DialogDescription>
                    Do you want to vote for ?
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
                <Button type="submit">Yes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

    <Table>
            <TableCaption>Only people you can vote for appear here.</TableCaption>
            <TableHeader>
                <TableRow>

                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead className="w-[40px] text-center">Vote</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow onClick={handleRowClick}>

                    <TableCell>Karl</TableCell>
                    <TableCell>Karlson</TableCell>
                    <TableCell className="text-center"></TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </>
        // <Button onClick={handleRowClick}>hi</Button>
    )
}
