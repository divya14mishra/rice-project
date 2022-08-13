import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateProfileComponent } from '../dialogs/update-profile/update-profile.component';
import { ConfirmdialogComponent } from '../dialogs/confirmdialog/confirmdialog.component';
import { AlluserService } from '../../services/alluser.service';
import { showNotification } from '../../commonFunctions'

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    update_data: any;
    request_data: any;
    user_d = JSON.parse(localStorage.getItem('user_info'));


    constructor(private alluserService: AlluserService, location: Location, public matDialog: MatDialog, private element: ElementRef, private router: Router) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };
    onLogoutBtnPressed(): void {
        // localStorage.setItem("auth", "");
        // localStorage.setItem("usertype", "");
        localStorage.clear();
        this.router.navigate(['login']);
    }
    getTitle() {
        var titleeInUrl = this.location.prepareExternalUrl(this.location.path());
        var titleExploded = titleeInUrl.split("/");
        var explicitTitle = titleExploded[titleExploded.length - 1];
        // console.log("title : "+explicitTitle);

        //   if(titlee.charAt(0) === 'home'){
        //       titlee = titlee.slice( 1 );
        //   }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === explicitTitle) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
    profile_update() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.id = "modal-component";
        dialogConfig.height = "530px";
        dialogConfig.width = "600px";
        const modalDialog = this.matDialog.open(UpdateProfileComponent, dialogConfig);
        modalDialog.afterClosed().subscribe(result => {
            if (result) {
                this.alluserService.updateUserProfile(result).subscribe((data: any[]) => {
                    this.update_data = data;
                    if (this.update_data.status == 1) {
                        showNotification(this.update_data.msg, 2)
                    }
                    else if (this.update_data.status == 2) {
                        showNotification(this.update_data.msg, 4)
                    }
                    else {
                        showNotification(this.update_data.msg, 4)
                    }
                })
            }
        });

    }
    admin_request() {
        const dialogRef = this.matDialog.open(ConfirmdialogComponent, {
            maxWidth: "400px",
            data: {
                title: "Are you sure?",
                message:
                    "You are about to send the request to admin, to get admin's access."
            },
        });

        dialogRef.afterClosed().subscribe((dialogResult) => {
            if (dialogResult) {
                document.getElementById("admin_request").innerHTML = "Request sent";
                $('#admin_request').addClass('disabled');
                this.alluserService.adminRequest({ id: this.user_d._id }).subscribe((data: any[]) => {
                    this.request_data = data;
                    if (this.request_data.status == 1) {
                        showNotification(this.request_data.msg, 2)
                    }
                    else if (this.request_data.status == 2) {
                        showNotification(this.request_data.msg, 4)
                    }
                    else {
                        showNotification(this.request_data.msg, 4)
                    }
                })
            }
        });
    }
}
