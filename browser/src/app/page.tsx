import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import orange from "@mui/material/colors/orange";
import CreateIcon from "@mui/icons-material/Create";
import BuildIcon from "@mui/icons-material/Build";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { SloganPaper, OpinionCard } from "./components";

export default function Home() {
  return (
    <Box>
      <Typography
        component={"h1"}
        variant={"h2"}
        sx={{ textAlign: "center", fontWeight: 400 }}
      >
        <Box component="span" sx={{ color: orange[500] }}>
          C
        </Box>
        ompetitor{" "}
        <Box component={"span"} sx={{ display: { xs: "none", sm: "inline" } }}>
          -
        </Box>{" "}
        sport events management system
      </Typography>
      <Box sx={homeBoxStyle}>
        <SloganPaper Icon={CreateIcon} slogan={"Create"} />
        <SloganPaper Icon={BuildIcon} slogan={"Customize"} rotateRight={true} />
        <SloganPaper Icon={AttachMoneyIcon} slogan={"Benefit"} />
        <SloganPaper
          Icon={CelebrationIcon}
          slogan={"Enjoy"}
          rotateRight={true}
        />
      </Box>
      <Typography
        component={"h2"}
        variant={"h3"}
        sx={{ textAlign: "center", fontWeight: 400 }}
      >
        What folks says
      </Typography>
      <Box sx={homeBoxStyle}>
        <OpinionCard src="/images/folks/folk-one.jpg" alt="Alice Chains">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ad.
          Cupiditate facilis, perferendis, earum exercitationem ducimus,
          molestias est voluptates nam odio ullam alias? Sequi deleniti non
          aperiam deserunt sapiente dolorum.
        </OpinionCard>
        <OpinionCard src="/images/folks/folk-two.jpg" alt="Steve Wolfskin">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ad.
          Cupiditate facilis, perferendis, earum exercitationem ducimus,
          molestias est voluptates nam odio ullam alias? Sequi deleniti non
          aperiam deserunt sapiente dolorum.
        </OpinionCard>
        <OpinionCard src="/images/folks/folk-three.jpg" alt="Janet Watcher">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ad.
          Cupiditate facilis, perferendis, earum exercitationem ducimus,
          molestias est voluptates nam odio ullam alias? Sequi deleniti non
          aperiam deserunt sapiente dolorum.
        </OpinionCard>
        <OpinionCard src="/images/folks/folk-four.jpg" alt="Kate Seawind">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ad.
          Cupiditate facilis, perferendis, earum exercitationem ducimus,
          molestias est voluptates nam odio ullam alias? Sequi deleniti non
          aperiam deserunt sapiente dolorum.
        </OpinionCard>
        <OpinionCard src="/images/folks/folk-five.jpg" alt="John Focuser">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ad.
          Cupiditate facilis, perferendis, earum exercitationem ducimus,
          molestias est voluptates nam odio ullam alias? Sequi deleniti non
          aperiam deserunt sapiente dolorum.
        </OpinionCard>
      </Box>
    </Box>
  );
}

const homeBoxStyle = {
  display: "flex",
  flexDirection: {
    xs: "column",
    lg: "row",
  },
  my: 8,
  justifyContent: "center",
};
