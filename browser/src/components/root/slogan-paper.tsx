import SvgIcon from "@mui/material/SvgIcon";
import Paper from "@mui/material/Paper";
import grey from "@mui/material/colors/grey";
import Typography from "@mui/material/Typography";

export function SloganPaper({ Icon, slogan, rotateRight }: Props) {
  return (
    <Paper
      sx={{
        m: 2,
        p: 1.5,
        display: "flex",
        alignItems: "center",
        background: grey[200],
        "&:hover": {
          rotate: rotateRight ? "5deg" : "-5deg",
        },
      }}
    >
      <Icon
        sx={{
          fontSize: 30,
          mr: 1,
        }}
      />
      <Typography component={"h2"} variant={"h4"}>
        {slogan}
      </Typography>
    </Paper>
  );
}

type Props = {
  Icon: typeof SvgIcon;
  slogan: string;
  rotateRight?: boolean;
};
