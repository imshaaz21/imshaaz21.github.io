import { Box, Container, Link, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { renderColor } from "../utils/renderColor";

const Footer = () => {
  const { theme: colorTheme } = useContext(ThemeContext);

  const themeColors = renderColor(colorTheme);

  const currentYear = new Date().getFullYear();

  return (
    <Paper
      sx={{
        marginTop: "auto",
        width: "100%",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        bgcolor: themeColors.background.secondary,
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 1,
          }}
        >
          <Typography variant="caption" color={themeColors.text.primary}>
            &copy; {currentYear}{" "}
            <Link
              href="https://www.linkedin.com/in/imshaaz"
              color={themeColors.text.primary}
            >
              @imshaaz.
            </Link>{" "}
            All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};

export default Footer;
