import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SharedService } from 'src/services/shared/shared.service';
import { ToastService } from 'src/services/toast/toast.service';
import { BlogRecipe, SharedState } from 'src/store/shared/_interfaces';
import { BlogActions, EmailSignupActions } from 'src/store/shared/actions';

type EmailForm = {
  email: FormControl<string | null>;
};

@Component({
  selector: 'app-whats-cooking',
  templateUrl: './whats-cooking.component.html',
  styleUrls: ['./whats-cooking.component.scss'],
})
export class WhatsCookingComponent {
  icons = [
    {
      name: 'instagram',
      to: 'https://www.instagram.com/blueapron/',
      icon: faInstagram,
      classes: 'text-pink-500 hover:text-pink-700',
    },
    {
      name: 'facebook',
      to: 'https://www.facebook.com/BlueApron/',
      icon: faFacebook,
      classes: 'text-blue-600 hover:text-blue-800',
    },
    {
      name: 'pinterest',
      to: 'https://in.pinterest.com/blueapron/',
      icon: faPinterest,
      classes: 'text-red-600 hover:text-red-800',
    },
    {
      name: 'youtube',
      to: 'https://www.youtube.com/@Blueapron',
      icon: faYoutube,
      classes: 'text-red-500 hover:text-red-700',
    },
  ];

  emailForm: FormGroup<EmailForm>;
  blog$: Observable<BlogRecipe | null>;
  blogLoading$: Observable<boolean>;
  blogError$: Observable<string | null>;
  isEmailAdded$: Observable<boolean | null>;

  constructor(
    private sharedService: SharedService,
    private store: Store<SharedState>
  ) {
    this.emailForm = new FormGroup<EmailForm>({
      email: new FormControl('', [Validators.email, Validators.required]),
    });

    this.blog$ = this.sharedService.blog$;
    this.blogLoading$ = this.sharedService.blogLoading$;
    this.blogError$ = this.sharedService.blogError$;
    this.isEmailAdded$ = this.sharedService.isEmailAdded$;

    this.blog$.subscribe(
      (data) => !data && this.store.dispatch(BlogActions.load({ number: 1 }))
    );

    this.isEmailAdded$.subscribe((isAdded) => {
      if (isAdded) {
      this.emailForm.reset();
        this.emailForm.controls.email.setErrors(null);
      }
    });
  }

  onSignUp() {
    const { email } = this.emailForm.value;
    email && this.store.dispatch(EmailSignupActions.signup({ email }));
  }
}
