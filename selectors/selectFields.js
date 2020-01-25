import {mapTime} from '../mappers/mapTime'

export const selectFields = ({ id, by, url, text, time, title } = {}) => ({
    id,
    by,
    url,
    text,
    time: mapTime(time),
    title,
  });