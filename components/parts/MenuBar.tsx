import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import SettingsIcon from '@mui/icons-material/Settings'
import { Button, Container, Grid } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { styled, useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import {
  changeStatusTask,
  loadItems,
  loadTags,
  loadTodoList,
} from 'components/api/todoItemDao'
import { checkboxStatusDto } from 'components/dto/checkboxStatusDto'
import { checkList } from 'components/dto/checkList'
import { resultItems } from 'components/dto/resultItems'
import { resultTags } from 'components/dto/resultTags'
import { resultTasks } from 'components/dto/resultTasks'
import { tag } from 'components/dto/tag'
import { TodoList } from 'components/dto/TodoList'
import { useEffect, useState } from 'react'

import CreateTaskDialog from './CreateTaskDialog'
import SelectBox from './SelectBox'
import Tables from './Tables'

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

const PersistentDrawerLeft = (props: any) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [checkboxStatusArray, setCheckboxStatusArray] = useState<
    checkboxStatusDto[]
  >([])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleClickDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const handleMenu = (index: number, name: string) => {
    if (index === 0) {
      props.setMenu(name)
    }
  }

  // タスク完了ボタン押下時
  const onClickTaskStatus = async () => {
    const alertStatus: boolean = confirm('選択したタスクを完了しますか？')
    if (!alertStatus) {
      return
    }

    // タスク完了処理
    for (let index = 0; index < checkboxStatusArray.length; index++) {
      if (checkboxStatusArray[index].status) {
        const resultChangeTask: number = await changeStatusTask(
          parseInt(checkboxStatusArray[index].id)
        )
        if (resultChangeTask == 500 || resultChangeTask == -1) {
          alert('データベースに接続できませんでした')
          return
        }
      }
    }
  }

  // タスク取得
  const [todoList, setTodoList] = useState<TodoList[]>([])
  const updateTodoList = async () => {
    // Task
    const tasks: resultTasks = await loadTodoList(props.userId, true).catch(
      (e) => {
        console.log(`loadTodoList() failed - ${e}`)
        const result: resultTasks = {
          tasks: [],
          status: -2,
        }
        return result
      }
    )
    if (tasks.status == -2) return
    // error
    if (tasks.status == -1 || tasks.status == 500) {
      alert('データベースに接続できませんでした')
      return
    }
    const taskList: TodoList[] = []
    for (const task of tasks.tasks) {
      // Tag
      const showTags: resultTags = await loadTags(task.id).catch((e) => {
        console.log(`loadTags() failed - ${e}`)
        const result: resultTags = {
          tags: [],
          status: -2,
        }
        return result
      })
      // item
      const showItems: resultItems = await loadItems(task.id, true).catch(
        (e) => {
          console.log(`loadItems() failed - ${e}`)
          const result: resultItems = {
            items: [],
            status: -2,
          }
          return result
        }
      )
      // error
      if (
        showTags.status == -1 ||
        showTags.status == 500 ||
        showItems.status == -1 ||
        showItems.status == 500
      ) {
        alert('データベースに接続できませんでした')
        return
      }
      const tags: tag[] = showTags.tags
      const items: checkList[] = showItems.items
      taskList.push({ ...task, tags, items })
    }
    setTodoList(taskList)
  }
  useEffect(() => {
    updateTodoList()
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            タスクボード
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography align="left" fontSize={22}>
            Menu
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Logout', 'Calendar', 'Setting'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleMenu(index, '')}>
                <ListItemIcon>
                  {index === 0 ? (
                    <LogoutIcon />
                  ) : index === 1 ? (
                    <CalendarMonthIcon />
                  ) : (
                    <SettingsIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <Container maxWidth="xl">
          <Box
            sx={{
              // bgcolor: 'red',
              height: '100vh',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 5fr)',
                margin: 8,
                justifyContent: 'center',
                alignItems: 'center',
                gridTemplateRows: 'auto',
                mx: 'auto',
                width: 500,
                // bgcolor: 'skyblue',
              }}
            >
              {/* <LoadingButtons time={1000} /> */}
              <Button variant="contained" onClick={handleClickDialogOpen}>
                タスクを追加
              </Button>
              <SelectBox></SelectBox>
              <CreateTaskDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                userId={props.userId}
                todoList={todoList}
              />
            </Box>
            <Tables
              todoList={todoList}
              setCheckboxStatusArray={setCheckboxStatusArray}
            />
            <Box>
              <Grid container alignItems="right" justifyContent="right">
                <Button
                  variant="contained"
                  size="large"
                  onClick={onClickTaskStatus}
                >
                  タスク完了
                </Button>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Main>
    </Box>
  )
}

export default PersistentDrawerLeft
