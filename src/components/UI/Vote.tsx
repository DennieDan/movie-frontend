import { IconButton, Stack, Typography } from "@mui/material";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

type VoteProps = {
  value: number;
};

export default function Vote({ value }: VoteProps) {
  return (
    <Stack width="8%" direction="column" display="flex" alignItems="center">
      <IconButton sx={{ borderRadius: "10px", padding: "0.125px" }}>
        <ArrowDropUpRoundedIcon sx={{ fontSize: 70 }} />
      </IconButton>
      <Typography>{value}</Typography>
      <IconButton sx={{ borderRadius: "10px", padding: "0.125px" }}>
        <ArrowDropDownRoundedIcon sx={{ fontSize: 70 }} />
      </IconButton>
    </Stack>
  );
}
