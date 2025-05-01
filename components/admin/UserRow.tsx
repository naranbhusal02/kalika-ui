import { User } from '@/app/types/user'
import { TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from 'lucide-react'

interface UserRowProps {
  user: User
  onVerify: (userId: string) => void
}

export function UserRow({ user, onVerify }: UserRowProps) {
  return (
    <TableRow>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>
        {user.isVerified ? (
          <CheckCircle className="text-green-500" />
        ) : (
          <XCircle className="text-red-500" />
        )}
      </TableCell>
      <TableCell>
        {!user.isVerified && (
          <Button onClick={() => onVerify(user._id)} size="sm">
            Verify
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}

