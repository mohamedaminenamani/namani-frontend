import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Customer } from "../model/customer.model";
import { environment } from "../../environments/environment";
import { AuthService } from '../services/auth.service'; // Add this import

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(
    private http: HttpClient,
    private authService: AuthService // Inject AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.accessToken}`
    });
  }

  public getCustomers(keyword: string): Observable<Customer[]> {
    const headers = this.getHeaders();
    if (!keyword || keyword.trim() === '') {
      return this.http.get<Customer[]>(environment.backendHost + "/customers", { headers });
    } else {
      // Fixed template literal syntax
      return this.http.get<Customer[]>(`${environment.backendHost}/search?keyword=${keyword}`, { headers });
    }
  }

  public searchCustomers(keyword: string): Observable<Array<Customer>> {
    const headers = this.getHeaders();
    if (keyword.trim() === "") {
      return this.http.get<Array<Customer>>(environment.backendHost + "/customers", { headers });
    }
    return this.http.get<Array<Customer>>(
      `${environment.backendHost}/customers/search?keyword=${keyword}`,
      { headers }
    );
  }

  public saveCustomer(customer: Customer): Observable<Customer> {
    const headers = this.getHeaders();
    return this.http.post<Customer>(
      environment.backendHost + "/customers",
      customer,
      { headers }
    );
  }

  public deleteCustomer(id: number) {
    const headers = this.getHeaders();
    return this.http.delete(
      environment.backendHost + "/customers/" + id,
      { headers }
    );
  }
}