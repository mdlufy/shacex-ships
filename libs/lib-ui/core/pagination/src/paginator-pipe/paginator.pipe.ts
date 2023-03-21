import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "paginator",
})
export class PaginatorPipe implements PipeTransform {
    transform<T>(items: Array<T>, page: number, limit: number): Array<T> {
        const itemsGroups: Array<T[]> = [];

        for (let i = 0; i < items.length; i++) {
            if (i % limit === 0) {
                itemsGroups.push(items.slice(i, i + limit));
            }
        }

        return itemsGroups[page - 1];
    }
}
