import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Tooltip } from '@mui/material';
import { DisabledByDefault } from '@mui/icons-material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const productType = [
  'Women tights',
  'Women sport',
  'Women Shirt',
  'Women jogger',
  'Girl trouser',
  'Bikini',
];
const productGroupe = [
  'Tricot',
  'Denim',
  'Woven',
  'Underwear',
  'Outwear',
];

function getStyles(name: string, filterOnName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      filterOnName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip() {
  const theme = useTheme();
  const [filterOnName, setFilterOnName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof filterOnName>) => {
    const {
      target: { value },
    } = event;
    setFilterOnName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleDeleteSearch = (deselectName: string)=> {
    var copyArray = Array.from(filterOnName);
    setFilterOnName(copyArray.filter( x => x != deselectName));
  }

  return (
    <div>
      <Tooltip title="Select to filter on product from groupes and/or types. More choices within a category will lead to a wider range of matches." 
        placement='top-start' 
        arrow 
        enterDelay={1500}
        enterNextDelay={1500}
      >
      <FormControl sx={{ m: 1, mt: 2, pr:1, width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">Product type & groupe</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={filterOnName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Filter: Product type & groupe"/>}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} onMouseDown={(event) => {
                  event.stopPropagation();
                }} onDelete={() => handleDeleteSearch(value)} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          <MenuItem disabled value="">
            <em>Product Type</em>
          </MenuItem>
          {productType.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, filterOnName, theme)}
            >
              {name}
            </MenuItem>
          ))}
          <MenuItem disabled value="">
            <em>Product Groupe</em>
          </MenuItem>
          {productGroupe.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, filterOnName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Tooltip>
    </div>
  );
}