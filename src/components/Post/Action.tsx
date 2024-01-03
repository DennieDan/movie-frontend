import { Button, SvgIconTypeMap, Tooltip } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ReactNode, useState } from "react";

type ChangedActionProps = {
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

type NonChangedActionProps = {
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  name: string;
  onClick: () => void;
};

type ActionProps = ChangedActionProps | NonChangedActionProps;

function isChangedActionProps(props): props is ChangedActionProps {
  return "FirstIcon" in props;
}

export default function Action(props: ActionProps) {
  if (isChangedActionProps(props)) {
    const { FirstIcon, SecondIcon, firstName, secondName, tooltip } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isCliked, setIsClicked] = useState<boolean>(false);

    const handleClick = () => {
      setIsClicked(true);
    };

    const handleUnclick = () => {
      setIsClicked(false);
    };
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

  const { Icon, name, onClick } = props;
  return (
    <Button
      id="profile-button"
      startIcon={<Icon />}
      sx={{ color: "blue" }}
      disableElevation
      disableRipple
      onClick={onClick}
    >
      {name}
    </Button>
  );
}
