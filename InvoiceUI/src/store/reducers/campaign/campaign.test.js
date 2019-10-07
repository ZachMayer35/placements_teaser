import * as actions from './sagas';

describe('actions', () => {
  it('should create an action to get campaigns', () => {
    const query = 'SomeQuery'
    const expectedAction = {
      type: actions.GET_CAMPAIGNS,
      query
    }
    expect(actions.getCampaigns(query)).toEqual(expectedAction)
  })
})