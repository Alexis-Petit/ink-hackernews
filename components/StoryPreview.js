import React from 'react';
import { Box, Color, Select } from "ink";

export const StoryPreview = ({ by, time}) => (
    <>
        By <Color magenta>{`${by} `}</Color>{`${time} `}ago
    </>
)   
