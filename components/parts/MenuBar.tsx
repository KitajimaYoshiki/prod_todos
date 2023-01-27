import { TaskSharp } from '@mui/icons-material'
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
import { Data } from 'components/api/Data'
import { loadItems, loadTags, loadTodoList } from 'components/api/todoItemDao'
import { checkList } from 'components/dto/checkList'
import { tag } from 'components/dto/tag'
import { task } from 'components/dto/task'
import { TodoList } from 'components/dto/TodoList'
import { useEffect, useState } from 'react'

import LoadingButtons from './LoadingButtons'
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

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleMenu = (index: number, name: string) => {
    if (index === 0) {
      props.setMenu(name)
    }
  }

  const [todoList, setTodoList] = useState<TodoList[]>([])
  const updateTodoList = async () => {
    // Task
    const tasks = await loadTodoList('test01', true).catch((e) => {
      console.log(`loadTodoList() failed - ${e}`)
      return null
    })
    if (!tasks) return
    const taskList: TodoList[] = []
    for (const task of tasks) {
      // Tag
      const tags = await loadTags(task.id).catch((e) => {
        console.log(`loadTags() failed - ${e}`)
        return []
      })
      const items = await loadItems(task.id, true).catch((e) => {
        console.log(`loadItems() failed - ${e}`)
        return []
      })
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
              <Button variant="contained">タスクを追加</Button>
              <SelectBox></SelectBox>
            </Box>
            <Tables todoList={todoList} />
            <Box>
              <Grid container alignItems="right" justifyContent="right">
                <Button variant="contained" size="large">
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