import { useCallback, useRef, useState } from 'react';

interface HandlePageOptions {
  newPage: number;
  startCursor: string;
  endCursor: string;
}

export const usePagination = () => {
  const [beforeCursor, setBeforeCursor] = useState<string | null>(null);
  const [afterCursor, setAfterCursor] = useState<string | null>(null);

  const page = useRef(1);

  const handlePageChange = useCallback(
    ({ newPage, startCursor, endCursor }: HandlePageOptions) => {
      if (newPage > page.current) {
        setAfterCursor(endCursor);
        setBeforeCursor(null);
      } else {
        setAfterCursor(null);
        setBeforeCursor(startCursor);
      }
      page.current = newPage;
    },
    []
  );
  return { beforeCursor, afterCursor, handlePageChange };
};