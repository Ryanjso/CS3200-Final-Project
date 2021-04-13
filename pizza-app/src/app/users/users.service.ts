import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  serverUrl = environment.apiUrl + "/";
  constructor(private http: HttpClient, private router: Router) {}
  getAllUsers() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options = { headers };
    return this.http.get<any>(this.serverUrl + "user", options);
  }

  createUser(user) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options = { headers };
    return this.http.post<any>(this.serverUrl + "user/create", user, options);
  }

  getUserInfo(userId) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options = { headers };
    return this.http.get<any>(this.serverUrl + "user/" + userId, options);
  }

  updateUser(userId, userInfo) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options = { headers };
    return this.http.patch<any>(
      this.serverUrl + "user/update/" + userId,
      userInfo,
      options
    );
  }

  deleteUser(userId) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options = { headers };
    return this.http.delete<any>(
      this.serverUrl + "user/delete/" + userId,
      options
    );
  }
}
