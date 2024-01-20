import {
  Avatar,
  Button,
  Divider,
  Menu,
  MenuItem,
  MenuProps,
  alpha,
  styled,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import FolderSharedRoundedIcon from "@mui/icons-material/FolderSharedRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useState } from "react";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

type ProfileTabProps = {
  username: string;
};

export default function ProfileTab({ username }: ProfileTabProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    // <Button variant="outlined" size="large">
    //   <Box
    //     width="100%"
    //     display="flex"
    //     flexDirection="row"
    //     alignItems="center"
    //     justifyContent="space-between"
    //   >
    //     <Avatar sizes="small" />
    //     <Typography variant="h6" fontFamily="Arial">
    //       Dan Dinh
    //     </Typography>
    //   </Box>
    // </Button>
    <div>
      <Button
        id="profile-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        onClick={handleClick}
        startIcon={<Avatar sizes="small" />}
        endIcon={<KeyboardArrowDownRoundedIcon />}
        disableElevation
        disableRipple
      >
        {username}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "profile-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <FolderSharedRoundedIcon />
          My Profile
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <LogoutRoundedIcon />
          Sign out
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
