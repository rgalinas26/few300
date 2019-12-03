import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { GiftGivingModule } from './features/gift-giving/gift-giving.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent
  ],
  // You have to make sure that you import these correctly. Put the AppRoutingModule last. It always goes last. This is because when the
  // app-routing-module might see the AppRoutingModule route before it sees what is below it (child routes)
  // and redirect your use to home due to the default route.
  imports: [
    BrowserModule,
    GiftGivingModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
