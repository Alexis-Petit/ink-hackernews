import React, {useEffect, useState} from 'react';
const axios = require('axios');
import PropTypes from 'prop-types';
import { getStories } from '../services/hnApi';
import { DEFAULT_SIZE_STORIES } from '../constants/index'
import {sizeIsValid} from '../utils/checkSize'
import SelectInput from 'ink-select-input';
import Box from 'ink-box';
import {Color} from 'ink'
import {Story} from '../components/Story'
import opn from 'opn';
import {StoryPreview} from '../components/StoryPreview'
import Spinner from 'ink-spinner'

/// Select command
const Select = ({size}) => { 
    const [storiesOptions, setStoriesOptions] = useState([]);
    const [highlightedStory, setHighlightedStory] = useState({})
    const [selectedStory, setSelectedStory] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const stories = await getStories(sizeIsValid(size) ? size : DEFAULT_SIZE_STORIES)
                setStoriesOptions(stories.map(story => ({
                    label: `${story.title} - ${story.time} ago`,
                    value: story,
                    key: story.id
                })))
                setIsLoading(false)
                setHighlightedStory(stories[0])
            } catch (error) {
                console.error(error)
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleSelect = ({value: story}) => {
        // setSelectedStory(story)
        opn(story.url)
    }

    const handleHighlight = ({value: story}) => {
        setHighlightedStory(story)
    }

    return (
        <>
            <SelectInput items={storiesOptions} onSelect={handleSelect} onHighlight={(story) => handleHighlight(story)}/>
                <Box borderStyle="round" borderColor="cyan" float="center" padding={1} width=''>
                    {isLoading ? (
                        <Color green><Spinner type="dots"/></Color>
                    ) : (
                        <StoryPreview by={highlightedStory.by} time={highlightedStory.time}></StoryPreview>
                        
                    )}
                </Box>
            {selectedStory && <Story story={selectedStory}/>}
        </>
    )
}

Select.propTypes = {
    size: PropTypes.number
};

Select.shortFlags = {
    size: 's'
};

Select.defaultProps = {
    size: DEFAULT_SIZE_STORIES
};

export default Select;
