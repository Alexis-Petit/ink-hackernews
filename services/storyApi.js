import axios from "axios"
import { mapHtmlToMarkdown } from "../mappers/mapHtmlToMarkdown"

export const getStoryMarkdown = async url => {
  const result = await axios.get(url)
  return mapHtmlToMarkdown(result)
}
