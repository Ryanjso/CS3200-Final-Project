import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import { OrdersComponent } from "./orders/orders.component";
import { ItemsComponent } from "./items/items.component";

const routes: Routes = [
  {
    path: "users",
    component: UsersComponent,
  },
  {
    path: "orders",
    component: OrdersComponent,
  },

  {
    path: "items",
    component: ItemsComponent,
  },
  { path: "**", redirectTo: "/users" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
