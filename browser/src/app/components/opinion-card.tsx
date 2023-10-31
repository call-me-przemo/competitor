import Image from "next/image";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import deepPurple from "@mui/material/colors/deepPurple";
import Box from "@mui/material/Box";
import grey from "@mui/material/colors/grey";

export function OpinionCard({ src, alt, children }: Props) {
  return (
    <Card sx={{ m: 2, p: 2, background: deepPurple["200"] }}>
      <Box sx={{ my: 1, display: "flex", justifyContent: "space-between" }}>
        <Image
          src={src}
          alt={alt}
          width={100}
          height={100}
          style={{ borderRadius: "100%", border: "1px solid #fff" }}
        />
        <Typography sx={{ color: grey["800"] }}>{alt}</Typography>
      </Box>
      <Typography component={"blockquote"}>{children}</Typography>
    </Card>
  );
}

type Props = {
  src: string;
  alt: string;
  children: string;
};
