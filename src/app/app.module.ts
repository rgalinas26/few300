import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { GiftGivingModule } from './features/gift-giving/gift-giving.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './reducers';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { AuthGuardService } from './auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ErrorDisplayComponent
  ],
  // You have to make sure that you import these correctly. Put the AppRoutingModule last. It always goes last. This is because when the
  // app-routing-module might see the AppRoutingModule route before it sees what is below it (child routes)
  // and redirect your use to home due to the default route.
  imports: [
    BrowserModule,
    GiftGivingModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictActionImmutability: !environment.production,
        strictActionSerializability: true,
        strictStateImmutability: true,
        strictStateSerializability: true // <- this one will cause the default RouterStore to fail.
      }
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([])
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
