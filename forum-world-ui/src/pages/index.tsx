import { Inter } from 'next/font/google'

import { useCreateUserMutation, useGetAllUsersQuery } from '../store/users/users.api'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { isLoading, isError, data } = useGetAllUsersQuery() 

  return (
    <>
     { isError && <p className="text-center text-red-600">Something went wrong...</p> }
    <ul>
      { isLoading && <p className="text-center">Loading...</p> }    
      {data?.map(user => 
        <li key={user.id}>{user.name} <span>{user.email}</span></li>
      )}
    </ul>
    </>
  )
}
