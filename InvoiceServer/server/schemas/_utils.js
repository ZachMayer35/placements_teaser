const direction = {
  asc: 1,
  desc: -1
};

const convertQueryToFilter = (query) => {
  for(field in query){
    // treat name fields as text search.
    if(field.includes('name')) {
      query[field] = { $regex: query[field], $options: 'i' };
    }
  }
  return query
}

const queryWithPage = function(context, query = {}, sort = {}, start = 1, end = 50) {
  return context.paginate(convertQueryToFilter(query), { select: '-_id', sort, offset: start - 1, limit: start ? (end - start + 1) : end });
}

module.exports = {
  direction,
  queryWithPage,
  convertQueryToFilter
};
