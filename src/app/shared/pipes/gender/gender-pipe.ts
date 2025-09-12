import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: string): string {
    if (value.toUpperCase() == 'M') {
      return "Male"
    } else if (value.toUpperCase() === 'F') {
      return "Female"
    } else {
      return value
    }
  }

}
