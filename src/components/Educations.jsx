import React, { useContext } from "react";
import {
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import List from "@mui/material/List";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import { ThemeContext } from "../ThemeContext";
import { renderColor } from "../utils/renderColor";
import FadeInSection from "../utils/FadeInSection";
import Education from "./Education";

const Educations = ({ educations }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { theme: colorTheme } = useContext(ThemeContext);

  const themeColors = renderColor(colorTheme);

  return (
    <FadeInSection>
      <Stack
        id="education"
        direction={{ xs: "column" }}
        spacing={2}
        sx={{
          bgcolor: themeColors.background.secondary,
          borderRadius: 2,
          color: "text.primary",
          textAlign: "justify",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginX: { xs: 1, md: 2 },
          my: 2,
          p: 2,
        }}
      >
        <Stack direction="row" spacing={1} my={0.5}>
          <SchoolOutlinedIcon
            fontSize="large"
            htmlColor={themeColors.text.primary}
          />
          <Typography
            variant={isSmallScreen ? "h6" : "h5"}
            gutterBottom
            fontWeight="bold"
            color={themeColors.text.primary}
            sx={{
              paddingBottom: "2px",
              marginBottom: 2,
            }}
          >
            Education
          </Typography>
        </Stack>
        <List>
          {educations?.map((education, index) => (
            <Education education={education} key={index} />
          ))}
        </List>
      </Stack>
    </FadeInSection>
  );
};

export default Educations;
