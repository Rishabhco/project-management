import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ApolloProvider,ApolloClient,InMemoryCache} from '@apollo/client';
import Header from "./components/Header";
import Home from './pages/Home';
import Project from './pages/Project';
import NotFound from './pages/NotFound';


const API_URI = process.env.NODE_ENV === 'production' ? 'http://54.197.65.16:3001/graphql' : 'http://localhost:3001/graphql';

// const API_URI = 'http://54.197.65.16:3001/graphql';

console.log("Using: ", API_URI);

const cache = new InMemoryCache({
  typePolicies: {
    Query:{
      fields:{
        clients: {
          merge(existing, incoming){
            return incoming;
          }
        },
        projects:{
          merge(existing, incoming){
            return incoming;
          }
        }
      }
    }
  }
})



const client=new ApolloClient({
  uri: API_URI,
  cache,
})

function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <Header/>
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/projects/:id' element={<Project />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
    </>
  );
}

export default App;