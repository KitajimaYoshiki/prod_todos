import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

export default function BasicSelect() {
  const [tags, setTags] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setTags(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 2, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Tag</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={tags}
          label="Tag"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>指定なし</em>
          </MenuItem>
          <MenuItem value={1}>重要</MenuItem>
          <MenuItem value={2}>優先</MenuItem>
          <MenuItem value={3}>標準</MenuItem>
          <MenuItem value={11}>受講</MenuItem>
          <MenuItem value={12}>郵送</MenuItem>
          <MenuItem value={13}>業務</MenuItem>
        </Select>
        <FormHelperText>表示するタスクのタグを選択</FormHelperText>
      </FormControl>
    </div>
  );
}