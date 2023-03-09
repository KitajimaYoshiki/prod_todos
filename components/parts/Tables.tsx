import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { Data } from 'components/api/Data'
import { Order } from 'components/api/Order'
import { changeStatusCheckList } from 'components/api/todoItemDao'
import { changeStatusCheckListDto } from 'components/dto/changeStatusCheckListDto'
import { checkboxStatusDto } from 'components/dto/checkboxStatusDto'
import { TodoList } from 'components/dto/TodoList'
import * as React from 'react'

import DateFormat from '../api/date'
import EnhancedTableHead from './EnhancedTableHead'

export const EnhancedTable = (props: any) => {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('deadline')
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [dense, setDense] = React.useState(false)

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
      const newSelected = props.todoList.map((n: TodoList) => n.title)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  // チェックボックスの状態管理リスト
  const checkboxStatusArray: Array<checkboxStatusDto> = []
  props.todoList.forEach((item: TodoList) => {
    const newElement: checkboxStatusDto = {
      id: item.id.toString(),
      status: false,
    }
    checkboxStatusArray.push(newElement)
  })

  // チェックボックスクリック時の状態変更
  const onClickCheckStatue = (event: React.ChangeEvent<HTMLInputElement>) => {
    for (let index = 0; index < checkboxStatusArray.length; index++) {
      if (checkboxStatusArray[index].id == event.target.id) {
        const newValue: checkboxStatusDto = {
          id: checkboxStatusArray[index].id,
          status: event.target.checked,
        }
        checkboxStatusArray.splice(index, 1, newValue)
      }
    }
    props.setCheckboxStatusArray(checkboxStatusArray)
  }

  // チェックリストの状態変更（API）
  const changeCheckListStatus = async (
    taskId: number,
    itemId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const itemInfo: changeStatusCheckListDto = {
      task_id: taskId,
      item_id: itemId,
    }
    const changeResult: number = await changeStatusCheckList(
      itemInfo,
      event.target.checked
    )
    if (changeResult == 500 || changeResult == -1) {
      alert('データベースに接続できませんでした')
      return
    }
  }

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
              rowCount={props.todoList.length}
            />
            <TableBody>
              {props.todoList.map((row: TodoList, index: number) => {
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell padding="checkbox">
                      {row.done === false ? (
                        <Checkbox
                          color="primary"
                          id={`${row.id}`}
                          defaultChecked={row.done}
                          onChange={(event) => onClickCheckStatue(event)}
                        />
                      ) : (
                        <Checkbox
                          color="primary"
                          disabled
                          id={`${row.id}`}
                          defaultChecked={row.done}
                          onChange={(event) => onClickCheckStatue(event)}
                        />
                      )}
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
                    <TableCell align="left">
                      {!!row.items &&
                        row.items.map((item) => {
                          return (
                            <div key={item.id}>
                              <Checkbox
                                color="primary"
                                defaultChecked={item.done}
                                onChange={(event) =>
                                  changeCheckListStatus(row.id, item.id, event)
                                }
                              />
                              <span>{item.name}</span>
                            </div>
                          )
                        })}
                    </TableCell>
                    <TableCell align="center">{row.memo}</TableCell>
                    <TableCell align="center">
                      <DateFormat dateString={row.start} />
                    </TableCell>
                    <TableCell align="left">
                      {!!row.tags &&
                        row.tags.map((tag) => {
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
