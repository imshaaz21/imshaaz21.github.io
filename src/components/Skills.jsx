import React, { useContext, useMemo } from "react";
import FadeInSection from "../utils/FadeInSection";
import { Col, Row } from "react-bootstrap";
import { ThemeContext } from "../ThemeContext";
import { renderColor } from "../utils/renderColor";
import Skill from "./Skill";
import { Stack } from "@mui/material";

const Skills = ({ skills }) => {
  const { theme: colorTheme } = useContext(ThemeContext);
  const themeColors = renderColor(colorTheme);

  const maxDescriptionHeight = useMemo(() => {
    if (!skills) return 0;
    return Math.max(...skills.map((skill) => skill?.description?.length ?? 0));
  }, [skills]);

  const maxItemHeight = useMemo(() => {
    if (!skills) return 0;
    return Math.max(
      ...skills.map((skill) => skill?.items?.join(" | ")?.length ?? 0)
    );
  });

  return (
    <FadeInSection>
      <Stack
        id="skills"
        direction="column"
        spacing={2}
        sx={{
          color: themeColors.text.primary,
          textAlign: "justify",
          alignItems: "center",
          justifyContent: "center",
          marginX: { xs: 1, md: 2 },
          my: 2,
          p: 2,
        }}
      >
        <h2
          className={
            colorTheme === "dark"
              ? "ui horizontal divider header mt-3 mb-3 text-light"
              : "ui horizontal divider header mt-3 mb-3 text-dark"
          }
        >
          Skills
        </h2>
        <Row xs={1} md={2} lg={3} className="justify-content-center m-1">
          {skills?.map((skill, index) => (
            <Col className="mt-4 d-flex justify-content-center" key={index}>
              <Skill
                skill={skill}
                maxDescriptionHeight={maxDescriptionHeight}
                maxItemHeight={maxItemHeight}
              />
            </Col>
          ))}
        </Row>
      </Stack>
    </FadeInSection>
  );
};

export default Skills;
