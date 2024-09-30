import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardData, DashboardRes } from '../../../shared/models/dashboard-data';
import { environment as env } from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);

  getDashboardData(userId: number): Observable<DashboardRes> {
    return this.http.get<DashboardRes>(`${env.serverUrl}/dashboard/dashboard-data/${userId}`);
  }
}
