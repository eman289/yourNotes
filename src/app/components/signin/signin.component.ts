import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  isLoading: boolean = false;

  signInForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  handleForm(): void {
    this.isLoading = true;
    const formData = this.signInForm.value;
    this._AuthService.signIn(formData).subscribe({
      next: (response) => {
        if (response.msg == 'done') {
          this.isLoading = false;
          localStorage.setItem('_token', response.token);
          this._Router.navigate(['/home']);
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
