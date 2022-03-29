import { alpha, Button, Divider, Grid, InputBase, Paper, styled, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import MultipleSelectChip from "../components/styles/multipleSelectChip";
import StyleCard from "../components/styles/styleCard";
import { stylesFetchAsync } from "../reduxSlices/styleSlice";

const StylesPage = () => {
   const theme = useTheme();
   const dispatch = useAppDispatch();
   const styles = useAppSelector(state => state.style.styles);
   const user = useAppSelector(state => state.user.currentUser)

   useEffect(() => {
      if (user && user.companyId) dispatch(stylesFetchAsync(user.companyId));
    }, []);

   // TODO: Hämta alla styles i en lista !

   //*************************** */
   // SEARCH div style
   const Search = styled('div') (()=> ({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.black, 0.1),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.2),
      },
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    }));
    
    const StyledInputBase = styled(InputBase)(() => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: theme.spacing(0.5, 1, 0.5, 1),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
    }));
    //*************************** */

  return (
    <Paper elevation={4} sx={{ p: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <div style={{ flexGrow: '1', display: 'flex' }}>
        <Typography variant="h6">Styles</Typography>
        <Search>
            <StyledInputBase
            placeholder={'Filter search..'}
            inputProps={{ 'aria-label': 'Search Styles' }}
            />
         </Search>
        </div>
        <Button variant='contained' color='secondary' size="small">+ Create new</Button>
      </div>
      <MultipleSelectChip/>
      <Divider sx={{ mt: 1, mb: 1 }}/>
      <Typography variant="subtitle2">Amount of styles: {styles?.length.toString()}</Typography>
      <Grid
        container
        spacing={1}
      >
         {styles?.map((item: IStyle) => (
            <Grid key={item.id} item xs={12} sm={6} lg={4} xl={3}>
            <StyleCard 
               id={item.id}
               orderNumber={item.orderNumber}
               name={item.name}
               productType={item.productType}
               productGroup={item.productGroup}
               assignedToUserId={item.assignedToUserId} companyId={""} description={""} tags={item.tags}/>
            </Grid>
         ))}
      </Grid>
    </Paper>
  );
};

export default StylesPage;

// TODO:
// Skapa huvudboxen, med runda hörn, skugga, title, sökfält, skapa ny knapp
// Skapa en scrollbar vy i denna box som visar styleCard's, rutan ska stå still och så scrollar man i den under "devider"  linje