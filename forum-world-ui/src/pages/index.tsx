import { Inter } from 'next/font/google'

import { useCreateUserMutation, useGetAllUsersQuery } from '../store/users/users.api'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { isLoading, isError, data } = useGetAllUsersQuery() 

  return (
    <>
     { isError && <p>Something went wrong...</p> }
    <ul>
      { isLoading && <p>Loading...</p> }    
      {data?.map((user, index) => 
        <li key={index}>{user.name} <span>{user.email}</span></li>
      )}
    </ul>
    </>
  )
}
