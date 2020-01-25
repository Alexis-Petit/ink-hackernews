/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { STORY_INCREMENT, MAX_STORIES } from '../constants';

export const useShowMore = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(STORY_INCREMENT);

  useEffect(() => {
    if (!loading) return;

    if (count + STORY_INCREMENT >= MAX_STORIES) {
      setCount(MAX_STORIES);
    } else {
      setCount(count + STORY_INCREMENT);
    }

    setLoading(false);
  }, [loading]);

  return { count };
};