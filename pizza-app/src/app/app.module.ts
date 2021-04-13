import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UsersComponent } from "./users/users.component";
import { OrdersComponent } from "./orders/orders.component";
import { ItemsComponent } from "./items/items.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TimeAgoPipe } from "time-ago-pipe";

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
