const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');
const utils = require('./_utils');

const Schema = mongoose.Schema;

const campaignSchema = new Schema({
  id: Number,
  name: String,
  sub_total: Number, // new field. this is kept up-to-date by a query in invoices for subtotal by campaign_id.
  reviewed: Boolean // new field. In a more complete system this might be a user id or other metadata with respect to the reviewer, or a history/changelog.
});
campaignSchema.plugin(paginate);

campaignSchema.statics.filterAndSortSingleField = function (query = {}, field, dir = 'asc', start, end) {
  let sort = {};
  if(field) {
    sort[field] = utils.direction[dir];
  }
  return utils.queryWithPage(this, query, sort, start, end);
};

campaignSchema.statics.getGrandTotalForQuery = async function (query = {}) {
  // this would probably be handled better by an aggregation query.
  const campaigns = await this.find(utils.convertQueryToFilter(query)).lean().exec();
  return campaigns.reduce((total, campaign) => (total + campaign.sub_total), 0);
};

campaignSchema.statics.updateSubtotal = async function(query = {}, invoiceModel) {
  // again, aggregate query would make this better.
  const campaign = await this.findOne(query).lean().exec();
  const lineItems = await invoiceModel.find({campaign_id: campaign.id}).lean().exec();
  let newSubtotal = lineItems.reduce((total, item) => total += (item.actual_amount + item.adjustments), 0);
  campaign.sub_total = newSubtotal;
  return this.updateOne(query, campaign);
}

module.exports = mongoose.model('campaigns', campaignSchema);
