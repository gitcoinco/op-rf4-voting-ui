export const metrics = [
  {
    id: "gas fees",
    name: "Gas Fees",
    description: "The project's total contribution to gas fees.",
    type: "Network Growth",
  },
  {
    id: "trusted transactions",
    name: "Trusted Transactions",
    description:
      "The project’s total number of transactions performed by trusted users.",
    type: "Network Growth",
  },
  {
    id: "avg monthly transactions",
    name: "Avg Monthly Transactions",
    description:
      "The average monthly transactions for a project over the past 6 months. Projects receive 0s for months with no activity.",
    type: "Network Growth",
  },
  {
    id: "days above 10k transactions",
    name: "Days Above 10K Transactions",
    description:
      "The number of total days a project has had more than 10K transactions.",
    type: "Network Growth",
  },
  {
    id: "monthly active developers",
    name: "Monthly Active Developers",
    description:
      "The average monthly full-time developers for a project over the past 6 months. Projects receive 0s for months with no activity.",
    type: "Network Growth",
  },
  {
    id: "network centrality",
    name: "Network Centrality",
    description:
      "The number of links a project has to other Superchain projects via its users’ transactions.",
    type: "Network Growth",
  },
  {
    id: "users' share of transactions",
    name: "Users' Share of Transactions",
    description:
      "The percentage of a project's lifetime transactions that were made by trusted users. Only projects with at least 100 users are eligible.",
    type: "Network Quality",
  },
  {
    id: "contracts deployed",
    name: "Contracts Deployed",
    description:
      "The number of contracts deployed by a project and its factories. Only contracts with at least 100 users are counted.",
    type: "Network Quality",
  },
  {
    id: "gas efficiency",
    name: "Gas Efficiency",
    description:
      "The percent of transactions that cost less than $0.02 (equiv). Only projects with more than 10K transactions are eligible.",
    type: "Network Quality",
  },
  {
    id: "attestations",
    name: "Attestations",
    description:
      "The number of users that have made attestations via a schema created by the project.",
    type: "Network Quality",
  },
  {
    id: "users onboarded",
    name: "Users Onboarded",
    description:
      "The number of users who interacted with the project within their first 7 days of appearing on the Superchain.",
    type: "User Growth",
  },
  {
    id: "avg monthly active users",
    name: "Avg Monthly Active Users",
    description:
      "The average monthly active users for a project over the past 6 months. Projects receive 0s for months with no activity.",
    type: "User Growth",
  },
  {
    id: "days above 420 users",
    name: "Days Above 420 Users",
    description:
      "The number of total days a project has had more than 420 users.",
    type: "User Growth",
  },
  {
    id: "account abstraction wallets",
    name: "Account Abstraction Wallets",
    description:
      "The number of AA wallets created by the project. Only AA wallets with at least 10 transactions are counted.",
    type: "User Growth",
  },
  {
    id: "recurring users",
    name: "Recurring Users",
    description:
      "The number of users who have interacted with the project in at least 3 separate months and at least 1 time in the past 90 days.",
    type: "User Quality",
  },
  {
    id: "median transactions per user",
    name: "Median Transactions Per User",
    description:
      "The median number of transactions a user has had with the project. Only projects with at least 100 users and 6 months of activity are eligible.",
    type: "User Quality",
  },
  {
    id: "user retention",
    name: "User Retention",
    description:
      "The percentage of a project's lifetime users who have interacted with the project in the last 90 days. Only projects with at least 100 users and 6 months of activity are eligible.",
    type: "User Quality",
  },
  {
    id: "user to address ratio",
    name: "User to Address Ratio",
    description:
      "The percentage of a project's lifetime addresses who are considered users. Only projects with at least 100 users are eligible.",
    type: "User Quality",
  },
].map((m) => ({
  ...m,
  comments: [
    {
      id: "1",
      content: "Comment 1",
      commenter: "0x1234",
      createdAt: "2021-10-01T00:00:00Z",
      editedAt: "2021-10-01T00:00:00Z",
    },
  ],
}));
