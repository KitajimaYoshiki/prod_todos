import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import Autocomplete from '@mui/material/Autocomplete'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import * as React from 'react'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

export default function CheckboxesTags(props: any) {
  return (
    <Autocomplete
      multiple
      limitTags={4}
      id="checkboxes-tags"
      options={tagNames}
      disableCloseOnSelect
      fullWidth
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      // style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="タグの割り当て"
          placeholder="Tag"
        />
      )}
      sx={{ marginTop: 2 }}
      onChange={(event, value) => props.setInputTags(value)}
    />
  )
}

const tagNames = ['重要', '優先', '標準', '受講', '郵送', '業務']
