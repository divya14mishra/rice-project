import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-imageviewer',
  templateUrl: './imageviewer.component.html',
  styleUrls: ['./imageviewer.component.css']
})
export class ImageviewerComponent implements OnInit {

  @Input() open: boolean;
  @Input() imageURL: string;

  @Output() close = new EventEmitter();
  @Output() sendForAnalytics = new EventEmitter();
  
  constructor() { }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.close.emit();
}

  ngOnInit(): void {
        
  }



}
