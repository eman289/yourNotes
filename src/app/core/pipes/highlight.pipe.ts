import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(wholeText: string, inputTerm: string): string {
    if (!inputTerm) {
      return wholeText;
    }
    const re = new RegExp(inputTerm, 'gi');
    return wholeText.replace(re, '<mark>$&</mark>');
  }
}
