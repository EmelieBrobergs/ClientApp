import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { InputAdornment } from '@mui/material';

export default function InputTagsArray() {
    const [addSizes, setAddSizes] = React.useState<string[]>([]);
    return (
        <Stack spacing={3} sx={{ width: 500 }}>
            <Autocomplete
                multiple
                id="tags-standard"
                options={commonSizeRanges}
                getOptionLabel={(option) => option.title}
                defaultValue={[commonSizeRanges[1]]}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Multiple values"
                        placeholder="Favorites"
                    />
                )}
            />
            <Autocomplete
                multiple
                id="tags-filled"
                options={commonSizeRanges.map((option) => option.title)}
                defaultValue={[commonSizeRanges[3].title]}
                freeSolo
                renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Enter Size Range"
                        placeholder="Add size"
                    />
                )}
            />
            <Autocomplete
                multiple
                id="tags-filled"
                options={[]}
                value={addSizes}
                onChange={(event: any, newValue: string[]) => {
                    return setAddSizes(newValue);
                }}
                freeSolo={true}
                renderTags={(value: readonly string[]) =>
                    value.map((option: string, index: number) => (
                        <Chip variant="outlined" label={option} />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        // label="Enter Size Range"
                        placeholder="Add size"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start" sx={{ width: '10rem' }}>
                                    Size range:
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            />
            <br />
            {addSizes.map((item, index) => <p>{item} : {index}</p>)}
            <div>{`value: ${addSizes.length !== 0 ? `'${addSizes.length}'` : 'null'}`}</div>
            <br />
        </Stack>
    );
}


// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const commonSizeRanges = [
    { title: 'XS-XL', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
    { title: 'XXS-XL', sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'] },
    { title: 'XS-XXL', sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
    { title: '36-46', sizes: ['36', '38', '40', '42', '44', '46'] },
    { title: '32-44', sizes: ['32', '34', '36', '38', '40', '42', '44'] }
];