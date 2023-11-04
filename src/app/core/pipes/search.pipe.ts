import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../interfaces/note';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(notes: Note[], inputTerm: string): Note[] {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(inputTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(inputTerm.toLowerCase())
    );
  }
}
