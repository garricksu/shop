import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'
import ReactDOM from 'react-dom'
import { useProductsQuery } from './types/generatedTypes'

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  credentials: 'include'
})

const App = () => {
  const {data, loading} = useProductsQuery()
  console.log(data)
  return (
    <div>
      <header>Hello World</header>
    </div>
  )
}

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
