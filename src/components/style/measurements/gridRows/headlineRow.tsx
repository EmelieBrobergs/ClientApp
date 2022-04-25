import { useTheme, Typography, Tooltip } from "@mui/material";
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';

interface Props {
  sizeRangeId: string;
}
function HeadlineRow({ sizeRangeId }: Props) {
  const theme = useTheme();
  const sizeRangeState = useAppSelector(state => state.sizeRange);
  const sizeRange = useAppSelector(state => state.sizeRange.sizeRanges.find(sr => sr.id == sizeRangeId));

  // const [sizes, setSizes] = useState<ISize[]>([]);

  // useEffect(() => {
  //   if (sizeRange) {
  //     setSizes([...sizeRange.sizes]);
  //     sizes.sort((a, b) => (b.orderIndex as any) - (a.orderIndex as any));
  //     console.log("Log: Sorterar om sizes i headline row");
  //   }
  // }, [sizeRangeState.loading]);

  // TODO: Lägg till dispatch med anop till att sortera sizeRange statet, ist för useEffect soreting av lockal state. ?.

  return (
    <>
      {(sizeRange != undefined) &&
        <div className={`grid grid-cols-${(3 + sizeRange.sizes.length)}`}>
          <Typography ></Typography>
          <Typography variant='body1' sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'flex-end' }}>Measurement Point</Typography>
          <Typography variant='body1' sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>TOL DIFF</Typography>
          {sizeRange.sizes.map(size => (
            <Tooltip title={`OrderIndex: ${size.orderIndex}`}>
              <Typography
                key={size.id}
                variant='body1'
                sx={{
                  fontWeight: (size.name == sizeRange.baseSizeName) ? 'bold' : 'normal',
                  display: 'flex', alignItems: 'flex-end', justifyContent: 'center'
                }}
              >
                {size.name}
              </Typography>
            </Tooltip>
          ))}
        </div>
      }
      {!sizeRange &&
        <div>Size range loading..</div> // TODO: improv alt. render
      }
    </>
  );
}

export default HeadlineRow;