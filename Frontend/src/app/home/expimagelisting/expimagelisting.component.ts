import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';


@Component({
  selector: 'app-expimagelisting',
  templateUrl: './expimagelisting.component.html',
  styleUrls: ['./expimagelisting.component.css']
})
export class ExpimagelistingComponent implements OnInit {
  public imageList: string[];

  imageURL = '';

  viewerOpen = false;

  imageService: ImageService;

  constructor(imageService: ImageService) {
    this.imageService = imageService;
  }

  ngOnInit(): void {}

  onImageClicked(item): void {
    this.imageURL = item;
    this.viewerOpen = true;
  }


}
