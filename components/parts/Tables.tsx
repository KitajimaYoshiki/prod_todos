import { Task } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Data } from 'components/api/Data'
import { Order } from 'components/api/Order'
import { TodoItem } from 'components/api/TodoItem'
import { loadItems, loadTags } from 'components/api/todoItemDao'
import { checkList } from 'components/dto/checkList'
import { tag } from 'components/dto/tag'
import { task } from 'components/dto/task'
import { TodoList } from 'components/dto/TodoList'
import * as React from 'react'
import { useState } from 'react'

import DateFormat from '../api/date'
import EnhancedTableHead from './EnhancedTableHead'

export type ItemListProps = {
  todoList: TodoList[]
}

export const EnhancedTable: React.FC<ItemListProps> = ({ todoList }) => {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('deadline')
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  console.log(todoList)
  const rows = todoList
    ? todoList.map((item) => ({
        id: item.id,
        title: item.title,
        deadline: item.deadline,
        checklist: item.items,
        memo: item.memo,
        start: item.start,
        tag: item.tags,
      }))
    : []

  // const rows = getRows.filter((v) => !!v)
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
  const isSelected = (title: string) => selected.indexOf(title) !== -1

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
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
              {rows.map((row, index) => {
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
                    <TableCell align="center">
                      <TableCell align="center">
                        {!!row.checklist &&
                          row.checklist.map((item) => {
                            return <li key={item.id}>{item.name}</li>
                          })}
                      </TableCell>
                    </TableCell>
                    <TableCell align="center">{row.memo}</TableCell>
                    <TableCell align="center">
                      <DateFormat dateString={row.start} />
                    </TableCell>
                    <TableCell align="center">
                      {row.tag != null &&
                        row.tag.map((tag) => {
                          return <li key={tag.id}>{tag.name}</li>
                        })}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default EnhancedTable
