import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  serverUrl = "http://localhost:3750/api/";
  constructor(private http: HttpClient, private router: Router) {}
  getAllUsers() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options = { headers };
    return this.http.get<any>(this.serverUrl + "users", options);
  }
}
