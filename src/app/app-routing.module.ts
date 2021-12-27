import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FollowinginnerComponent } from "./followinginner/followinginner.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./shared/auth.guard";
import { VerifyotpComponent } from "./verifyotp/verifyotp.component";
import { GettingStartedComponent } from "./getting-started/getting-started.component";
import { BuildingrewardsComponent } from "./buildingrewards/buildingrewards.component";
import { FullfillmentComponent } from "./fullfillment/fullfillment.component";
import { FundingComponent } from "./funding/funding.component";
import { FurtherreadingComponent } from "./furtherreading/furtherreading.component";
import { TellingstoryComponent } from "./tellingstory/tellingstory.component";
import { PromotioncreaterComponent } from "./promotioncreater/promotioncreater.component";
import { CretorComponent } from "./login/cretor/cretor.component";
import { CreateprojectinnerComponent } from "./createprojectinner/createprojectinner.component";
import { VerifypaymentComponent } from "./verifypayment/verifypayment.component";
import { VerifymobileotpComponent } from "./verifymobileotp/verifymobileotp.component";
import { RolebaseGuard } from "./shared/rolebase.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./home/home.module").then(
        (m) => m.HomeModule
      ),
  },
  {
    path: "discover",
    loadChildren: () =>
      import("./discover/discover.module").then(
        (m) => m.DiscoverModule
      ),
  },
  {
    path: "recommended/:text",
    loadChildren: () =>
      import("./recommended/recommended.module").then(
        (m) => m.RecommendedModule
      ),
  },
  {
    path: "recommended/:cat/:subCat",
    loadChildren: () =>
      import("./recommended/recommended.module").then(
        (m) => m.RecommendedModule
      ),
  },
  {
    path: "projectview/:id",
    loadChildren: () =>
      import("./projectview/projectview.module").then(
        (m) => m.ProjectviewModule
      ),
  },
  {
    path: "account",
    loadChildren: () =>
      import("./account/account.module").then(
        (m) => m.AccountModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "account/:code",
    loadChildren: () =>
      import("./account/account.module").then(
        (m) => m.AccountModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then(
        (m) => m.ProfileModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "activity",
    loadChildren: () =>
      import("./activity/activity.module").then(
        (m) => m.ActivityModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "following",
    loadChildren: () =>
      import("./following/following.module").then(
        (m) => m.FollowingModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "followinginner",
    component: FollowinginnerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "savedproject",
    loadChildren: () =>
      import("./savedprojects/savedprojects.module").then(
        (m) => m.SavedprojectsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "startproject",
    loadChildren: () =>
      import("./startproject/startproject.module").then(
        (m) => m.StartprojectModule
      ),
  },
  {
    path: "ilogin",
    component: LoginComponent,
  },
  {
    path: "createproject",
    loadChildren: () =>
      import("./createproject/createproject.module").then(
        (m) => m.CreateprojectModule
      ),
    canActivate: [AuthGuard, RolebaseGuard],
    data: {
      expectedRole: "creator",
    },
  },
  {
    path: "createaccount",
    loadChildren: () =>
      import("./createaccount/createaccount.module").then(
        (m) => m.CreateaccountModule
      ),
  },
  {
    path: "aboutus",
    loadChildren: () =>
      import("./aboutus/aboutus.module").then(
        (m) => m.AboutusModule
      ),
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
    loadChildren: () =>
      import("./forgotpasswordcode/forgotpasswordcode.module").then(
        (m) => m.ForgotpasswordcodeModule
      ),
  },
  {
    path: "account-recovery",
    loadChildren: () =>
      import("./forgetpassword/forgetpassword.module").then(
        (m) => m.ForgetpasswordModule
      ),
  },
  {
    path: "privacypolicy",
    loadChildren: () =>
      import("./privacypolicy/privacypolicy.module").then(
        (m) => m.PrivacypolicyModule
      ),
  },
  {
    path: "termsofuse",
    loadChildren: () =>
      import("./termsofuse/termsofuse.module").then(
        (m) => m.TermsofuseModule
      ),
  },
  {
    path: "cookiepolicy",
    loadChildren: () =>
      import("./cookiepolicy/cookiepolicy.module").then(
        (m) => m.CookiepolicyModule
      ),
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
    path: "faq",
    loadChildren: () =>
      import("./faq/faq.module").then(
        (m) => m.FaqModule
      ),
  },
  {
    path: "contact_us",
    loadChildren: () =>
      import("./contact-us/contact-us.module").then(
        (m) => m.ContactUsModule
      ),
  },
  {
    path: "career",
    loadChildren: () =>
      import("./careers/careers.module").then(
        (m) => m.CareersModule
      ),
  },
  {
    path: "career_form/:id",
    loadChildren: () =>
      import("./careers/career-form/career-form.module").then(
        (m) => m.CareerFormModule
      ),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/investor/investor.module").then(
        (m) => m.InvestorModule
      ),
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
    loadChildren: () =>
      import("./pledge/pledge.module").then(
        (m) => m.PledgeModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "specialrequest",
    loadChildren: () =>
      import("./specicalrequest/specicalrequest.module").then(
        (m) => m.SpecicalrequestModule
      ),
  },
  {
    path: "help",
    loadChildren: () =>
      import("./helpguide/helpguide.module").then(
        (m) => m.HelpguideModule
      ),
  },
  {
    path: "help/cat/:id",
    loadChildren: () =>
      import("./helpguidecategory/helpguidecategory.module").then(
        (m) => m.HelpguidecategoryModule
      ),
  },
  {
    path: "verifypayment",
    component: VerifypaymentComponent,
  },

  {
    path: "profile_view/:id/:role",
    loadChildren: () =>
      import("./profile-view/profile-view.module").then(
        (m) => m.ProfileViewModule
      ),
  },
  {
    path: "featureproject",
    loadChildren: () =>
      import("./feature-project/feature-project.module").then(
        (m) => m.FeatureProjectModule
      ),
  },
  {
    path: "takingoff",
    loadChildren: () =>
      import("./taking-off/taking-off.module").then(
        (m) => m.TakingOffModule
      ),
  },
  {
    path: "homestretch",
    loadChildren: () =>
      import("./home-stretch/home-stretch.module").then(
        (m) => m.HomeStretchModule
      ),
  },
  {
    path: "ourrules",
    loadChildren: () =>
      import("./rules/rules.module").then(
        (m) => m.RulesModule
      ),
  },
  {
    path: "fees",
    loadChildren: () =>
      import("./fees/fees.module").then(
        (m) => m.FeesModule
      ),
  },
  {
    path: "trustandsafety",
    loadChildren: () =>
      import("./trustsafety/trustsafety.module").then(
        (m) => m.TrustsafetyModule
      ),
  },
  {
    path: "what_we_do",
    loadChildren: () =>
      import("./whatwedo/whatwedo.module").then(
        (m) => m.WhatwedoModule
      ),
  },
  {
    path: "projectinner/:id",
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
export class AppRoutingModule { }
