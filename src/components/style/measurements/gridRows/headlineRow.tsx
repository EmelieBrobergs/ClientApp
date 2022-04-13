import { useTheme, Typography } from "@mui/material";
import { useAppSelector } from '../../../../app/hooks';

interface Props {
  sizeRangeId: string;
}
function HeadlineRow({ sizeRangeId }: Props) {
  const theme = useTheme();
  const sizeRange = useAppSelector(state => state.sizeRange.sizeRanges.find(sr => sr.id == sizeRangeId));

  return (
    <>
      {(sizeRange != undefined) &&
        // <div className={`grid grid-cols-${(3 + sizeRange.sizes.length)}`}>  // TODO: Improv Tailwind set up to be able to render caculated grid cols
        <div className={`grid grid-cols-12`}>
          <Typography variant='body1' sx={{ fontWeight: 'bold' }}>sn</Typography>
          <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Description</Typography>
          <Typography variant='body1' sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>Tolerance</Typography>
          {sizeRange.sizes.map(sr => (
            sr.name == sizeRange.baseSizeName ?
              <Typography key={sr.id} variant='body1' sx={{
                fontWeight: 'bold', color: theme.palette.info.main,
                backgroundColor: theme.palette.secondary.main, display: 'flex', justifyContent: 'center'
              }}>{sr.name}</Typography>
              :
              <Typography key={sr.id} variant='body1' sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>{sr.name}</Typography>
          ))}
        </div>
      }
      {!sizeRange &&
        <div>No size range loaded...no measurement point will de renderd?? hm..or should they?</div> // TODO: improv alt. render
      }
    </>
  );
}

export default HeadlineRow;