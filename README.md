# Subscriptions

This repository contains the code for the [GraphQL subscriptions tutorial](https://medium.com/@graphcool/tutorial-building-a-realtime-graphql-server-with-subscriptions-2758cfc6d427) on the Graphcool blog.

## Get started

### 1. Download the example & Install dependencies

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

You can now [deploy](https://www.prismagraphql.com/docs/reference/cli-command-reference/database-service/prisma-deploy-kee1iedaov) the Prisma database API:

```sh
yarn prisma deploy
```

When prompted by the CLI how you want to deploy your Prisma API, select either of the Prisma Sandbox options: `sandbox-eu1` or `sandbox-us1`. Then provide a _name_ for your API and the _stage_ or simply hit **Enter** to select the suggested values.

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
