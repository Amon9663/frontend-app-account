import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { getExistingIdVerification } from '../data/service';
import { IdVerificationContextProvider } from '../IdVerificationContext';

jest.mock('../data/service', () => ({
  getExistingIdVerification: jest.fn(),
}));

describe('IdVerificationContext', () => {
  const defaultProps = {
    children: <div />,
    intl: {},
  };

  afterEach(() => {
    cleanup();
  });

  it('renders correctly and calls getExistingIdVerification', async () => {
    await act(async () => render((
      <AppContext.Provider value={{ authenticatedUser: { userId: 3 } }}>
        <IntlProvider locale="en">
          <IdVerificationContextProvider {...defaultProps} />
        </IntlProvider>
      </AppContext.Provider>
    )));
    expect(getExistingIdVerification).toHaveBeenCalled();
  });
});
