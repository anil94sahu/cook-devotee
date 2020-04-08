import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-scroll-to',
  templateUrl: './scroll-to.component.html',
  styleUrls: ['./scroll-to.component.css']
})
export class ScrollToComponent implements OnInit {

  @Input()
  linkText: string;
  @Input()
  scrollToClass: string;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onScroll: EventEmitter<string>;

  constructor() {
    this.onScroll = new EventEmitter();
  }

  ngOnInit() {
  }

  scrollTo(): void {
    const elementList = document.getElementById(this.scrollToClass);
    const element = elementList as HTMLElement;
    if (element) {
      element.scrollIntoView({  behavior: 'smooth' });
      this.onScroll.emit('scrolled to: ' + this.scrollToClass);
    }
  }

}
