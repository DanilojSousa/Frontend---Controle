import { Sort } from "@angular/material/sort";

export interface Pageable {
    ofset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: Sort;
    unpaged: boolean;

  }