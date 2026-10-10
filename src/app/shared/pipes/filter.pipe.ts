import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'FilterCustomPipe'
})
export class FilterPipe implements PipeTransform {
  transform(list: any, filterBy: string) {
    const value = (filterBy ?? '').trim().toLowerCase();
    if (value === '' || value === 'all' || list.length === 0) return list;
    return list.filter((e: any) => e.gender?.toLowerCase() === value);
  }
}
