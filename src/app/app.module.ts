import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer/footer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FollowinginnerComponent } from "./followinginner/followinginner.component";
import { LoginComponent } from "./login/login.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatStepperModule } from "@angular/material/stepper";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { NgWizardModule, NgWizardConfig, THEME } from "ng-wizard";
import { CreateprojectinnerComponent } from "./createprojectinner/createprojectinner.component";
import { RightHeaderComponent } from "./right-header/right-header.component";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthInterceptor } from "./shared/authconfig.interceptor";
import { ToastrModule } from "ngx-toastr";
import { VerifyotpComponent } from "./verifyotp/verifyotp.component";
import { GettingStartedComponent } from "./getting-started/getting-started.component";
import { FundingComponent } from "./funding/funding.component";
import { FullfillmentComponent } from "./fullfillment/fullfillment.component";
import { TellingstoryComponent } from "./tellingstory/tellingstory.component";
import { FurtherreadingComponent } from "./furtherreading/furtherreading.component";
import { BuildingrewardsComponent } from "./buildingrewards/buildingrewards.component";
import { PromotioncreaterComponent } from "./promotioncreater/promotioncreater.component";
import { CretorComponent } from "./login/cretor/cretor.component";
import { VerifypaymentComponent } from "./verifypayment/verifypayment.component";
import { VerifymobileotpComponent } from "./verifymobileotp/verifymobileotp.component";
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default,
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    FollowinginnerComponent,
    LoginComponent,
    CreateprojectinnerComponent,
    RightHeaderComponent,
    VerifyotpComponent,
    GettingStartedComponent,
    FundingComponent,
    FullfillmentComponent,
    TellingstoryComponent,
    FurtherreadingComponent,
    BuildingrewardsComponent,
    PromotioncreaterComponent,
    CretorComponent,
    VerifypaymentComponent,
    VerifymobileotpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    MatTabsModule,
    MatGridListModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    // BackButtonDisableModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

  ],
  exports: [RightHeaderComponent, FooterComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
