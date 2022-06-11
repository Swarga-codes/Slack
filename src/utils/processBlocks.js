export const processBlocks = (blocks, getUserProfile) => {
  blocks = blocks[0].elements;

  const processLink = (block) => {
    return <a href={block.url}>{block.text}</a>;
  };
  const processMention = (block) => {
    return `@${getUserProfile(block.user_id)?.real_name}`;
  };
  const processEmoji = (block) => {};
  const processSection = (block) => {
    if (block.type === "text") return block.text;
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
