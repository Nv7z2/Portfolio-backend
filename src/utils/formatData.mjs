/** Format Notion text property from array to string */
export const formatText = text => {
  return text.map(t => t.plain_text).toString();
};

/** Format Notion date property from full date to specified string */
export const formatDate = date => {
  return date.split('-').slice(0, 2).reverse().join('-');
};
