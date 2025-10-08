import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export type CanComponentDeactivate = {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
};

// export const canDeactivateGuard: CanDeactivateFn<
//   CanComponentDeactivate
// > = (component, currentRoute, currentState, nextState) => {
//   return component.canDeactivate ? component.canDeactivate() : true;
//   };

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(
    component: CanComponentDeactivate
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
