import {
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { ThemeContext } from "../ThemeContext";
import { renderColor } from "../utils/renderColor";

const Education = ({ education }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { theme: colorTheme } = useContext(ThemeContext);

  const themeColors = renderColor(colorTheme);

  return (
    <Container
      sx={{ marginBottom: isSmallScreen ? 3 : 4 }}
      style={{ marginLeft: 0, paddingLeft: 0 }}
    >
      <Typography
        variant="body1"
        fontWeight="bold"
        sx={{ color: themeColors.text.primary }}
        style={{ marginTop: 0, paddingTop: 0 }}
        textAlign="left"
      >
        {education?.field}
      </Typography>
      <Stack direction="row" spacing={1} my={0.5}>
        <BookmarkIcon fontSize="small" htmlColor={themeColors.text.secondary} />
        <Typography
          variant="body1"
          color={themeColors.text.secondary}
          sx={{ fontWeight: "lighter" }}
        >
          {education?.place}
        </Typography>
      </Stack>
      <Typography
        variant="subtitle2"
        color={themeColors.text.secondary}
        fontSize="0.8rem"
        my={0.5}
      >
        {education?.date}
      </Typography>
      <Typography
        variant="body2"
        sx={{ marginLeft: 0, my: 0.5 }}
        color={themeColors.text.secondary}
        textAlign="justify"
      >
        {isSmallScreen
          ? education?.descriptions?.map((description, eduIndex) => (
              <span key={eduIndex}>
                - {description}
                <br />
              </span>
            ))
          : education?.descriptions?.join(" | ")}
      </Typography>
    </Container>
  );
};

export default Education;
