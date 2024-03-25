import { VotingTable } from "@/components/voting-table"

export default function Page() {
    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex max-w-[980px] flex-col items-start gap-2">
                <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                    Vote Someone <br className="hidden sm:inline" />
                </h1>
                <p className="max-w-[700px] text-lg text-muted-foreground">
                    To vote select a person and cofirm your choice.
                </p>
            </div>
            <div>
                <VotingTable></VotingTable>
            </div>
        </section>
    )
}
