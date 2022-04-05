import { Paper, Typography, Button, Divider, Grid } from "@mui/material";
import { CSSProperties, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import MultipleSelectChip from "../components/styles/multipleSelectChip";
import StyleCard from "../components/styles/styleCard";
import { stylesFetchAsync } from "../reduxSlices/styleSlice";

const MyStylesPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.currentUser)
  const styles = useAppSelector(state => state.style.styles?.filter( s => s.assignedToUserId == user?.id));
  const userFullName = user && user.firstName + " " + user.lastName;

  useEffect(() => {
     if (user && user.companyId) dispatch(stylesFetchAsync(user.companyId));
   }, []);

  return (
    <Paper elevation={4} sx={{ p: 1 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
      <div style={{ flexGrow: '1', display: 'flex' }}>
      <Typography variant="h6">Styles assigned to: {userFullName}</Typography>
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
            <StyleCard style={item} />
            </Grid>
         ))}
    </Grid>
  </Paper>
  );
};

export default MyStylesPage;
