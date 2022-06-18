import { decode } from "html-entities";
import Highlighter from "react-highlight-words";

export const processBlocks = (blocks, getUserProfile, getEmoji, matchArray) => {
  if (!blocks) return;
  blocks = blocks[0].elements;
  if (!blocks) return;

  const processMatching = (block) => {
    if (!matchArray) return block.text;
    return (
      <Highlighter
        highlightClassName="highlight"
        searchWords={matchArray}
        textToHighlight={block.text}
      />
    );
  };
  const processLink = (block) => {
    return (
      <a href={block.url} className="link">
        {block.text}
      </a>
    );
  };
  const processMention = (block) => {
    return (
      <text className="mention">
        @{getUserProfile(block.user_id)?.real_name}
      </text>
    );
  };
  const processEmoji = (block) => {
    return decode(getEmoji(block.name));
  };
  const processSection = (block) => {
    if (block.type === "text") return processMatching(block);
    if (block.type === "link") return processLink(block);
    if (block.type === "user") return processMention(block);
    if (block.type === "emoji") return processEmoji(block);
  };

  let result = [];
  for (const el of blocks) {
    if (el.type === "rich_text_section")
      for (const block of el.elements) {
        result.push(processSection(block));
      }
    else if (el.type === "rich_text_list") {
      for (let i = 0; i < el.elements.length; i++) {
        let res = [el.style === "ordered" ? `${i + 1}. ` : "• "];
        for (const block of el.elements[i].elements)
          res.push(processSection(block));
        result.push(res);
        result.push("\n");
      }
    }
  }

  return result;
};
