import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Note } from 'src/app/core/interfaces/note';
import { NotesService } from 'src/app/core/services/notes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _NotesService: NotesService,
    private _FormBuilder: FormBuilder
  ) {}

  isEmpty: boolean = true;
  notes: Note[] = [];
  noteId: string = '';
  inputTerm: string = '';

  setCardBackgroundColor(note: any, color: string) {
    note.color = color;
    localStorage.setItem(`noteColor_${note._id}`, color);
  }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this._NotesService.getNote().subscribe({
      next: (response) => {
        if (response.notes) {
          this.isEmpty = false;
          this.notes = response.notes.map((note: any) => ({
            ...note,
            color: localStorage.getItem(`noteColor_${note._id}`) || '',
          }));
        } else {
          this.isEmpty = true;
        }
      },
      error: (err) => {
        if (err.error.msg == 'not notes found') {
          this.isEmpty = true;
          this.notes = [];
        }
      },
    });
  }

  noteForm: FormGroup = this._FormBuilder.group({
    title: [''],
    content: [''],
  });

  addNote(): void {
    const note = this.noteForm.value;

    this._NotesService.addNote(note).subscribe({
      next: (response) => {
        this.noteForm.reset();
        this.getNotes();
        this.isEmpty = false;
      },
      error: (err) => {
        Swal.fire('', err.error.msg, 'error');
      },
    });
  }

  updateForm: FormGroup = this._FormBuilder.group({
    title: [''],
    content: [''],
  });

  getNoteId(id: string): void {
    this.noteId = id;
    const noteToEdit = this.notes.find((note) => note._id === id);
    if (noteToEdit) {
      this.updateForm.patchValue({
        title: noteToEdit.title,
        content: noteToEdit.content,
      });
    }
  }

  updateNote(): void {
    const updatedNote = this.updateForm.value;
    this._NotesService.updateNote(updatedNote, this.noteId).subscribe({
      next: () => {
        this.getNotes();
        this.isEmpty = false;
      },
      error: (err) => {
        Swal.fire('', err.error.msg, 'error');
      },
    });
  }

  deleteNote(id: string): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-main',
        cancelButton: 'btn btn-secondary',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this._NotesService.deleteNote(id).subscribe({
            next: (response) => {
              this.getNotes();
              localStorage.removeItem(`noteColor_${id}`);
              if (this.notes.length == 0) {
                this.isEmpty = true;
              }
            },
            error: (err) => {
              Swal.fire('', err.error.msg, 'error');
            },
          });
          swalWithBootstrapButtons.fire(
            '',
            'Your note has been deleted.',
            'success'
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('', 'Your note is safe :)', 'error');
        }
      });
  }
}
