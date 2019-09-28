import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

export let routes: Routes = [

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class MainRoutingModule
{
}
