import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { SharedService } from 'src/services/shared/shared.service';
import { BlogRecipe, SharedState } from 'src/store/shared/_interfaces';
import {
  filter,
  map,
  Observable,
  range,
  repeat,
  switchMap,
  toArray,
} from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  blogs$: Observable<BlogRecipe[] | null>;
  blogLoading$: Observable<boolean>;
  blogError$: Observable<string | null>;

  constructor(
    private sharedService: SharedService,
    private store: Store<SharedState>
  ) {
    this.blogs$ = this.sharedService.blog$.pipe(
      filter((blog): blog is BlogRecipe => !!blog),
      switchMap(
        (blog) =>
          range(1, 20).pipe(
            map(() => blog as BlogRecipe),
            toArray()
          ) // Repeat blog 20 times
      )
    );
    this.blogLoading$ = this.sharedService.blogLoading$;
    this.blogError$ = this.sharedService.blogError$;
  }

  trackByIndex(index: number) {
    return index;
  }
}
