const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');
const utils = require('./_utils');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  id: Number,
  campaign_id: Number,
  campaign_name: String,
  line_item_name: String,
  booked_amount: Number,
  actual_amount: Number,
  adjustments: Number,
  reviewed: Boolean // new field. In a more complete system this might be a user id or other metadata with respect to the reviewer, or a history/changelog.
});
itemSchema.plugin(paginate);

itemSchema.statics.filterAndSortSingleField = function (query = {}, field, dir = 'asc', start, end) {
  let sort = {};
  if (field) {
    sort[field] = utils.direction[dir];
  }
  return utils.queryWithPage(this, query, sort, start, end);
};

itemSchema.statics.updateLineItem = function (lineItem) {
  return this.updateOne({ id: lineItem.id }, lineItem);
}

module.exports = mongoose.model('items', itemSchema);
