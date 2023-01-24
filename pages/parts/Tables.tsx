import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Data } from '@pages/api/Data'
import { tasks } from '@pages/api/dto/tasks'
import { Order } from '@pages/api/Order'
import { TodoItem } from '@pages/api/TodoItem'
import { loadItems, loadTags } from '@pages/api/todoItemDao'
import * as React from 'react'

import DateFormat from './components/date'
import EnhancedTableHead from './EnhancedTableHead'

const createData = ({
  title,
  deadline,
  checklist,
  memo,
  start,
  tag,
}: {
  title: string
  deadline: Date
  checklist: Array<string>
  memo: string
  start: Date
  tag: Array<string>
}): Data => {
  return {
    title,
    deadline,
    checklist,
    memo,
    start,
    tag,
  }
}

export type ItemListProps = {
  todoList: tasks[]
}

const descendingComparator = function <T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const getComparator = function <Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: string }, b: { [key in Key]: string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
const stableSort = function <T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

// Load Tag and Items
// const getInfo = async (item: tasks, show: boolean) => {
//   // Tag
//   let tags: any = await loadTags(1).catch((e) => {
//     console.log(`loadTags() failed - ${e}`)
//     return null
//   })
//   console.log(tags)

//   // Item
//   let items: any = await loadItems(1, show).catch((e) => {
//     console.log(`loadItems() failed - ${e}`)
//     return null
//   })

//   console.log(items)

//   const task: TodoItem = {
//     id: item.id,
//     title: item.title,
//     deadline: item.deadline,
//     checklist: items,
//     memo: item.memo,
//     start: item.start,
//     tag: tags,
//     done: item.done,
//   }

//   return task
// }

export const EnhancedTable: React.FC<ItemListProps> = ({ todoList }) => {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('deadline')
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  console.log(todoList)
  //
  const rows = new Array()
  let index = 0
  todoList.map((item) => {
    rows[index] = createData({
      title: item.title,
      deadline: item.deadline,
      checklist: item.checklist,
      memo: item.memo,
      start: item.start,
      tag: item.tag,
    })
    index++
  })
  //
  console.log(rows)

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.title)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, title: string) => {
    const selectedIndex = selected.indexOf(title)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, title)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (title: string) => selected.indexOf(title) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.title)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.title)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.title}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.title}
                      </TableCell>
                      <TableCell align="center">
                        <DateFormat dateString={row.deadline} />
                      </TableCell>
                      <TableCell align="center">{row.checklist}</TableCell>
                      <TableCell align="center">{row.memo}</TableCell>
                      <TableCell align="center">
                        <DateFormat dateString={row.start} />
                      </TableCell>
                      <TableCell align="center">{row.tag}</TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  )
}

export default EnhancedTable
