'use client';

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"

import ApiClient from "../ApiClient";
import { useMutation, useQueryClient, useQuery } from "react-query";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


const FormSchema = z.object({
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    isVotable: z.boolean().default(false),
})

export function AddPersonForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      isVotable: false,
    },
  })

  const queryClient = useQueryClient()
  const apiClient = new ApiClient()

  const { isLoading: isLoadingPeople, isError, data: people, error: peopleErr } = useQuery('persons', apiClient.getPeople.bind(apiClient));

  const { toast } = useToast()

  const createPersonMutation = useMutation(apiClient.createPerson.bind(apiClient), {
    // Invalidate the 'persons' query key to refetch data in the people list
    onSuccess: () => {
      queryClient.invalidateQueries('persons');
      
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (people) {
      const emailExists = people.some((person) => person.email === data.email);
      if (emailExists) {
        // Handle the case where the email already exists
        toast({
          title: "Person Already Exists",
          description: "A person with the provided email address already exists.",
          variant: "destructive",
        });
        return; 
      }
    }
    
    createPersonMutation.mutate(data, {
      onSuccess: () => {
        const { firstName, lastName, isVotable } = data;
        let description = `${firstName} ${lastName}`;

        // Check if the person is votable and add information accordingly
        if (isVotable) {
          description += " (votable)";
        } else {
          description += " (not votable)";
        }

        toast({
          title: "Successfully Added Person",
          description: description,
        });

        form.reset({ email: "", firstName: "", lastName: "", isVotable: false });
      }
    });
  }
   
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="karl.karlson@client.com" {...field} />
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
                <Input type="firstName" placeholder="First Name" {...field} />
              </FormControl>
              <FormDescription/>
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
              <Input type="lastName" placeholder="Last Name" {...field} />
            </FormControl>
            <FormDescription/>
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

  
            