import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'travel-research', loadChildren: './travel-research/travel-research.module#TravelResearchPageModule' },
  { path: 'info-travel', loadChildren: './info-travel/info-travel.module#InfoTravelPageModule' },
  { path: 'next-travels', loadChildren: './next-travels/next-travels.module#NextTravelsPageModule' },
  { path: 'popover-component', loadChildren: './popover-component/popover-component.module#PopoverComponentPageModule' },
  { path: 'form-page', loadChildren: './form-page/form-page.module#FormPagePageModule' },
  { path: 'next-form', loadChildren: './next-form/next-form.module#NextFormPageModule' },
  { path: 'made-travels', loadChildren: './made-travels/made-travels.module#MadeTravelsPageModule' },
  { path: 'geolocate-users', loadChildren: './geolocate-users/geolocate-users.module#GeolocateUsersPageModule' },
  { path: 'geolocate-users', loadChildren: './geolocate-users/geolocate-users.module#GeolocateUsersPageModule' },
  { path: 'profile-search', loadChildren: './profile-search/profile-search.module#ProfileSearchPageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },
  { path: 'see-notifications', loadChildren: './see-notifications/see-notifications.module#SeeNotificationsPageModule' },
  { path: 'previous-travels', loadChildren: './previous-travels/previous-travels.module#PreviousTravelsPageModule' },
  { path: 'chatroom', loadChildren: './chatroom/chatroom.module#ChatroomPageModule' },
  { path: 'speech', loadChildren: './speech/speech.module#SpeechPageModule' },
  { path: 'welcome-form', loadChildren: './welcome-form/welcome-form.module#WelcomeFormPageModule' },
  { path: 'profile-area', loadChildren: './profile-area/profile-area.module#ProfileAreaPageModule' },
  { path: 'new-user', loadChildren: './new-user/new-user.module#NewUserPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
