'use client'

import { useState, useEffect } from 'react'
import { useAxios } from '@/hooks/useAxios'
import { User, UsersResponse } from '@/app/types/user'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination } from '@/components/admin/Pagination'
import { UserRow } from '@/components/admin/UserRow'

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const axios = useAxios()

  const fetchUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(search && { search }),
      })
      const response = await axios.get<UsersResponse>(`/auth/users?${params}`)
      setUsers(response.data.data.users)
      setTotalPages(response.data.data.totalPages)
      setTotalUsers(response.data.data.totalUsers)
    } catch (err) {
      setError('Failed to fetch users')
      console.error('Failed to fetch users:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [currentPage, search])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchUsers()
  }

  const handleVerifyUser = async (userId: string) => {
    try {
      await axios.patch(`/auth/verify-user/${userId}`)
      fetchUsers() // Refetch users to update the list
    } catch (err) {
      console.error('Failed to verify user:', err)
      // You might want to show an error message to the user here
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <Input
            type="search"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Search</Button>
        </div>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <UserRow key={user._id} user={user} onVerify={handleVerifyUser} />
              ))}
            </TableBody>
          </Table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          <p className="mt-4">Total Users: {totalUsers}</p>
        </>
      )}
    </div>
  )
}

