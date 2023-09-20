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
import { Switch } from "@/components/ui/switch"

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
   
    function onSubmit(data: z.infer<typeof FormSchema>) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    }
   
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="email"
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

  
            