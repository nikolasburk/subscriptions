# Subscriptions

This repository contains the code for the [GraphQL subscriptions tutorial](https://medium.com/@graphcool/tutorial-building-a-realtime-graphql-server-with-subscriptions-2758cfc6d427) on the Graphcool blog.

## Get started

### 1. Download the example & install dependencies

Clone the repository:

```sh
git clone git@github.com:nikolasburk/subscriptions.git
```

Next, navigate into the downloaded folder and install the NPM dependencies:

```sh
cd subscriptions
yarn install
```

### 2. Deploy the Prisma database API

You can now [deploy](https://www.prismagraphql.com/docs/reference/cli-command-reference/database-service/prisma-deploy-kee1iedaov):

```sh
yarn prisma deploy
```

When prompted where (i.e. to which [cluster](https://www.prisma.io/docs/reference/clusters/overview-eu2ood0she)) you want to deploy your service, choose any of the _public clusters_, e.g. `public-us1` or `public-eu1`. (If you have Docker installed, you can also deploy locally.)

> **Note**: `prisma` is listed as a _development dependency_ and _script_ in this project's [`package.json`](./package.json). This means you can invoke the Prisma CLI without having it globally installed on your machine (by prefixing it with `yarn`), e.g. `yarn prisma deploy` or `yarn prisma playground`. If you have the Prisma CLI installed globally (which you can do with `npm install -g prisma`), you can omit the `yarn` prefix.

### 3. Set the Prisma service endpoint

From the output of the previous command, copy the `HTTP` endpoint and paste it into `src/index.js` where it's used to instantiate the `Prisma` binding. You need to replace the current placeholder `__PRISMA_ENDPOINT__`:

```js
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: "__PRISMA_ENDPOINT__",
      secret: 'mysecret123',
    }),
  }),
})
```

For example:

```js
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: "https://eu1.prisma.sh/public-hillcloak-flier-942261/hackernews-graphql-js/dev",
      secret: 'mysecret123',
    }),
  }),
})
```

Note that the part `public-hillcloak-flier-952361` of the URL is unique to _your_ service.

### 4. Start the GraphQL server & Open a Playground

You can now test the API with the following command:

```sh
yarn dev
```

The server is now running on [http://localhost:4000](http://localhost:4000) and a [GraphQL Playground](https://github.com/graphcool/graphql-playground) opens automatically so you can start sending requests to your GraphQL API.

## Learn more

To learn more about this example, check out the corresponding [tutorial](https://medium.com/@graphcool/tutorial-building-a-realtime-graphql-server-with-subscriptions-2758cfc6d427).
