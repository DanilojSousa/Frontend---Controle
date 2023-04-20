import { Sort } from "@angular/material/sort";
import { Pageable } from "./pageable";
import { Usuario } from "../usuario";

export interface Page<T> {
    content: T[];
    empty: boolean;
    first: boolean;
    number: number;
    numberOfElements: number;
    pageable: Pageable
    last: boolean;
    size: number;
    sort: Sort;
    totalElements: number
    totalPages: number
  }