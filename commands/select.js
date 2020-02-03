import React, { useEffect, useState } from "react"
const axios = require("axios")
import PropTypes from "prop-types"
import { getStories } from "../services/hnApi"
import { getStoryMarkdown } from "../services/storyApi"
import { DEFAULT_SIZE_STORIES } from "../constants/index"
import { sizeIsValid } from "../utils/checkSize"
import SelectInput from "ink-select-input"
import Box from "ink-box"
import { Color } from "ink"
import opn from "opn"
import { StoryPreview } from "../components/StoryPreview"
import Spinner from "ink-spinner"
import { useInput } from "ink"

/// Select an article to open in your default web browser
const Select = ({ size }) => {
  const [storiesOptions, setStoriesOptions] = useState([])
  const [highlightedStory, setHighlightedStory] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const stories = await getStories(
          sizeIsValid(size) ? size : DEFAULT_SIZE_STORIES
        )
        setStoriesOptions(
          stories.map(story => ({
            label: story.title,
            value: story,
            key: story.id
          }))
        )
        setIsLoading(false)
        setHighlightedStory(stories[0])
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  useInput((input, key) => {
    if (["O", "o"].includes(input)) {
      opn(highlightedStory.url)
    }

    if (["R", "r"].includes(input)) {
      getStoryMarkdown(highlightedStory.url)
    }
  })

  const handleSelect = ({ value: story }) => {
    opn(story.url)
  }

  const handleHighlight = ({ value: story }) => {
    setHighlightedStory(story)
  }

  return (
    <>
      <SelectInput
        items={storiesOptions}
        onSelect={handleSelect}
        onHighlight={story => handleHighlight(story)}
      />
      <Box
        borderStyle="round"
        borderColor="cyan"
        float="center"
        padding={1}
        width=""
      >
        {isLoading ? (
          <Color green>
            <Spinner type="dots" />
          </Color>
        ) : (
          <StoryPreview
            by={highlightedStory.by}
            time={highlightedStory.time}
          ></StoryPreview>
        )}
      </Box>
      <Box>
        <Color>[o] Open in browser [r] Read in console</Color>
      </Box>
    </>
  )
}

Select.propTypes = {
  ///size of the list to fetch
  size: PropTypes.number
}

Select.shortFlags = {
  size: "s"
}

Select.defaultProps = {
  size: DEFAULT_SIZE_STORIES
}

export default Select
