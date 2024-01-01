import {
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ReactNode } from "react";

type SortDropDownProps = {
  children: ReactNode;
  onChange: (event: SelectChangeEvent) => void;
  value: string | undefined;
};

export default function SortDropDown({
  children,
  onChange,
  value,
}: SortDropDownProps) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
          labelId="sort-by-label"
          id="sort-by"
          value={value}
          label="Sort By"
          onChange={onChange}
        >
          {children}
        </Select>
      </FormControl>
    </Box>
  );
}
