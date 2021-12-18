import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CarouselModule } from "ngx-owl-carousel-o";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AgmCoreModule } from "@agm/core";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer/footer.component";
import { DiscoverComponent } from "./discover/discover.component";
import { HomeComponent } from "./home/home.component";
import { RecommendedComponent } from "./recommended/recommended.component";
import { ProjectviewComponent } from "./projectview/projectview.component";
import { AccountComponent } from "./account/account.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfileComponent } from "./profile/profile.component";
import { ActivityComponent } from "./activity/activity.component";
import { FollowingComponent } from "./following/following.component";
import { FollowinginnerComponent } from "./followinginner/followinginner.component";
import { SavedprojectsComponent } from "./savedprojects/savedprojects.component";
import { StartprojectComponent } from "./startproject/startproject.component";
import { LoginComponent } from "./login/login.component";
import { CreateaccountComponent } from "./createaccount/createaccount.component";
import { CreateprojectComponent } from "./createproject/createproject.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatStepperModule } from "@angular/material/stepper";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { RoundProgressModule } from "angular-svg-round-progressbar";
import { NgWizardModule, NgWizardConfig, THEME } from "ng-wizard";
import { CreateprojectinnerComponent } from "./createprojectinner/createprojectinner.component";
import { ProjectinnerModule } from "./projectinner/projectinner.module";
import { RightHeaderComponent } from "./right-header/right-header.component";
import { UserprofileHeaderComponent } from "./userprofile-header/userprofile-header.component";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { BasicComponent } from "./projectinner/basic/basic.component";
import { RewardsComponent } from "./projectinner/rewards/rewards.component";
import { StoryComponent } from "./projectinner/story/story.component";
import { ProjectpreviewComponent } from "./projectinner/projectpreview/projectpreview.component";
import { PeopleComponent } from "./projectinner/people/people.component";
import { PaymentComponent } from "./projectinner/payment/payment.component";
import { PromotionComponent } from "./projectinner/promotion/promotion.component";
import { ProjectoverviewComponent } from "./projectinner/projectoverview/projectoverview.component";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { AuthInterceptor } from "./shared/authconfig.interceptor";
import { ToastrModule } from "ngx-toastr";
import { BackButtonDisableModule } from "angular-disable-browser-back-button";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { VerifyotpComponent } from "./verifyotp/verifyotp.component";
import { ForgetpasswordComponent } from "./forgetpassword/forgetpassword.component";
import { PrivacypolicyComponent } from "./privacypolicy/privacypolicy.component";
import { CookiepolicyComponent } from "./cookiepolicy/cookiepolicy.component";
import { TermsofuseComponent } from "./termsofuse/termsofuse.component";
import { GettingStartedComponent } from "./getting-started/getting-started.component";
import { FundingComponent } from "./funding/funding.component";
import { FullfillmentComponent } from "./fullfillment/fullfillment.component";
import { TellingstoryComponent } from "./tellingstory/tellingstory.component";
import { FurtherreadingComponent } from "./furtherreading/furtherreading.component";
import { BuildingrewardsComponent } from "./buildingrewards/buildingrewards.component";
import { CommunicatingbackersComponent } from "./communicatingbackers/communicatingbackers.component";
import { PromotioncreaterComponent } from "./promotioncreater/promotioncreater.component";
import { FaqComponent } from "./faq/faq.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { CareersComponent } from "./careers/careers.component";
import { CareerFormComponent } from "./careers/career-form/career-form.component";
import { InvestorComponent } from "./login/investor/investor.component";
import { CretorComponent } from "./login/cretor/cretor.component";
import { PledgeComponent } from "./pledge/pledge.component";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { ShareModule } from "ngx-sharebuttons";
import { ShareButtonModule } from "ngx-sharebuttons/button";
import { ShareIconsModule } from "ngx-sharebuttons/icons";
import { SpecicalrequestComponent } from "./specicalrequest/specicalrequest.component";
import { ForgotpasswordcodeComponent } from "./forgotpasswordcode/forgotpasswordcode.component";
import { HelpguideComponent } from "./helpguide/helpguide.component";
import { HelpguidecategoryComponent } from "./helpguidecategory/helpguidecategory.component";
import { VerifypaymentComponent } from "./verifypayment/verifypayment.component";
import { ProfileViewComponent } from "./profile-view/profile-view.component";
import { VerifymobileotpComponent } from "./verifymobileotp/verifymobileotp.component";
import { FeatureProjectComponent } from "./feature-project/feature-project.component";
import { HomeStretchComponent } from "./home-stretch/home-stretch.component";
import { TakingOffComponent } from "./taking-off/taking-off.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { AngularStickyThingsModule } from '@w11k/angular-sticky-things';
import { RulesComponent } from './rules/rules.component';
import { FeesComponent } from './fees/fees.component';
import { TrustsafetyComponent } from './trustsafety/trustsafety.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import { WhatwedoComponent } from './whatwedo/whatwedo.component';

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
    DiscoverComponent,
    HomeComponent,
    RecommendedComponent,
    ProjectviewComponent,
    AccountComponent,
    ProfileComponent,
    ActivityComponent,
    FollowingComponent,
    FollowinginnerComponent,
    SavedprojectsComponent,
    StartprojectComponent,
    LoginComponent,
    CreateprojectComponent,
    CreateprojectinnerComponent,
    RightHeaderComponent,
    UserprofileHeaderComponent,
    CreateaccountComponent,
    BasicComponent,
    RewardsComponent,
    StoryComponent,
    ProjectpreviewComponent,
    PeopleComponent,
    PaymentComponent,
    PromotionComponent,
    ProjectoverviewComponent,
    AboutusComponent,
    VerifyotpComponent,
    ForgetpasswordComponent,
    PrivacypolicyComponent,
    CookiepolicyComponent,
    TermsofuseComponent,
    GettingStartedComponent,
    FundingComponent,
    FullfillmentComponent,
    TellingstoryComponent,
    FurtherreadingComponent,
    BuildingrewardsComponent,
    CommunicatingbackersComponent,
    PromotioncreaterComponent,
    FaqComponent,
    ContactUsComponent,
    CareersComponent,
    CareerFormComponent,
    InvestorComponent,
    CretorComponent,
    PledgeComponent,
    SpecicalrequestComponent,
    ForgotpasswordcodeComponent,
    HelpguideComponent,
    HelpguidecategoryComponent,
    VerifypaymentComponent,
    ProfileViewComponent,
    VerifymobileotpComponent,
    FeatureProjectComponent,
    HomeStretchComponent,
    TakingOffComponent,
    RulesComponent,
    FeesComponent,
    TrustsafetyComponent,
    WhatwedoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ClipboardModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    CdkStepperModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgWizardModule.forRoot(ngWizardConfig),
    ProjectinnerModule,
    RoundProgressModule,
    CarouselModule,
    HttpClientModule,
    NgbModule,
    AngularEditorModule,
    ShareModule,
    ShareButtonModule,
    MatTabsModule,
    MatGridListModule,
    ShareIconsModule,
    Ng2SearchPipeModule,
    AngularStickyThingsModule,
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SweetAlert2Module.forRoot(),
    // BackButtonDisableModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDy4YDcrHfTyCRV_IVjlBj8TvIkNLK3hVo",
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
export class AppModule {}
