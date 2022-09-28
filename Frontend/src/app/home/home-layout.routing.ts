import { SshKeyComponent } from './ssh-key/ssh-key.component';
import { UserDataComponent } from './user-data/user-data.component';
import { Routes } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImagedirlistingComponent } from './imagedirlisting/imagedirlisting.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { FileDataComponent } from './file-data/file-data.component';


export const HomeLayoutRoutes: Routes = [

    { path: '', redirectTo: 'dashboard' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'experiments', component: ImagedirlistingComponent },
    { path: 'user-data', component : UserDataComponent},
    { path: 'ssh-key', component : SshKeyComponent},
    { path: 'file-data', component : FileDataComponent},

    {
        path: 'user-management', component: UsermanagementComponent,
        canActivate: [AdminService],
    },

];
