import { NgModule } from "@angular/core";
import { Login } from "./login";
import { SharedModule } from "../../shared/shared.module";
import { AuthRoutingModule } from "./Auth-routing.module";

@NgModule({
    declarations : [Login] ,
    imports : [SharedModule , AuthRoutingModule] ,
    exports : [Login]
})
export class AuthModule{}
