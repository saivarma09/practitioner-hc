import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  genderOptions = [
    { description: "Male", id: "M" },
    { description: "Female", id: "F" },
    { description: "Transgender", id: "T" },
    { description: "Prefers not to say", id: "O" },
    { description: "Non-binary/non-conforming", id: "N" },
    { description: "Unknown", id: "U" },
  ];

  transform(value: string): string {
    if (!value) return value;

    const found = this.genderOptions.find(opt => opt.id.toUpperCase() === value.toUpperCase());
    return found ? found.description : value;
  }


}
