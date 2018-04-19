const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    feed(parent, args, ctx, info) {
      return ctx.db.query.posts({}, info)
    },
  },
  Mutation: {
    writePost(parent, { title }, ctx, info) {
      return ctx.db.mutation.createPost(
        {
          data: {
            title,
          },
        },
        info,
      )
    },
    updateTitle(parent, { id, newTitle }, ctx, info) {
      return ctx.db.mutation.updatePost(
        {
          where: {
            id,
          },
          data: {
            title: newTitle,
          },
        },
        info,
      )
    },
    deletePost(parent, { id }, ctx, info) {
      return ctx.db.mutation.deletePost(
        {
          where: {
            id,
          },
        },
        info,
      )
    },
  },
  Subscription: {
    publications: {
      subscribe: (parent, args, ctx, info) => {
        return ctx.db.subscription.post(
          {
            where: {
              mutation_in: ['CREATED', 'UPDATED'],
            },
          },
          info,
        )
      },
    },
    postDeleted: {
      subscribe: (parent, args, ctx, info) => {
        const selectionSet = `{ previousValues { id title } }`
        return ctx.db.subscription.post(
          {
            where: {
              mutation_in: ['DELETED'],
            },
          },
          selectionSet,
        )
      },
      resolve: (payload, args, context, info) => {
        return payload ? payload.post.previousValues : payload // sanity check
      },
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: '__PRISMA_ENDPOINT__',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
