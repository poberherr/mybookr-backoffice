import * as React from "react";
import { useRecordContext } from "react-admin";
import markdownit from "markdown-it";
import truncateMarkdown from "markdown-truncate";

const md = markdownit();

const MarkdownTextField = ({
  source,
  maxLength = false,
}: {
  source: string;
  maxLength: number | false;
}) => {
  const record = useRecordContext();
  const text = record?.[source] || "";

  const renderedMarkdown = React.useMemo(() => {
    if (!maxLength) {
      return md.render(text);
    }
    return md.render(
      truncateMarkdown(text, {
        limit: maxLength,
        ellipsis: true,
      }),
    );
  }, [text, maxLength]);

  console.dir({renderedMarkdown})

  return (
    <span title={text} dangerouslySetInnerHTML={{ __html: renderedMarkdown }}/>
  );
};

export default MarkdownTextField;
