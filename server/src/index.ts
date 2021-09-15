import 'reflect-metadata'
import { ApolloServer} from 'apollo-server-express'
import express from 'express'
import path from 'path'
import { createConnection } from 'typeorm'
import { buildSchema } from 'type-graphql'
import { Product } from './entities/Product'
import { ProductResolver } from './resolvers/product'

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

  const app = express()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver],
      validate: false,
    }),
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
  })

  app.listen(4000, () => {
    console.log('server started on localhost:4000')
  })
}

main()
