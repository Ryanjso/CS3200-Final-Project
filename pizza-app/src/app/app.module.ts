import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UsersComponent } from "./users/users.component";
import { OrdersComponent } from "./orders/orders.component";
import { ItemsComponent } from "./items/items.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
<<<<<<< HEAD
import { TimeAgoPipe } from "time-ago-pipe";
=======
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
>>>>>>> 7b34df46ee2642228d3bca176a89c370719cd03c

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    OrdersComponent,
    ItemsComponent,
    TimeAgoPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
