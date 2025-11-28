import { Pipe, PipeTransform } from '@angular/core';
import { MathOperation } from 'src/store/shared/_interfaces';

@Pipe({
  name: 'math',
  standalone: true,
})
export class MathPipe implements PipeTransform {
  transform(value: number, operation: MathOperation): number {
    if (value === null || value === undefined) return 0;

    switch (operation) {
      case 'round' :
      default:
        return Math.round(value)
    }
  }
}
