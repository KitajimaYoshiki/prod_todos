import { TableCell, TableHead, TableRow } from '@mui/material'
import { Data } from 'components/api/Data'
import { Order } from 'components/api/Order'

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'タイトル',
  },
  {
    id: 'deadline',
    numeric: true,
    disablePadding: false,
    label: '期限',
  },
  {
    id: 'checklist',
    numeric: true,
    disablePadding: false,
    label: 'チェックリスト',
  },
  {
    id: 'memo',
    numeric: true,
    disablePadding: false,
    label: 'メモ',
  },
  {
    id: 'start',
    numeric: true,
    disablePadding: false,
    label: '開始日',
  },
  {
    id: 'tag',
    numeric: true,
    disablePadding: false,
    label: 'タグ',
  },
]

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy } = props

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
