import { Button, SvgIconTypeMap, Tooltip } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ReactNode, useState } from "react";

type ActionProps = {
  FirstIcon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  SecondIcon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  firstName: string;
  secondName: string;
  tooltip: string;
};

export default function Action({
  FirstIcon,
  SecondIcon,
  firstName,
  secondName,
  tooltip,
}: ActionProps) {
  const [isCliked, setIsClicked] = useState<boolean>(false);

  function handleClick() {
    setIsClicked(true);
  }

  function handleUnclick() {
    setIsClicked(false);
  }
  // const GreyIcon = styled(BookmarkBorderOutlinedIcon)({
  //   color: "grey",
  // });
  // const BlueIcon = styled(BookmarkIcon)({
  //   color: "blue",
  // });

  const nonClickedButton = (
    <Button
      id="profile-button"
      startIcon={<FirstIcon />}
      sx={{ color: "grey" }}
      onClick={handleClick}
      disableElevation
      disableRipple
    >
      {firstName}
    </Button>
  );

  const clickedButton: ReactNode = (
    <Tooltip title={tooltip} placement="bottom">
      <Button
        id="profile-button"
        startIcon={<SecondIcon />}
        sx={{ color: "blue" }}
        onClick={handleUnclick}
        disableElevation
        disableRipple
      >
        {secondName}
      </Button>
    </Tooltip>
  );
  return <>{isCliked ? clickedButton : nonClickedButton}</>;
}
