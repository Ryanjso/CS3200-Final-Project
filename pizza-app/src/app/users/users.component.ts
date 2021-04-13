import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsersService } from "./users.service";
import { ActivatedRoute, Router } from "@angular/router";

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

  users: any = [];

  constructor(
    private fb: FormBuilder,
    public usersService: UsersService,
    public router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      dateOfBirth: ["", [Validators.required]],
    });

    this.usersService.getAllUsers().subscribe((res) => {
      console.log("res: !, ", res);
      this.users = res;
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
    this.usersService.getUserInfo(userObj._id).subscribe((res) => {
      this.userBeingEdited = res;
      this.userBeingEdited.orders = res.orders || [];
      this.userForm.setValue({
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        username: res.username,
        password: res.password,
        dateOfBirth: new Date(res.dateOfBirth).toISOString().substring(0, 10),
      });
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
    };

    try {
      // here is where we send new user info to backend and save to array
      if (this.addingUser) {
        newUser.orders = [];
        this.usersService.createUser(newUser).subscribe((res) => {
          console.log("res: ", res);
          this.users.push(res);
          this.addingUser = false;
          this.resetUserFormVals();
        });
      } else {
        let newArr = [];
        for (let u of this.users) {
          if (u._id === this.userBeingEdited._id) {
            this.usersService.updateUser(u._id, newUser).subscribe((res) => {
              newArr.push(res);
            });
          } else {
            newArr.push(u);
          }
        }
        this.users = newArr;
        this.userBeingEdited = { orders: [] };
        this.resetUserFormVals();
      }
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
    this.usersService.deleteUser(this.userBeingEdited._id).subscribe((res) => {
      this.userBeingEdited = { orders: [] };
    });
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
