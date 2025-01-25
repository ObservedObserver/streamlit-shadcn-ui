import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { forwardRef, useState, useEffect } from "react";
import { Streamlit } from "streamlit-component-lib";

interface StPaginationProps {
  totalPages: number;
  initialPage?: number; 
}
  
export const StPagination = forwardRef<HTMLDivElement, StPaginationProps>(
  (props: StPaginationProps, ref) => {
    const { totalPages=3, initialPage = 1  } = props;
    const [activePage, setActivePage] = useState<number>(initialPage);
    
    useEffect(() => {
      Streamlit.setComponentValue(activePage);
    }, [activePage]);

    const renderPageLinks = () => {
      const pageLinks = [];
      for (let i = 1; i <= totalPages; i++) {
        pageLinks.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={activePage === i}
              onClick={(e) => {
                e.preventDefault(); 
                setActivePage(i); 
                Streamlit.setComponentValue(activePage);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      return pageLinks;
    };

    return (
      <div ref={ref}>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (activePage > 1) setActivePage(activePage - 1);
                  Streamlit.setComponentValue(activePage);
                }}
              />
            </PaginationItem>

            {renderPageLinks()}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (activePage < totalPages) setActivePage(activePage + 1);
                  Streamlit.setComponentValue(activePage);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  }
);