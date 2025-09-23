import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogResponse, ErrorPayload } from 'src/app/types/logger';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private url = `https://h6ry02cevb.execute-api.ap-south-1.amazonaws.com/dev`;
  private http = inject(HttpClient);

  logError(payload: ErrorPayload): Observable<LogResponse> {
    return this.http.post<LogResponse>(`${this.url}/logs`, payload);
  }
}
