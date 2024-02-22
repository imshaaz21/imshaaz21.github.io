import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import {
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { renderColor } from "../utils/renderColor";

const Experience = ({ item }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { theme: colorTheme } = useContext(ThemeContext);

  const themeColors = renderColor(colorTheme);
  return (
    <TimelineItem>
      <TimelineOppositeContent
        color={themeColors.text.secondary}
        sx={{
          flex: isSmallScreen ? 1 : 2,
          textAlign: isSmallScreen ? "center" : "flex-start",
          paddingRight: isSmallScreen ? 1 : 2,
          margin: 0,
          width: "100%",
        }}
      >
        <Typography variant="subtitle2" color={themeColors.text.secondary}>
          {item?.date}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot sx={{ backgroundColor: themeColors.text.secondary }} />
        <TimelineConnector
          sx={{ backgroundColor: themeColors.text.secondary }}
        />
      </TimelineSeparator>
      <TimelineContent sx={{ flex: isSmallScreen ? 2 : 2, width: "100%" }}>
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{ color: themeColors.text.primary }}
        >
          {item?.position}
        </Typography>
        <Typography
          variant="body2"
          color={themeColors.text.secondary}
          sx={{ fontWeight: "lighter" }}
        >
          {item?.workplace}
        </Typography>
        <List style={{ marginTop: 0, paddingTop: 0 }}>
          {item?.descriptions?.map((desc, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                paddingX: 0,
                "& .MuiSvgIcon-root": {
                  verticalAlign: "middle",
                },
              }}
            >
              <div className="MuiListItemIcon-root" style={{ marginRight: 5 }}>
                <BookmarkIcon
                  fontSize="small"
                  htmlColor={themeColors.text.primary}
                />
              </div>
              <Typography
                variant="body2"
                sx={{ margin: 0 }}
                color={themeColors.text.secondary}
                textAlign={isSmallScreen ? "left" : "justify"}
              >
                {desc}
              </Typography>
            </ListItem>
          ))}
        </List>
      </TimelineContent>
    </TimelineItem>
  );
};

export default Experience;
