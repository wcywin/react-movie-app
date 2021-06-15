 const getSlugFromTitle = (movieTitle: string) => movieTitle
  .toLowerCase()
  .replace(/[%#<>@;:/?!&=+${}|`,.-]/g, '')
  .split(' ')
  .join('-')

 export default getSlugFromTitle
