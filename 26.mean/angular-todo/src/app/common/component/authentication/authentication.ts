import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication';
import { NotificationService } from '../../../services/notification';
import { StorageService } from '../../../services/storage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './authentication.html',
  styleUrl: './authentication.css',
})
export class Authentication {

  tabName: 'login' | 'signup' = 'login';

  loginForm!: FormGroup;
  signupForm!: FormGroup;

  showLoginPw = false;
  showSignupPw = false;

  showPassword = false;
  showConfirmPassword = false;
  strength = 0;
  strengthLabel = 'Enter a password';

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService,
    private authentication: AuthenticationService,
    private storageService: StorageService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.storageService.getLocal('token')) this.router.navigate(['/']);
    this.initLoginForm();
    this.initSignUpForm();
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  initSignUpForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      // terms: [false]
    }, { validators: this.passwordsMatch });
  }

  get password(): AbstractControl { return this.signupForm.get('password')!; }
  get confirmPassword(): AbstractControl { return this.signupForm.get('confirmPassword')!; }

  togglePw(field: 'password' | 'confirmPassword') {
    if (field === 'password') this.showPassword = !this.showPassword;
    else this.showConfirmPassword = !this.showConfirmPassword;
    const input = document.getElementById(field === 'password' ? 's-pw' : 's-pw2') as HTMLInputElement;
    input.type = (input.type === 'password') ? 'text' : 'password';
  }

  // Password strength checker
  checkStrength() {
    const val = this.password.value || '';
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[\W]/.test(val)) score++;
    this.strength = score;

    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    this.strengthLabel = score ? labels[score - 1] : 'Enter a password';
  }

  // Custom validator for confirm password
  passwordsMatch(group: AbstractControl) {
    const pw = group.get('password')?.value;
    const cpw = group.get('confirmPassword')?.value;
    return pw === cpw ? null : { notMatching: true };
  }


  switchTab(tab: 'login' | 'signup') {
    this.tabName = tab;
    if (tab === 'signup') {
      // this.initSignUpForm();
    }
  }

  submitLogin() {
    if (this.loginForm.valid) {
      this.authentication.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.status) {
            this.loginForm.reset();
            this.storageService.setLocal('token', res.data?.token);
            this.storageService.setLocal('user', res.data?.user);
            if (res.data?.token) {
              this.router.navigate(['/']);
            }
            this.notification.showAlert('Success', 'User Login Successfully', 'success');
          }
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key); // ✅ FIXED
        if (control?.invalid) {
          console.log(`Invalid control: ${key}`, control.errors);
        }
      });
    }
  }
  submitSignup() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.authentication.signup(this.signupForm.value).subscribe({
        next: (res) => {
          if (res.status) {
            this.signupForm.reset();
            this.notification.showAlert('Success', 'User Created Successfuly', 'success');
            // ✅ Redirect to list page
            this.switchTab('login');
          }
        },
        error: (err) => {
          console.error('Update failed', err);
        }
      });
    } else {
      Object.keys(this.signupForm.controls).forEach(key => {
        const control = this.signupForm.get(key);
        if (control?.invalid) {
          console.log(`Invalid control: ${key}`, control.errors);
        }
      });
    }
  }
}
