import { SshKeyComponent } from './ssh-key/ssh-key.component';
import { UserDataComponent } from './user-data/user-data.component';
import { Routes } from '@angular/router';
import { InvalidrouteComponent } from '../invalidroute/invalidroute.component';
import { RestrictedrouteComponent } from '../restrictedroute/restrictedroute.component';
import { AdminService } from '../services/admin.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpimagelistingComponent } from './expimagelisting/expimagelisting.component';
import { ImagedirlistingComponent } from './imagedirlisting/imagedirlisting.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';

export const HomeLayoutRoutes: Routes = [

    { path: '', redirectTo: 'experiments' },
    { path: 'dashboard', component: DashboardComponent },
    // { path: 'user-profile', component: UserprofileComponent },
    { path: 'experiments', component: ImagedirlistingComponent },
    { path: 'user-data', component : UserDataComponent},
    { path: 'ssh-key', component : SshKeyComponent},
    {
        path: 'user-management', component: UsermanagementComponent,
        canActivate: [AdminService],
    },

];
