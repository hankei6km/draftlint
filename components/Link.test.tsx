import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import Button from '@material-ui/core/Button';
import { mockRouter } from '../test/testUtils';

import Link from './Link';

describe('Link', () => {
  it('renders link and click', () => {
    const router = mockRouter();
    const { getByRole } = render(
      <RouterContext.Provider value={router}>
        <Link href="/test1/[id]" as="/test1/xxxxxx">
          test
        </Link>
      </RouterContext.Provider>
    );
    const a = getByRole('link');
    expect(a).toBeInTheDocument();
    expect(a.getAttribute('href')).toEqual('/test1/xxxxxx');
    fireEvent.click(a);
    expect(router.push).toHaveBeenCalledWith('/test1/[id]', '/test1/xxxxxx', {
      locale: undefined,
      scroll: true,
      shallow: undefined
    });
  });
  it('works in another component', () => {
    const router = mockRouter();
    const { getByRole } = render(
      <RouterContext.Provider value={router}>
        <Button component={Link} href="/test1/[id]" as="/test1/xxxxxx">
          test
        </Button>
      </RouterContext.Provider>
    );
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(router.push).toHaveBeenCalledWith('/test1/[id]', '/test1/xxxxxx', {
      locale: undefined,
      scroll: true,
      shallow: undefined
    });
  });
});
