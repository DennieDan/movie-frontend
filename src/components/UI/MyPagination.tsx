import { Pagination } from "@mui/material";

type MyPaginationProps = {
  pages: number;
};
export default function MyPagination({ pages }: MyPaginationProps) {
  return (
    <Pagination
      count={pages}
      variant="outlined"
      color="secondary"
      size="large"
      showFirstButton
      showLastButton
    />
  );
}
