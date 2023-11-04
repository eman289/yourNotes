import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  isLoading: boolean = false;

  signUpForm: FormGroup = this._FormBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    age: ['', [Validators.required]],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        ),
      ],
    ],
  });

  handleForm(): void {
    this.isLoading = true;
    const formData = this.signUpForm.value;
    this._AuthService.signUp(formData).subscribe({
      next: (response) => {
        if (response.msg == 'done') {
          this.isLoading = false;
          Swal.fire('Done!', '', 'success');
          this._Router.navigate(['/signin']);
        } else {
          this.isLoading = false;
          Swal.fire('', response.msg, 'error');
        }
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire('', err.error.msg, 'error');
      },
    });
  }
}
