import React from 'react';
import { Box, Color, Select } from "ink";

export const ListItem = ({ story}) => {
  return story && story.url ? (
    <Box flexDirection="column" marginBottom={1}>
        {/* <a href={story.url}>{story.title}</a> */}
        <Box>
            {story.title}
        </Box>
      <Box>
          <Box paddingLeft={1}>
            <Color blue>By:{story.by}</Color>
          </Box>
          <Box paddingLeft={1}>
            <Color orange>Posted:{story.time}</Color>
          </Box>
      </Box>
    </Box>
  ) : null;
};
