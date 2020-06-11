import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  errorMessages: Array<string>;

  constructor() {
    this.errorMessages = [];
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    switch(error.status) {
      case 400:
        errorMessage = 'Something went wrong requesting pizza.';
        break;
      case 404:
        errorMessage = 'Pizza server was not found.';
        break;
      case 500:
        errorMessage = 'Something went wrong in the pizza server.';
        break;
      case 0:
      default:
        errorMessage = 'Pizza service is currently unavailable.';
        break;
    }

    return throwError(errorMessage);
   }
}
