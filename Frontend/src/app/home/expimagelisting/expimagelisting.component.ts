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

  ngOnInit(): void {

    this.imageService.getImagesObs().subscribe(imgList => {
      this.imageList = imgList;
      if(this.imageList.length<1)
      {
        this.imageList = [
          "https://picsum.photos/200/301",
          "https://picsum.photos/200/302",
          "https://picsum.photos/200/303",
          "https://picsum.photos/200/304",
          "https://picsum.photos/200/305",
          "https://picsum.photos/200/306",
          "https://picsum.photos/200/307",
          "https://picsum.photos/200/308",
          "https://picsum.photos/200/309",
          "https://picsum.photos/200/310",
          "https://picsum.photos/200/311",
        ];
      }
    },
      error => {
        this.imageList = [
          "https://picsum.photos/200/301",
          "https://picsum.photos/200/302",
          "https://picsum.photos/200/303",
          "https://picsum.photos/200/304",
          "https://picsum.photos/200/305",
          "https://picsum.photos/200/306",
          "https://picsum.photos/200/307",
          "https://picsum.photos/200/308",
          "https://picsum.photos/200/309",
          "https://picsum.photos/200/310",
          "https://picsum.photos/200/311",
        ];
      },
    );
  }

  onImageClicked(item): void {
    this.imageURL = item;
    this.viewerOpen = true;
  }


}
