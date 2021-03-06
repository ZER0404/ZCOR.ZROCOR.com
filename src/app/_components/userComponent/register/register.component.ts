import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '../../../_services';
import { ErrorStateMatcher } from '@angular/material';







export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}


@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        // tslint:disable-next-line:no-trailing-whitespace
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    // parentErrorStateMatcher = new ParentErrorStateMatcher();
    // // convenience getter for easy access to form fields
    // get f() { return this.registerForm.controls; }
    get email() { return this.registerForm.get('email'); }
    get password() { return this.registerForm.get('password'); }
    get verifyPassword() { return this.registerForm.get('verifyPassword'); }
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    matcher = new MyErrorStateMatcher();

    passwordValidator(fg: FormGroup) {
        const condition = fg.get('password').value !== fg.get('verifyPassword').value;
        return condition ? { passwordDonotMatach: true } : null;
    }
    //    emailValidator(fg:FormGroup){
    //         const email=fg.get('email').value;
    //         const existedEmail= this.userService.findByEmail;

    //         return condition ? {passwordDonotMatach:true}:null;
    //     }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],

            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
            verifyPassword: ['', [Validators.required]]

        }, { validator: this.passwordValidator }
        );


    }


    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;

        console.log(this.registerForm.value)

        this.authenticationService.register(this.email.value, this.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
