import React, { useContext } from "react";
import {
  Box,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import { ThemeContext } from "../ThemeContext";
import { renderColor } from "../utils/renderColor";
import FadeInSection from "../utils/FadeInSection";
import Experience from "./Experience";

const Experiences = ({ experiences }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { theme: colorTheme } = useContext(ThemeContext);

  const themeColors = renderColor(colorTheme);

  return (
    <FadeInSection>
      <Stack
        id="experience"
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{
          backgroundColor: themeColors.background.secondary,
          borderRadius: 2,
          color: themeColors.text.primary,
          textAlign: "justify",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginX: { xs: 1, md: 2 },
          my: 2,
          p: 2,
          overflowX: "hidden",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Stack
            direction="row"
            spacing={1}
            my={0.5}
            sx={{
              justifyContent: { xs: "flex-start", md: "center" },
              alignItems: "center",
              marginBottom: 3,
            }}
          >
            <Typography
              variant={isSmallScreen ? "h6" : "h5"}
              gutterBottom
              fontWeight="bold"
              color="inherit"
              sx={{
                paddingBottom: "2px",
              }}
            >
              Experience
            </Typography>
          </Stack>
          <Timeline
            sx={{
              margin: isSmallScreen ? "auto" : "initial",
              textAlign: isSmallScreen ? "center" : "left",
              width: "100%",
              overflowX: "hidden", // Prevent horizontal scrolling
              mt: 2,
            }}
          >
            {experiences?.map((item, index) => (
              <Experience item={item} key={index} />
            ))}
          </Timeline>
        </Box>
      </Stack>
    </FadeInSection>
  );
};

export default Experiences;
