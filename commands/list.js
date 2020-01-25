import React, {useEffect, useState} from 'react';
const axios = require('axios');
import PropTypes from 'prop-types';
import { getStories } from '../services/hnApi';
import {ListItem} from '../components/ListItem'
import { DEFAULT_SIZE_STORIES } from '../constants/index'
import {sizeIsValid} from '../utils/checkSize'

/// List command
const List = ({size}) => { 
    const [stories, setStories] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getStories(sizeIsValid(size) ? size : DEFAULT_SIZE_STORIES)
                setStories(res)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            {stories.map((story) => (
                <ListItem key={story.id} story={story}/>
            ))}
        </>
    )
}

List.propTypes = {
    size: PropTypes.number
};

List.shortFlags = {
    size: 's'
};

List.defaultProps = {
    size: DEFAULT_SIZE_STORIES
};

export default List;
