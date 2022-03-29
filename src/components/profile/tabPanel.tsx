import * as React from "react";
import { ProfileForm } from "./pProfileForm";
import { PasswordForm } from "./passwordForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  userEditNameAsync,
  userEditPasswordAsync,
} from "../../reduxSlices/userSlice";
import { useTheme, Tabs, Tab, Typography, Box, Paper } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const user = useAppSelector((state) => state.user);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const dispatch = useAppDispatch();
  const onProfileFormSubmit = (data: {
    user: IUser | null;
    firstName: string;
    lastName: string;
  }) => {
    dispatch(userEditNameAsync(data));
  };
  const onPasswordFormSubmit = (data: {
    userId: string | undefined;
    passwordObject: IEditPassword;
  }) => {
    if (data.userId) {
      dispatch(userEditPasswordAsync(data));
    }
  };

  var errorText = useAppSelector((state) => state.user.error);
  var messageText = useAppSelector((state) => state.user.message);

  return (
    <Paper elevation={4} sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: theme.palette.secondary.light }}>
        <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Password" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ProfileForm
          onSubmit={({ firstName, lastName }) => {
            onProfileFormSubmit({
              user: user.currentUser,
              firstName,
              lastName,
            });
          }}
          updateNameError={errorText}
          updateNameMessage={messageText}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PasswordForm
          onSubmit={({ oldPass, newPassFirst }) => {
            onPasswordFormSubmit({
              userId: user.currentUser?.id,
              passwordObject: { oldPass, newPass: newPassFirst },
            });
          }}
          updatePasswordError={errorText}
          updatePasswordMessage={messageText}
        />
      </TabPanel>
    </Paper>
  );
}
