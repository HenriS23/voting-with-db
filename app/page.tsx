import Link from "next/link"
import { useState, useEffect } from "react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { ResultsTable } from "@/components/results-table"
import { getPersons } from "./queries/queries"
import { Person } from "@/models/person"


export default function IndexPage() {

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Current Voting <br className="hidden sm:inline" />
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          People with the most votes appear first.
        </p>
      </div>
      <div>
        <ResultsTable></ResultsTable>
      </div>
    </section>
  )
}
