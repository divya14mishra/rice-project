import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeLayoutRoutes } from './home-layout.routing';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon, MatIconModule } from '@angular/material/icon';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { HttpClientModule} from '@angular/common/http';
import { ExpimagelistingComponent } from './expimagelisting/expimagelisting.component';
import { ImageviewerComponent } from '../imageviewer/imageviewer.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { ImagedirlistingComponent } from './imagedirlisting/imagedirlisting.component';
import { RecommendationdialogComponent } from '../components/dialogs/recommendationdialog/recommendationdialog.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    HttpClientModule,
    MatGridListModule,
    MatIconModule
  ],
  declarations: [
    // DashboardComponent,
    // UserProfileComponent,
    // TableListComponent,
    // TypographyComponent,
    // IconsComponent,
    // MapsComponent,
    // NotificationsComponent,
    // UpgradeComponent,
  
    DashboardComponent,
    UserprofileComponent,
    ExpimagelistingComponent,
    ImageviewerComponent,
    UsermanagementComponent,
    ImagedirlistingComponent,
    RecommendationdialogComponent
  ]
})

export class HomeLayoutModule {}
