import React from 'react';
import { render } from '@testing-library/react';
// import { render, fireEvent } from '@testing-library/react';
// https://stackoverflow.com/questions/56547215/react-testing-library-why-is-tobeinthedocument-not-a-function
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { mockRouter } from '../test/testUtils';
import DescList from './DescList';

describe('DescList', () => {
  test('renders description list', () => {
    const router = mockRouter();
    const { baseElement } = render(
      <RouterContext.Provider value={router}>
        <DescList
          items={[
            {
              term: 'Next.js',
              descs: [
                {
                  label: 'The React Framework for Production'
                }
              ]
            },
            {
              term: 'GitHub',
              descs: [
                {
                  label: 'Where the world builds software',
                  href: 'https://github.com/'
                }
              ]
            }
          ]}
        />
      </RouterContext.Provider>
    );
    const term = baseElement.querySelectorAll('body dl dt');
    expect(term.length).toEqual(2);
    expect(term[0].textContent).toEqual('Next.js');
    expect(term[1].textContent).toEqual('GitHub');
    const label = baseElement.querySelectorAll('body dl dd');
    expect(label.length).toEqual(2);
    expect(label[0].textContent).toEqual('The React Framework for Production');
    expect(label[1].textContent).toEqual('Where the world builds software');
    expect(label[0].querySelector('a')).toBeNull();
    expect(label[1].querySelector('a')?.getAttribute('href')).toEqual(
      'https://github.com/'
    );
  });

  test('renders description list with multiple dd', () => {
    const router = mockRouter();
    const { baseElement } = render(
      <RouterContext.Provider value={router}>
        <DescList
          items={[
            {
              term: 'Pages',
              descs: [
                {
                  label: 'Docs',
                  href: '/docs'
                },
                {
                  label: 'About',
                  href: '/about'
                }
              ]
            }
          ]}
        />
      </RouterContext.Provider>
    );
    const term = baseElement.querySelectorAll('body dl dt');
    expect(term.length).toEqual(1);
    expect(term[0].textContent).toEqual('Pages');
    const label = baseElement.querySelectorAll('body dl dd');
    expect(label.length).toEqual(2);
    expect(label[0].textContent).toEqual('Docs');
    expect(label[1].textContent).toEqual('About');
    expect(label[0].querySelector('a')?.getAttribute('href')).toEqual('/docs');
    expect(label[1].querySelector('a')?.getAttribute('href')).toEqual('/about');
  });
  // test('renders description list and click', () => {
  //   const router = mockRouter();
  //   const { getByRole } = render(
  //     <RouterContext.Provider value={router}>
  //       <DescList
  //         items={[
  //           {
  //             term: 'Next.js',
  //             descs: [
  //               {
  //                 label: 'The React Framework for Production',
  //                 href: 'https://nextjs.org/'
  //               }
  //             ]
  //           }
  //         ]}
  //       />
  //     </RouterContext.Provider>
  //   );
  //   const a = getByRole('link');
  //   fireEvent.click(a);
  //   expect(router.push).toHaveBeenCalledWith(
  //     'https://nextjs.org/',
  //     'https://nextjs.org/',
  //     {
  //       locale: undefined,
  //       scroll: true,
  //       shallow: undefined
  //     }
  //   );
  // });
});
