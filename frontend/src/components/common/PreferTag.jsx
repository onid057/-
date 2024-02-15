import Paragraph from './Paragraph';

function PreferTag({ tagArray, tagString, splitter, fontSize }) {
  const tags = tagString ? tagString.split(splitter) : tagArray;
  const tagsWithSharp = tags.map(tag => `# ${tag}  `);

  let upperTags = '',
    lowerTags = '';
  tagsWithSharp.map((tagWithSharp, index) => {
    if (index <= 2) upperTags += tagWithSharp;
    else lowerTags += tagWithSharp;
  });

  return tags.length >= 3 ? (
    <Paragraph
      gap="5px"
      fontSize={fontSize}
      sentences={[upperTags]}
    ></Paragraph>
  ) : (
    <Paragraph
      fontSize={fontSize}
      sentences={[upperTags, lowerTags]}
    ></Paragraph>
  );
}

export default PreferTag;
