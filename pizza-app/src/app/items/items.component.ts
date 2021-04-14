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
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

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

  itemBeingEdited: any = { cheese: true };
  items: any = [];
  users: any = [];
  orders: any = [];
  userOrders: any = [];

  constructor(
    private fb: FormBuilder,
    public itemsService: ItemsService,
    public usersService: UsersService,
    public ordersService: OrdersService,
    public router: Router,
    public location: Location
  ) {}

  async ngOnInit() {
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
      this.items = res;
      if (this.router.url.split("/").length > 2) {
        if (!this.router.url.split("/").includes("newOrder")) {
          // grab item id from url and load edit item modal
          for (const i of this.items) {
            if (i._id === this.router.url.split("/")[2]) {
              this.editItem(i);
              this.location.go("/items");
            }
          }
        }
      }
    });
    this.usersService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
    this.ordersService.getAllOrders().subscribe((res) => {
      this.orders = res;
      if (this.router.url.split("/").length > 2) {
        if (this.router.url.split("/").includes("newOrder")) {
          // grab new order id from url and load create Item modal with user and order populated
          for (const orderObj of this.orders) {
            if (orderObj._id === this.router.url.split("/")[3]) {
              for (const userObj of this.users) {
                if (userObj._id === orderObj.userId._id) {
                  this.updateOrders(userObj._id);
                  this.itemForm.setValue({
                    user: userObj._id,
                    order: this.router.url.split("/")[3],
                  });
                }
              }
            }
          }

          this.itemType = "pizza";
          this.addingItem = true;
          this.location.go("/items");
        }
      }
    });
  }

  updateOrders(userId) {
    this.userOrders = [];
    for (const o of this.orders) {
      if (o.userId._id === userId) {
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
        if (o.userId._id === res.orderId.userId._id) {
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
      this.itemBeingEdited = { cheese: true };
    });
  }

  changeItem(eventTarget) {
    this.itemType = eventTarget.value;
  }

  async submitItemForm() {
    this.itemSubmitAttempted = true;
    if (!this.itemForm.valid) {
      alert(
        "Oops! Looks like you entered in some info incorrectly. Please try again :)"
      );
      return;
    }
    if (!this.pizzaForm.valid && !this.drinkForm.valid) {
      alert(
        "Oops! Looks like you entered in some info incorrectly. Please try again :)"
      );
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
          this.items.push(res);
          this.addingItem = false;
        });
      } else {
        let newArr = [];
        for (let i of this.items) {
          if (i._id === this.itemBeingEdited._id) {
            await this.itemsService
              .updateItem(i._id, newItem)
              .subscribe((res) => {
                newArr.push(res);
              });
          } else {
            newArr.push(i);
          }
        }
        this.items = newArr;
        this.itemBeingEdited = { cheese: true };
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

  onOrderChange() {
    if (!this.itemBeingEdited.cheese && this.itemBeingEdited.cheese !== false) {
      this.itemType = "drink";
    } else {
      this.itemType = "pizza";
    }
  }
}
