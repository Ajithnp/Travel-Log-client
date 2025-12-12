
import {
  Pagination,
  PaginationContent,
  //   PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import clsx from "clsx";

interface TableFooterProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TableFooter = ({
  currentPage,
  totalPages,
  onPageChange
}: TableFooterProps) => {
  const isEmpty: boolean = totalPages === 0;
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  aria-disabled={isEmpty || currentPage === 1}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!isEmpty && currentPage > 1) {
                      onPageChange(currentPage - 1);
                    }
                  }}
                  className={clsx({
                    "pointer-events-none opacity-50 cursor-default": isEmpty || currentPage === 1,
                    "cursor-pointer": !isEmpty && currentPage > 1,
                  })}
                />
              </PaginationItem>
              {/* {page numbers} */}
              {!isEmpty &&
                Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(i + 1);
                      }}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              {/* next button */}
              <PaginationItem>
                <PaginationNext
                  aria-disabled={isEmpty || currentPage === totalPages}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!isEmpty && currentPage < totalPages) {
                      onPageChange(currentPage + 1);
                    }
                  }}
                  className={clsx({
                    "pointer-events-none opacity-50 cursor-default": isEmpty || currentPage === totalPages,
                     "cursor-pointer": !isEmpty && currentPage < totalPages,
                  })}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default TableFooter;
