import { act, renderHook } from '@testing-library/react-hooks';

import { usePagination } from './usePagination';

describe('usePagination hook', () => {
  test('initializes correctly', () => {
    const { result } = renderHook(() => usePagination());

    expect(result.current.beforeCursor).toBeNull();
    expect(result.current.afterCursor).toBeNull();
    expect(typeof result.current.handlePageChange).toBe('function');
  });

  test('navigates correctly', () => {
    const { result } = renderHook(() => usePagination());
    act(() => {
      result.current.handlePageChange({
        newPage: 2,
        startCursor: 'Y3Vyc29yOjIx',
        endCursor: 'Y3Vyc29yOjMw',
      });
    })

    expect(result.current.beforeCursor).toBe(null);
    expect(result.current.afterCursor).toBe('Y3Vyc29yOjMw');
    expect(typeof result.current.handlePageChange).toBe('function');

    act(() => {
      result.current.handlePageChange({
        newPage: 1,
        startCursor: 'Y3Vyc29yOjIx',
        endCursor: 'Y3Vyc29yOjMw',
      });
    })

    expect(result.current.beforeCursor).toBe('Y3Vyc29yOjIx');
    expect(result.current.afterCursor).toBe(null);
    expect(typeof result.current.handlePageChange).toBe('function');
  });
});
