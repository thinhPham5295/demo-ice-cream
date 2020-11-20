import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'customer',
        loadChildren: './customer/customer.module#IcecreamCustomerModule'
      },
      {
        path: 'faq',
        loadChildren: './faq/faq.module#IcecreamFAQModule'
      },
      {
        path: 'feedback',
        loadChildren: './feedback/feedback.module#IcecreamFeedbackModule'
      },
      {
        path: 'online-order',
        loadChildren: './online-order/online-order.module#IcecreamOnlineOrderModule'
      },
      {
        path: 'prize-history',
        loadChildren: './prize-history/prize-history.module#IcecreamPrizeHistoryModule'
      },
      {
        path: 'recipe',
        loadChildren: './recipe/recipe.module#IcecreamRecipeModule'
      },
      {
        path: 'reference',
        loadChildren: './reference/reference.module#IcecreamReferenceModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IcecreamEntityModule {}
