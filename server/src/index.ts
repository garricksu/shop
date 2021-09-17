import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import path from 'path'
import { createConnection } from 'typeorm'
import { buildSchema } from 'type-graphql'
import { Product } from './entities/Product'
import { ProductResolver } from './resolvers/product'
import { MyContext } from './types'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

const main = async () => {
  await createConnection({
    type: 'postgres',
    database: 'shop',
    username: 'garricksu',
    password: '9628FatalGDS',
    logging: true,
    entities: [Product],
    migrations: [path.join(__dirname, './migrations/*')],
    synchronize: true,
  })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver],
    }),
    context: ({ req, res }): MyContext => ({ req, res }),
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  })

  apolloServer.listen(4000, () => {
    console.log('server started on localhost:4000')
  })
}

main()
