
import {
  Toolbar,
  AppBar,
  Link,
  Typography,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firbase/config";
import { signOut } from "firebase/auth";


const Appbar = ({ drawerWidth, showDrawer }) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex" }}>
        <Typography variant="h1" color="error">
          {" "}
          ERROR{" "}
        </Typography>
      </Box>
    );
  }

  return (
    <AppBar
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { xs: 0, sm: `${drawerWidth}px` },
      }}
      position="static"
    >
      <Toolbar>
        <IconButton
          onClick={() => {
            showDrawer();
          }}
          sx={{ mr: "9px", display: { sm: "none" } }}
        >
          <Menu />
        </IconButton>
        <Link
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            "&:hover": { fontSize: "16.5px" },
          }}
          color="inherit"
          href="/"
        >
          Online store
        </Link>

        {!user && (
          <li>
            <Link sx={{
              flexGrow: 1,
              textDecoration: "none",
              marginRight: "10px",
              "&:hover": { fontSize: "16.5px" },
            }}
              color="inherit"
              href="/signin">
              Sign-in
            </Link>
          </li>
        )}

        {!user && (
          <li>
            <Link sx={{
              flexGrow: 1,
              textDecoration: "none",
              "&:hover": { fontSize: "16.5px" },
            }}
              color="inherit"
              href="/signup">
              Sign-up
            </Link>
          </li>
        )}

        {user && (
          <li style={{ marginRight: "10px",}}
            onClick={() => {
              signOut(auth)
                .then(() => {
                  console.log("Sign-out successful.");
                })
                .catch((error) => {
                  // An error happened.
                });
            }}
          >
            Signout
          </li>
        )}
       
        {user && (
          <li>
            <p>{user.displayName}</p>
          </li>
        )}

      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
