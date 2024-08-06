"use client";

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

    const roundedLeft = (position === "first" || position === "single") ? "rounded-l-md" : "";
    const roundedRight = (position === "last" || position === "single") ? "rounded-r-md" : "";
    const middleButton = position === "middle" ? "text-gray-300" : "";
    const hover = (!isActive && position !== "middle") ? "hover:bg-gray-100" : "";
    const activePageButton = isActive ? "z-10 bg-blue-400 border-blue-500 text-white" : "";

    return isActive || position === 'middle' ? (
      <div className={`flex h-10 w-10 items-center justify-center text-sm border ${roundedLeft} ${roundedRight} ${middleButton} ${hover} ${activePageButton}`}>{page}</div>
    ) : (
      <Link className={`flex h-10 w-10 items-center justify-center text-sm border ${roundedLeft} ${roundedRight} ${middleButton} ${hover} ${activePageButton}`} href={href}>
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
  
    const arrow =
      direction === 'left' ? (
        <p>Anterior</p>
      ) : (
        <p>Siguiente</p>
      );

      const pointerEvents = isDisabled ? "pointer-events-none text-gray-300" : "";
      const hover = !isDisabled ? "hover:bg-gray-100" : "";
      const marginRight = direction === "left" ? "mr-2 md:mr-4" : "";
      const marginLeft = direction === "right" ? "ml-2 md:ml-4" : "";
  
    return isDisabled ? (
      <div className={`flex h-10 w-24 items-center justify-center rounded-md border ${pointerEvents} ${hover} ${marginRight} ${marginLeft}`}>{arrow}</div>
    ) : (
      <Link className={`flex h-10 w-24 items-center justify-center rounded-md border ${pointerEvents} ${hover} ${marginRight} ${marginLeft}`} href={href}>
        {arrow}
      </Link>
    );
  }