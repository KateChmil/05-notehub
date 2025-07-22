import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
    selectedPage: number;
    totalPages: number;
    onPageChange: (selected: number) => void;
}

export default function Pagination({ selectedPage, totalPages, onPageChange }: PaginationProps) {
    return (
        < ReactPaginate
        pageCount={totalPages}
            forcePage={selectedPage - 1}
            onPageChange={(e) => onPageChange(e.selected + 1)}
            containerClassName={css.pagination}
            activeClassName={css.active}
        
        />
    );
}