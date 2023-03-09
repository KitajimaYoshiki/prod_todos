import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'

export default function GutterlessList(props: any) {
  // IconButton押下で配列要素削除
  const onClickClear = (index: number) => {
    const deleteItem = [...props.viewCheckList]
    deleteItem.splice(index, 1)
    props.setNewCheckList(deleteItem)
  }

  return (
    <div>
      <List
        sx={{
          ml: 2,
          width: '95%',
          bgcolor: 'background.paper',
        }}
      >
        {props.viewCheckList.map((value: string, index: number) => (
          <ListItem
            key={index}
            disableGutters
            secondaryAction={
              <IconButton
                aria-label="clear"
                onClick={() => onClickClear(index)}
              >
                <ClearIcon />
              </IconButton>
            }
          >
            <ListItemText>{value}</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  )
}
