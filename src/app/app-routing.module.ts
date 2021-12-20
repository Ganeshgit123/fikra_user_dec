import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { ActivityComponent } from "./activity/activity.component";
import { CreateaccountComponent } from "./createaccount/createaccount.component";
import { CreateprojectComponent } from "./createproject/createproject.component";
import { DiscoverComponent } from "./discover/discover.component";
import { FollowingComponent } from "./following/following.component";
import { FollowinginnerComponent } from "./followinginner/followinginner.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProjectviewComponent } from "./projectview/projectview.component";
import { RecommendedComponent } from "./recommended/recommended.component";
import { SavedprojectsComponent } from "./savedprojects/savedprojects.component";
import { StartprojectComponent } from "./startproject/startproject.component";
import { AuthGuard } from "./shared/auth.guard";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { VerifyotpComponent } from "./verifyotp/verifyotp.component";
import { ForgetpasswordComponent } from "./forgetpassword/forgetpassword.component";
import { CookiepolicyComponent } from "./cookiepolicy/cookiepolicy.component";
import { PrivacypolicyComponent } from "./privacypolicy/privacypolicy.component";
import { TermsofuseComponent } from "./termsofuse/termsofuse.component";
import { GettingStartedComponent } from "./getting-started/getting-started.component";
import { BuildingrewardsComponent } from "./buildingrewards/buildingrewards.component";
import { CommunicatingbackersComponent } from "./communicatingbackers/communicatingbackers.component";
import { FullfillmentComponent } from "./fullfillment/fullfillment.component";
import { FundingComponent } from "./funding/funding.component";
import { FurtherreadingComponent } from "./furtherreading/furtherreading.component";
import { TellingstoryComponent } from "./tellingstory/tellingstory.component";
import { PromotioncreaterComponent } from "./promotioncreater/promotioncreater.component";
import { FaqComponent } from "./faq/faq.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { CareersComponent } from "./careers/careers.component";
import { CareerFormComponent } from "./careers/career-form/career-form.component";
import { InvestorComponent } from "./login/investor/investor.component";
import { CretorComponent } from "./login/cretor/cretor.component";
import { CreateprojectinnerComponent } from "./createprojectinner/createprojectinner.component";
import { PledgeComponent } from "./pledge/pledge.component";
import { SpecicalrequestComponent } from "./specicalrequest/specicalrequest.component";
import { ForgotpasswordcodeComponent } from "./forgotpasswordcode/forgotpasswordcode.component";
import { HelpguideComponent } from "./helpguide/helpguide.component";
import { HelpguidecategoryComponent } from "./helpguidecategory/helpguidecategory.component";
import { VerifypaymentComponent } from "./verifypayment/verifypayment.component";
import { ProfileViewComponent } from "./profile-view/profile-view.component";
import { VerifymobileotpComponent } from "./verifymobileotp/verifymobileotp.component";
import { RolebaseGuard } from "./shared/rolebase.guard";
import { FeatureProjectComponent } from "./feature-project/feature-project.component";
import { TakingOffComponent } from "./taking-off/taking-off.component";
import { HomeStretchComponent } from "./home-stretch/home-stretch.component";
import { RulesComponent } from "./rules/rules.component";
import { FeesComponent } from "./fees/fees.component";
import { TrustsafetyComponent } from "./trustsafety/trustsafety.component";
import { WhatwedoComponent } from './whatwedo/whatwedo.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "discover",
    component: DiscoverComponent,
  },
  {
    path: "recommended/:text",
    component: RecommendedComponent,
  },
  {
    path: "recommended/:cat/:subCat",
    component: RecommendedComponent,
  },
  {
    path: "projectview/:id",
    component: ProjectviewComponent,
  },
  {
    path: "account",
    component: AccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "account/:code",
    component: AccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "activity",
    component: ActivityComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "following",
    component: FollowingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "followinginner",
    component: FollowinginnerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "savedproject",
    component: SavedprojectsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "startproject",
    component: StartprojectComponent,
  },
  {
    path: "ilogin",
    component: LoginComponent,
  },
  {
    path: "createproject",
    component: CreateprojectComponent,
    canActivate: [AuthGuard, RolebaseGuard],
    data: {
      expectedRole: "creator",
    },
  },
  {
    path: "createaccount",
    component: CreateaccountComponent,
  },
  {
    path: "aboutus",
    component: AboutusComponent,
  },
  {
    path: "user/verify/:id/:role",
    component: VerifyotpComponent,
  },
  {
    path: "user/mobileVerify/:id/:role",
    component: VerifymobileotpComponent,
  },
  {
    path: "user/resetPass/:email/:code",
    component: ForgotpasswordcodeComponent,
  },
  {
    path: "account-recovery",
    component: ForgetpasswordComponent,
  },
  {
    path: "privacypolicy",
    component: PrivacypolicyComponent,
  },
  {
    path: "termsofuse",
    component: TermsofuseComponent,
  },
  {
    path: "cookiepolicy",
    component: CookiepolicyComponent,
  },
  {
    path: "creatorhandbook/:id",
    component: GettingStartedComponent,
  },
  {
    path: "funding",
    component: FundingComponent,
  },
  {
    path: "fullfillment",
    component: FullfillmentComponent,
  },
  {
    path: "paymentcard",
    component: TellingstoryComponent,
  },
  {
    path: "search",
    component: PromotioncreaterComponent,
  },
  {
    path: "furtherreading",
    component: FurtherreadingComponent,
  },
  {
    path: "newletter/verify/:id",
    component: BuildingrewardsComponent,
  },
  {
    path: "communciating-backers",
    component: CommunicatingbackersComponent,
  },
  {
    path: "faq",
    component: FaqComponent,
  },
  {
    path: "contact_us",
    component: ContactUsComponent,
  },
  {
    path: "career",
    component: CareersComponent,
  },
  {
    path: "career_form/:id",
    component: CareerFormComponent,
  },
  {
    path: "login",
    component: InvestorComponent,
  },
  {
    path: "creator_login",
    component: CretorComponent,
  },
  {
    path: "message",
    component: CreateprojectinnerComponent,
  },
  {
    path: "mypledge",
    component: PledgeComponent,
  },
  {
    path: "specialrequest",
    component: SpecicalrequestComponent,
  },
  {
    path: "help",
    
    component: HelpguideComponent,
  },
  {
    path: "help/cat/:id",
    component: HelpguidecategoryComponent,
  },
  {
    path: "verifypayment",
    component: VerifypaymentComponent,
  },

  {
    path: "profile_view/:id/:role",
    component: ProfileViewComponent,
  },
  {
    path: "featureproject",
    component: FeatureProjectComponent,
  },
  {
    path: "takingoff",
    component: TakingOffComponent,
  },
  {
    path: "homestretch",
    component: HomeStretchComponent,
  },
   {
    path: "ourrules",
    component: RulesComponent,
  },
  {
    path: "fees",
    component: FeesComponent,
  },
  {
    path: "trustandsafety",
    component: TrustsafetyComponent,
  },
  {
    path: "what_we_do",
    component: WhatwedoComponent,
  },
  {
    path: "projectinner",
    canActivate: [AuthGuard, RolebaseGuard],
    data: {
      expectedRole: "creator",
    },
    loadChildren: () =>
      import("./projectinner/projectinner.module").then(
        (m) => m.ProjectinnerModule
      ),
      
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: "enabled",
      scrollPositionRestoration: "top",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
