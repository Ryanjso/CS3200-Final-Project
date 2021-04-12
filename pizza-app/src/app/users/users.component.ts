import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  userSubmitAttempted = false;
  addingUser = false;
  editingUser = false;

  userBeingEdited: any = {
    orders: [],
  };

  users: any = [
    {
      _id: "1ihu3jk1u4yo2u3jkl123",
      firstName: "Will",
      lastName: "Kofski",
      email: "will.kofski@gmail.com",
      username: "kofski05",
      password: "kofski99",
      orders: [
        {
          _id: "21389y4uihjkl24h44121",
          items: [
            {
              protein: "pepperoni",
              veggie: "spinach",
              sauce: true,
              cheese: true,
              size: "large",
            },
            {
              size: "large",
              type: "coke",
              ice: true,
            },
          ],
        },
      ],
      dateOfBirth: new Date("4/27/1999"),
    },
    {
      _id: "189218o4ujk1l2n4j142424214214",
      firstName: "Ryan",
      lastName: "Soderberg",
      email: "ryanjsoderberg@gmail.com",
      username: "rjsodey",
      password: "soderberg4ever",
      orders: [
        {
          _id: "hyt874h3iu4b2j4l3jn142",
          items: [
            {
              veggie: "peppers",
              sauce: true,
              cheese: true,
              size: "medium",
            },
            {
              size: "small",
              type: "orange fanta",
              ice: true,
            },
          ],
        },
      ],
      dateOfBirth: new Date("4/23/1999"),
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      dateOfBirth: ["", [Validators.required]],
    });
  }

  get firstName(): FormControl {
    return this.userForm.get("firstName") as FormControl;
  }

  get lastName(): FormControl {
    return this.userForm.get("lastName") as FormControl;
  }

  get username(): FormControl {
    return this.userForm.get("username") as FormControl;
  }

  get password(): FormControl {
    return this.userForm.get("password") as FormControl;
  }

  get email(): FormControl {
    return this.userForm.get("email") as FormControl;
  }

  get dateOfBirth(): FormControl {
    return this.userForm.get("dateOfBirth") as FormControl;
  }

  editUser(userObj) {
    this.editingUser = true;
    this.userBeingEdited = userObj;
    this.userForm.setValue({
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      email: userObj.email,
      username: userObj.username,
      password: userObj.password,
      dateOfBirth: userObj.dateOfBirth,
    });
  }

  async submitUserForm() {
    this.userSubmitAttempted = true;
    if (!this.userForm.valid) {
      return;
    }

    this.userSubmitAttempted = false;

    let newUser: any = {
      firstName: this.userForm.controls["firstName"].value,
      lastName: this.userForm.controls["lastName"].value,
      email: this.userForm.controls["email"].value,
      username: this.userForm.controls["username"].value,
      password: this.userForm.controls["password"].value,
      dateOfBirth: this.userForm.controls["dateOfBirth"].value,
      orders: this.userBeingEdited.orders,
    };

    console.log("new: ", this.addingUser);

    try {
      // here is where we send new user info to backend and save to array
      if (this.addingUser) {
        newUser.orders = [];
        this.users.push(newUser);
        this.addingUser = false;
        this.resetUserFormVals();
      } else {
        let newArr = [];
        for (let u of this.users) {
          if (u._id === this.userBeingEdited._id) {
            newUser.orders = u.orders;
            newUser._id = u._id;
            newArr.push(newUser);
          } else {
            newArr.push(u);
          }
        }
        this.users = newArr;
        this.userBeingEdited = { orders: [] };
        this.resetUserFormVals();
      }
      console.log(this.users);
    } catch (e) {
      console.log(e.error.response);
    }
  }

  deleteUser() {
    this.resetUserFormVals();
    this.editingUser = false;
    let newUserArr = [];
    for (const u of this.users) {
      if (u._id !== this.userBeingEdited._id) {
        newUserArr.push(u);
      }
    }
    this.users = newUserArr;
    // send this.userBeingEdited _id to backend to be deleted and then reset
    this.userBeingEdited = { orders: [] };
  }

  resetUserFormVals() {
    this.userForm.patchValue({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      dateOfBirth: "",
    });
    this.addingUser = false;
    this.editingUser = false;
  }
}
