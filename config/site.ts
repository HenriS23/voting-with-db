export type SiteConfig = typeof siteConfig

export const siteConfig = {
    name: "Voting",
    description: "A site for voting people.",
    mainNav: [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "Vote",
            href: "/vote",
        },
        {
            title: "Add Person",
            href: "/add",
        },
    ],
    links: {
        github: "https://github.com/HenriS23/voting-with-db",
    },
}
