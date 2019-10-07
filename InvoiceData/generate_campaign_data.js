const fs = require('fs');

const invoices = JSON.parse(fs.readFileSync('./placements_teaser_data.json'));

const generated_campaigns = invoices.reduce((campaigns, invoice) => {
  const campaignIndex = campaigns.findIndex(c => c.id === invoice.campaign_id);
  if (campaignIndex >= 0) {
    campaigns[campaignIndex] = {
      ...campaigns[campaignIndex],
      sub_total: campaigns[campaignIndex].sub_total + invoice.actual_amount + invoice.adjustments,
      invoice_count: campaigns[campaignIndex].invoice_count + 1
    };
    return campaigns;
  } else {
    const newCampaign = {
      id: invoice.campaign_id,
      name: invoice.campaign_name,
      sub_total: invoice.actual_amount + invoice.adjustments,
      reviewed: false,
      invoice_count: 1
    };
    return [...campaigns, newCampaign];
  }
}, []);

fs.writeFileSync('./placements_teaser_data_campaigns.json', JSON.stringify(generated_campaigns, null, 2));
