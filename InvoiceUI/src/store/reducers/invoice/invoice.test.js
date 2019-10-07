import * as actions from './sagas';

describe('actions', () => {
  it('should create an action to get an invoice', () => {
    const query = 'SomeQuery'
    const expectedAction = {
      type: actions.GET_INVOICE,
      query
    }
    expect(actions.getInvoice(query)).toEqual(expectedAction)
  })
})