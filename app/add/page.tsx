'use client'

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { VotingTable } from "@/components/voting-table"
import { AddPersonForm } from "@/components/add-person-form"
import ApiClient from "../ApiClient"
import { useQuery } from "react-query"

export default function Page() {

  const apiClient = new ApiClient();

  const { isLoading: isLoadingPeople, isError, data: people, error: peopleErr } = useQuery('persons', apiClient.getPeople.bind(apiClient));

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Add a Person <br className="hidden sm:inline" />
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Fill out the form to add a person.
        </p>
      </div>
      {isLoadingPeople ? "loading..." : null}
      {(people && people?.length < 1) && <div>No people found</div>}
      {people && people.map(person => {
        return <div>{person.firstName}</div>
      })}
      <div>
        <AddPersonForm></AddPersonForm>
      </div>
    </section>
  )
}
