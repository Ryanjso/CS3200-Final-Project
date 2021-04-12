import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
  itemType: any = null;

  itemBeingEdited: any;
  items: any = [
    {
      _id: "jk3rhebfjwjpoqihjkn",
      protein: "pepperoni",
      veggie: "spinach",
      sauce: true,
      cheese: true,
      size: "large",
    },
    {
      _id: "jk3rhebfsadasjwjpoqihjkn",
      size: "large",
      type: "coke",
      ice: true,
    },
    {
      _id: "jk3rhebfasdssadasjwjpoqihjkn",
      veggie: "peppers",
      sauce: true,
      cheese: true,
      size: "medium",
    },
    {
      _id: "jk3gsafadsasdjpoqihjkn",
      size: "small",
      type: "orange fanta",
      ice: true,
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.itemForm = this.fb.group({
      user: ["", [Validators.required]],
      order: ["", [Validators.required]],
      newItemType: ["", [Validators.required]],
    });
    this.pizzaForm = this.fb.group({
      pizzaSize: ["", [Validators.required]],
      protein: ["", [Validators.required]],
      veggie: ["", [Validators.required]],
      sauce: ["", [Validators.required]],
      cheese: ["", [Validators.required]],
    });
    this.drinkForm = this.fb.group({
      drinkSize: ["", [Validators.required]],
      type: ["", [Validators.required]],
      ice: ["", [Validators.required]],
    });
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
    if (itemObj.protein) {
      this.itemType = "pizza";
    } else {
      this.itemType = "drink";
    }
    //   this.orderService.editOrder(orderObj._id).subscribe((res) => {
    //       this.orderBeingEdited = res;
    //   })
  }

  resetOrderFormVals() {
    this.pizzaForm.patchValue({
      protein: "",
      veggie: "",
      sauce: "",
      cheese: "",
      size: "",
    });

    this.drinkForm.patchValue({
      type: "",
      ice: "",
      size: "",
    });
    this.addingItem = false;
    this.editingItem = false;
  }
}
