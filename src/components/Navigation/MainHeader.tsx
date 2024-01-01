import { Box, Typography } from "@mui/material";

import { PropsWithChildren } from "react";
import SearchBar from "../UI/SearchBar.tsx";

type MainHeaderProps = PropsWithChildren;

export default function MainHeader({ children }: MainHeaderProps) {
  return (
    <Box
      width="100%"
      height="80px"
      sx={{ background: "#82a9e8", padding: "5px 20px", borderRadius: "5px" }}
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" alignItems="center">
          <Typography
            align="center"
            variant="h5"
            color="blue"
            fontFamily="Arial"
            fontWeight="700"
          >
            Movie Hub
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" width="35%">
          <SearchBar />
        </Box>
        {children}
      </Box>
    </Box>
  );
}
