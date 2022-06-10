export const processLinks = (text) => {
  const URL_REGEX =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  let result = [];
  let last = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "<") {
      let link = "",
        j = i + 1;
      while (text[j] !== ">") {
        link += text[j];
        j++;
      }

      let url = link.split("|")[0];
      let desc = link.split("|")[1];
      if (!desc) desc = url;

      if (URL_REGEX.test(url)) {
        console.log(link);
        result.push(last);
        result.push(<a href={url}>{desc}</a>);
        last = "";
        i = j;
        continue;
      }
    }
    last += text[i];
  }
  result.push(last);

  return result;
};
