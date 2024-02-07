import Paragraph from './Paragraph';

function PreferTag({ tagString, splitter }) {
  const tags = tagString.split(splitter);
  const tagsWithSharp = tags.map(tag => `# ${tag} `);

  let upperTags = '',
    lowerTags = '';
  tagsWithSharp.map((tagWithSharp, index) => {
    if (index <= 2) upperTags += tagWithSharp;
    else lowerTags += tagWithSharp;
  });

  return tags.length >= 3 ? (
    <Paragraph gap="5px" font-size="16px" sentences={[upperTags]}></Paragraph>
  ) : (
    <Paragraph font-size="16px" sentences={[upperTags, lowerTags]}></Paragraph>
  );
}

export default PreferTag;
