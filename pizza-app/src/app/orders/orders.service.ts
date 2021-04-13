import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  serverUrl = environment.apiUrl + "/";
  constructor(private http: HttpClient, private router: Router) {}
  getAllOrders() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options = { headers };
    return this.http.get<any>(this.serverUrl + "order", options);
  }

  createOrder(order) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options = { headers };
    return this.http.post<any>(this.serverUrl + "order/create", order, options);
  }

  getOrderInfo(orderId) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options = { headers };
    return this.http.get<any>(this.serverUrl + "order/" + orderId, options);
  }

  updateOrder(orderId, orderInfo) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options = { headers };
    return this.http.patch<any>(
      this.serverUrl + "order/update/" + orderId,
      orderInfo,
      options
    );
  }

  deleteOrder(orderId) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options = { headers };
    return this.http.delete<any>(
      this.serverUrl + "order/delete/" + orderId,
      options
    );
  }
}
