import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
  orders: any = [
    {
      _id: "21389y4uihjkl24h44121",
      name: "Will's first order",
    },
    {
      _id: "hyt874h3iu4b2j4l3jn142",
      name: "Ryans's first order",
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      name: ["", [Validators.required]],
      user: ["", [Validators.required]],
    });
  }

  get name(): FormControl {
    return this.orderForm.get("name") as FormControl;
  }

  get user(): FormControl {
    return this.orderForm.get("user") as FormControl;
  }

  editOrder(orderObj) {
    this.editingOrder = true;
    //   this.orderService.editOrder(orderObj._id).subscribe((res) => {
    //       this.orderBeingEdited = res;
    //   })
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
