import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from "./app.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { ProductsModule } from "@keoshop/products";
import { UiModule } from '@keoshop/ui';
import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { HttpClientModule } from "@angular/common/http";
import { OrdersModule } from "@keoshop/orders";
import { ToastModule } from 'primeng/toast';
import { MessagesComponent } from "./shared/messages/messages.component";
import { MessageService } from 'primeng/api';
import { UsersModule } from "@keoshop/users";

const routes: Routes = [
    { path: "", component: HomePageComponent },
];

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        HeaderComponent,
        FooterComponent,
        NavComponent,
        MessagesComponent,
    ],
    imports: [
        BrowserModule, 
        RouterModule.forRoot(routes), 
        HttpClientModule,
        ProductsModule,
        AccordionModule,
        BrowserAnimationsModule, 
        UiModule,
        OrdersModule,
        ToastModule,
        UsersModule
    ],
    providers: [MessageService],
    bootstrap: [AppComponent]
    // exports: [
    //   MessagesComponent //kaldırılcak
    // ],
})
export class AppModule {}
