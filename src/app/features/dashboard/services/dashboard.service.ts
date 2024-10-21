import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardRes } from '../../../shared/models/dashboard-data';
import { environment as env } from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);

  /**
   * a function that retrieves /dashboard data from server, auth is required
   * @returns observable of type DashboardRes
   */
  getDashboardData(): Observable<DashboardRes> {
    return this.http.get<DashboardRes>(`${env.serverUrl}/dashboard/data`, {
      withCredentials: true //set this to send or receive cookies from/to server
    });
  }
}
