import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSignupSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    this.authService.signUp(this.signupForm.value)
      .subscribe(
        () => {
          console.log('Registro realizado com sucesso!');
          alert('Registro realizado com sucesso!\nFaça login para curir filmes agora.')
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Erro ao fazer o registro:', error);
        }
      );
  }
}
