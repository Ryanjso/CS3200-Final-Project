import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ItemsService {
  serverUrl = environment.apiUrl + "/";
  constructor(private http: HttpClient, private router: Router) {}
  getAllItems() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options = { headers };
    return this.http.get<any>(this.serverUrl + "item", options);
  }

  createItem(item) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options = { headers };
    return this.http.post<any>(this.serverUrl + "item/create", item, options);
  }

  getItemInfo(itemId) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options = { headers };
    return this.http.get<any>(this.serverUrl + "item/" + itemId, options);
  }

  updateItem(itemId, itemInfo) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options = { headers };
    console.log("tes: ", this.serverUrl + "item/update/" + itemId);
    return this.http.patch<any>(
      this.serverUrl + "item/update/" + itemId,
      itemInfo,
      options
    );
  }

  deleteItem(itemId) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options = { headers };
    return this.http.delete<any>(
      this.serverUrl + "item/delete/" + itemId,
      options
    );
  }
}
