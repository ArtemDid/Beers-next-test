// import type { NextPage } from 'next'
// import Main from '../components/Main'
// import type { ReactElement } from 'react'
// import Layout from '../components/layout'
// import Navbar from '../components/navbar'


// export default function Home() {
//   return (
//     <>
//     <p>eeeeee</p>
//     </>
//   )
// }

// Home.getLayout = function getLayout(page: ReactElement) {
//   return (
//     <Layout>
//       {/*@ts-ignore */}
//       <Navbar/>
//       {page}
//     </Layout>
//   )
// }

import axios from 'axios';
const Users = ({ users, error }:any) => {
  console.log(users)
  return (
    <section>
      <header>
        <h1>List of users</h1>
      </header>
      {error && <div>There was an error.</div>}
      {!error && users && (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user:any, key:any) => (
              <tr key={key}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

const fetchData = async () => await axios.get('https://api.punkapi.com/v2/beers')
  .then(res => ({
    error: false,
    users: res.data,
  }))
  .catch(() => ({
      error: true,
      users: null,
    }),
  );

  export const getServerSideProps = async () => {
    const data = await fetchData();
  
    return {
      props: data,
    };
  }



export default Users;