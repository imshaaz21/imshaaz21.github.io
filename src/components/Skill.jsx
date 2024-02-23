import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { renderColor } from "../utils/renderColor";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import FadeInSection from "../utils/FadeInSection";

const Skill = ({ skill, maxDescriptionHeight }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { theme: colorTheme } = useContext(ThemeContext);
  const themeColors = renderColor(colorTheme);

  const getImageUrl = (image) => {
    if (!image) return "";

    const splitImage = image.split(".");
    return colorTheme === "light"
      ? `skills/${image}`
      : `skills/${splitImage[0]}_light.${splitImage[1]}`;
  };

  return (
    <FadeInSection>
      <Card
        sx={{
          maxWidth: 345,
          backgroundColor: themeColors.background.secondary,
          mt: { xs: 1, md: 0 },
        }}
      >
        <LazyLoadComponent threshold={10}>
          <CardMedia
            component="img"
            height="140"
            image={getImageUrl(skill?.image) || "fff.png"}
            alt={skill?.category}
            loading="lazy"
            sx={{ objectFit: "contain", py: 2 }}
          />
        </LazyLoadComponent>
        <CardContent
          sx={{
            backgroundColor: themeColors.background.tertiary,
            height: "100%",
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            color={themeColors.text.primary}
            align="left"
          >
            {skill?.category}
          </Typography>
          <Typography
            variant="subtitle2"
            color={themeColors.text.secondary}
            sx={{ fontWeight: 100 }}
            height={isMobile ? "auto" : maxDescriptionHeight / 3}
            textAlign="justify"
          >
            {skill?.description}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography
              variant="body2"
              sx={{ marginLeft: 0, mt: 0.5 }}
              color={themeColors.text.secondary}
              textAlign="justify"
            >
              {skill?.items?.join(" | ")}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </FadeInSection>
  );
};

export default Skill;
