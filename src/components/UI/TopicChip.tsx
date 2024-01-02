import { Chip } from "@mui/material";

type TopicChipProps = {
  name: string;
  color:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
};
export default function TopicChip({ name, color }: TopicChipProps) {
  return <Chip label={name} variant="filled" color={color} />;
}
