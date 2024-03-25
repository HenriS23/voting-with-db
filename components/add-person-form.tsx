"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { Person } from "@/models/person"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { addPerson, getPersons } from "@/app/queries/queries"

const FormSchema = z.object({
    email: z.string().min(1, "Please enter an email address."),
    firstName: z.string().min(1, "Please enter a first name."),
    lastName: z.string().min(1, "Please enter a last name"),
    isVotable: z.boolean().default(false),
})

export function AddPersonForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            isVotable: false,
        },
    })

    // const queryClient = useQueryClient()
    // const apiClient = new ApiClient()

    const [persons, setPersons] = useState<Person[]>([])

    useEffect(() => {
        getPersons().then((persons): void => {
            setPersons(persons)
        })
    }, [])

    const { toast } = useToast()

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (persons) {
            const emailExists = persons.some(
                (person) => person.email === data.email
            )
            if (emailExists) {
                // Handle case where email already exists
                toast({
                    title: "Person Already Exists",
                    description:
                        "A person with the provided email address already exists.",
                    variant: "destructive",
                })
                return
            }
        }

        addPerson(
            data.email,
            data.firstName,
            data.lastName,
            data.isVotable
        ).then((persons): void => {
            const { firstName, lastName, isVotable } = data
            let description = `${firstName} ${lastName}`

            // Check if the person is votable and add information accordingly
            if (isVotable) {
                description += " (votable)"
            } else {
                description += " (not votable)"
            }

            toast({
                title: "Successfully Added Person",
                description: description,
            })
        })

        form.reset({
            email: "",
            firstName: "",
            lastName: "",
            isVotable: false,
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
            >
                <FormField
                    control={form.control}
                    name="email"
                    defaultValue=""
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Email</FormLabel>
                            <FormControl>
                                <Input
                                    className=""
                                    type="email"
                                    placeholder="karl.karlson@client.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Please only use your company email address.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="firstName"
                    defaultValue=""
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="firstName"
                                    placeholder="First Name"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    defaultValue=""
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="lastName"
                                    placeholder="Last Name"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isVotable"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                    Person is votable
                                </FormLabel>
                                <FormDescription>
                                    Allow voting for this person.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit">Add Person</Button>
            </form>
        </Form>
    )
}
