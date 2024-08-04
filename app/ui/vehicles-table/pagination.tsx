'use client';

import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    // NOTE: comment in this code when you get to this point in the course
  
    const allPages = generatePagination(currentPage, totalPages);
  
    const createPageURL = (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    };
  
    return (
      <>
        {/* NOTE: comment in this code when you get to this point in the course */}
  
        { <div className="inline-flex">
          <PaginationArrow
            direction="left"
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />
  
          <div className="flex -space-x-px">
            {allPages.map((page, index) => {
              let position: 'first' | 'last' | 'single' | 'middle' | undefined;
  
              if (index === 0) position = 'first';
              if (index === allPages.length - 1) position = 'last';
              if (allPages.length === 1) position = 'single';
              if (page === '...') position = 'middle';
  
              return (
                <PaginationNumber
                  key={page}
                  href={createPageURL(page)}
                  page={page}
                  position={position}
                  isActive={currentPage === page}
                />
              );
            })}
          </div>
  
          <PaginationArrow
            direction="right"
            href={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= totalPages}
          />
        </div> }
      </>
    );
  }
  
  function PaginationNumber({
    page,
    href,
    isActive,
    position,
  }: {
    page: number | string;
    href: string;
    position?: 'first' | 'last' | 'middle' | 'single';
    isActive: boolean;
  }) {
  
    return isActive || position === 'middle' ? (
      <div className="px-2">{page}</div>
    ) : (
      <Link className="px-2" href={href}>
        {page}
      </Link>
    );
  }
  
  function PaginationArrow({
    href,
    direction,
    isDisabled,
  }: {
    href: string;
    direction: 'left' | 'right';
    isDisabled?: boolean;
  }) {
  
    //const icon =
    //  direction === 'left' ? (
    //    <ArrowLeftIcon className="w-4" />
    //  ) : (
    //    <ArrowRightIcon className="w-4" />
    //  );
  
    return isDisabled ? (
      <div>Flecha</div>
    ) : (
      <Link  href={href}>
        Flecha
      </Link>
    );
  }