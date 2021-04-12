import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ItemsService } from "./items.service";
import { UsersService } from "../users/users.service";
import { OrdersService } from "../orders/orders.service";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.css"],
})
export class ItemsComponent implements OnInit {
  itemForm: FormGroup;
  pizzaForm: FormGroup;
  drinkForm: FormGroup;
  itemSubmitAttempted = false;
  addingItem = false;
  editingItem = false;
  itemType = null;

  itemBeingEdited: any;
  items: any = [];
  users: any = [];
  orders: any = [];
  userOrders: any = [];

  constructor(
    private fb: FormBuilder,
    public itemsService: ItemsService,
    public usersService: UsersService,
    public ordersService: OrdersService
  ) {}

  ngOnInit() {
    this.itemForm = this.fb.group({
      user: ["", [Validators.required]],
      order: ["", [Validators.required]],
    });
    this.pizzaForm = this.fb.group({
      pizzaSize: ["small", [Validators.required]],
      protein: ["none", [Validators.required]],
      veggie: ["none", [Validators.required]],
      sauce: [false, [Validators.required]],
      cheese: [false, [Validators.required]],
    });
    this.drinkForm = this.fb.group({
      drinkSize: ["small", [Validators.required]],
      type: ["", [Validators.required]],
      ice: [false, [Validators.required]],
    });
    this.itemsService.getAllItems().subscribe((res) => {
      console.log(res);
      this.items = res;
    });
    this.usersService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
    this.ordersService.getAllOrders().subscribe((res) => {
      this.orders = res;
    });
  }

  updateOrders(eventTarget) {
    this.userOrders = [];
    for (const o of this.orders) {
      if (o.userId === eventTarget.value) {
        this.userOrders.push(o);
      }
    }
  }

  get newItemType(): FormControl {
    return this.pizzaForm.get("newItemType") as FormControl;
  }

  get user(): FormControl {
    return this.pizzaForm.get("user") as FormControl;
  }

  get order(): FormControl {
    return this.pizzaForm.get("order") as FormControl;
  }

  get pizzaSize(): FormControl {
    return this.pizzaForm.get("pizzaSize") as FormControl;
  }

  get protein(): FormControl {
    return this.pizzaForm.get("protein") as FormControl;
  }

  get veggie(): FormControl {
    return this.pizzaForm.get("veggie") as FormControl;
  }

  get sauce(): FormControl {
    return this.pizzaForm.get("sauce") as FormControl;
  }

  get cheese(): FormControl {
    return this.pizzaForm.get("cheese") as FormControl;
  }

  get drinkSize(): FormControl {
    return this.drinkForm.get("drinkSize") as FormControl;
  }

  get type(): FormControl {
    return this.drinkForm.get("type") as FormControl;
  }

  get ice(): FormControl {
    return this.drinkForm.get("ice") as FormControl;
  }

  editItem(itemObj) {
    this.editingItem = true;
    if (itemObj.cheese || itemObj.cheese === false) {
      this.itemType = "pizza";
    } else {
      this.itemType = "drink";
    }
    this.itemsService.getItemInfo(itemObj._id).subscribe((res) => {
      this.itemBeingEdited = res;
      this.userOrders = [];
      for (const o of this.orders) {
        if (o.userId === res.orderId.userId._id) {
          this.userOrders.push(o);
        }
      }
      this.itemForm.setValue({
        user: res.orderId.userId._id,
        order: res.orderId._id,
      });
      if (this.itemType === "pizza") {
        this.pizzaForm.setValue({
          pizzaSize: res.size,
          protein: res.protein || "none",
          veggie: res.veggie || "none",
          cheese: res.cheese || false,
          sauce: res.sauce || false,
        });
      } else {
        this.drinkForm.setValue({
          drinkSize: res.size,
          ice: res.ice || false,
          type: res.type,
        });
      }
    });
  }

  deleteItem() {
    this.resetFormValues();
    this.editingItem = false;
    let newItemArr = [];
    for (const i of this.items) {
      if (i._id !== this.itemBeingEdited._id) {
        newItemArr.push(i);
      }
    }
    this.items = newItemArr;
    this.itemsService.deleteItem(this.itemBeingEdited._id).subscribe((res) => {
      this.itemBeingEdited = { orders: [] };
    });
  }

  changeItem(eventTarget) {
    console.log(eventTarget.value);
    this.itemType = eventTarget.value;
  }

  async submitItemForm() {
    this.itemSubmitAttempted = true;
    if (!this.itemForm.valid) {
      return;
    }
    if (!this.pizzaForm.valid && !this.drinkForm.valid) {
      return;
    }

    this.itemSubmitAttempted = false;

    let newItem: any = {
      orderId: this.itemForm.controls["order"].value,
    };

    if (this.itemType === "pizza") {
      if (this.pizzaForm.controls["protein"].value !== "none") {
        newItem.protein = this.pizzaForm.controls["protein"].value;
      }
      if (this.pizzaForm.controls["veggie"].value !== "none") {
        newItem.veggie = this.pizzaForm.controls["veggie"].value;
      }
      newItem.cheese = this.pizzaForm.controls["cheese"].value;
      newItem.sauce = this.pizzaForm.controls["sauce"].value;
      newItem.size = this.pizzaForm.controls["pizzaSize"].value;
    } else {
      newItem.ice = this.drinkForm.controls["ice"].value;
      newItem.type = this.drinkForm.controls["type"].value;
      newItem.size = this.drinkForm.controls["drinkSize"].value;
    }

    try {
      // here is where we send new user info to backend and save to array
      if (this.addingItem) {
        this.itemsService.createItem(newItem).subscribe((res) => {
          console.log("res: ", res);
          this.items.push(res);
          this.addingItem = false;
        });
      } else {
        let newArr = [];
        for (let i of this.items) {
          if (i._id === this.itemBeingEdited._id) {
            console.log(i._id);
            await this.itemsService
              .updateItem(i._id, newItem)
              .subscribe((res) => {
                console.log("res12: ", res);
                newArr.push(res);
              });
          } else {
            newArr.push(i);
          }
        }
        this.items = newArr;
        this.itemBeingEdited = { orders: [] };
        this.resetFormValues();
      }
    } catch (e) {
      console.log(e.error.response);
    }
  }

  resetFormValues() {
    this.itemForm.patchValue({
      user: "",
      order: "",
    });
    this.pizzaForm.patchValue({
      protein: "none",
      veggie: "none",
      sauce: false,
      cheese: false,
      size: "small",
    });

    this.drinkForm.patchValue({
      type: "",
      ice: false,
      size: "small",
    });
    this.addingItem = false;
    this.editingItem = false;
    this.itemType = null;
    this.userOrders = [];
  }
}