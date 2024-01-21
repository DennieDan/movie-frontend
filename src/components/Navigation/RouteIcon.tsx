import {
  IconButton,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";
import { styled } from "@mui/styles";
import { ReactNode } from "react";

type RouteIconProps = {
  children: ReactNode;
  tooltip: string;
  onClick: () => void;
};

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: 14,
  },
}));

export default function RouteIcon({
  children,
  tooltip,
  onClick,
}: RouteIconProps) {
  return (
    <BootstrapTooltip title={tooltip} placement="bottom">
      <IconButton onClick={onClick}>{children}</IconButton>
    </BootstrapTooltip>
  );
}
