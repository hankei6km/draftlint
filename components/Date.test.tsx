import React from 'react';
import { render } from '@testing-library/react';
// https://stackoverflow.com/questions/56547215/react-testing-library-why-is-tobeinthedocument-not-a-function
import '@testing-library/jest-dom';
import Date from './Date';

describe('Date', () => {
  test('renders formatted datetime', () => {
    const { getByText } = render(
      <Date
        dateString="2020-12-26T15:29:14.476Z"
        dateFormat="yyyy-MM-dd HH:mm"
      />
    );
    // UTC ぽい?、他の  tz のテストは?
    const formatted = getByText(/^2020-12-26 15:29$/);
    expect(formatted).toBeInTheDocument();
  });
});
