import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrdersService } from "./orders.service";
import { UsersService } from "../users/users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent implements OnInit {
  orderForm: FormGroup;
  orderSubmitAttempted = false;
  addingOrder = false;
  editingOrder = false;

  orderBeingEdited: any = {
    items: [],
  };
  orders: any = [];

  users: any = [];

  constructor(
    private fb: FormBuilder,
    public ordersService: OrdersService,
    public usersService: UsersService,
    public router: Router,
    public location: Location
  ) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      name: ["", [Validators.required]],
      user: ["", [Validators.required]],
    });
    this.ordersService.getAllOrders().subscribe((res) => {
      this.orders = res;
    });
    this.usersService.getAllUsers().subscribe((res) => {
      console.log(res);
      this.users = res;
    });
    if (this.router.url.split("/").length > 2) {
      this.editOrder({ _id: this.router.url.split("/")[2] });
      this.location.go("/orders");
    }
  }

  get name(): FormControl {
    return this.orderForm.get("name") as FormControl;
  }

  get user(): FormControl {
    return this.orderForm.get("user") as FormControl;
  }

  editOrder(orderObj) {
    this.editingOrder = true;
    this.ordersService.getOrderInfo(orderObj._id).subscribe((res) => {
      this.orderBeingEdited = res;
      this.orderBeingEdited.items = res.items || [];
      this.orderForm.setValue({
        name: res.name,
        user: res.userId._id,
      });
    });
  }

  async submitOrderForm() {
    this.orderSubmitAttempted = true;
    if (!this.orderForm.valid) {
      return;
    }

    this.orderSubmitAttempted = false;

    let newOrder: any = {
      name: this.orderForm.controls["name"].value,
      userId: this.orderForm.controls["user"].value,
    };

    try {
      // here is where we send new user info to backend and save to array
      if (this.addingOrder) {
        this.ordersService.createOrder(newOrder).subscribe((res) => {
          console.log("res: ", res);
          this.orders.push(res);
          this.addingOrder = false;
          this.router.navigate(["/items/newOrder/" + res._id]);
        });
      } else {
        let newArr = [];
        for (let o of this.orders) {
          if (o._id === this.orderBeingEdited._id) {
            this.ordersService.updateOrder(o._id, newOrder).subscribe((res) => {
              newArr.push(res);
            });
          } else {
            newArr.push(o);
          }
        }
        this.orders = newArr;
        this.orderBeingEdited = { orders: [] };
        this.resetOrderFormVals();
      }
    } catch (e) {
      console.log(e.error.response);
    }
  }

  deleteOrder() {
    this.resetOrderFormVals();
    this.editingOrder = false;
    let newOrderArr = [];
    for (const o of this.orders) {
      if (o._id !== this.orderBeingEdited._id) {
        newOrderArr.push(o);
      }
    }
    this.orders = newOrderArr;
    this.ordersService
      .deleteOrder(this.orderBeingEdited._id)
      .subscribe((res) => {
        this.orderBeingEdited = { orders: [] };
      });
  }

  resetOrderFormVals() {
    this.orderForm.patchValue({
      name: "",
      user: "",
      username: "",
      password: "",
      email: "",
      dateOfBirth: "",
    });
    this.addingOrder = false;
    this.editingOrder = false;
  }
}
