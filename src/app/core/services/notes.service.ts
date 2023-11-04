import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL: string = `https://note-sigma-black.vercel.app/api/v1`;

  addNote(noteData: object): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/notes`, noteData);
  }

  getAllNotes(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/notes/allNotes`);
  }

  getNote(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/notes`);
  }

  updateNote(newNoteData: object, noteId: string): Observable<any> {
    return this._HttpClient.put(`${this.baseURL}/notes/${noteId}`, newNoteData);
  }

  deleteNote(noteId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseURL}/notes/${noteId}`);
  }
}
