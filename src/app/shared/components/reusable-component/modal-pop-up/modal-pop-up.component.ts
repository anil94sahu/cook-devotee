import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-modal-pop-up',
  templateUrl: './modal-pop-up.component.html',
  styleUrls: ['./modal-pop-up.component.css']
})
export class ModalPopUpComponent implements OnInit {

  modal: NgbModalRef;
  @ViewChild('content', {static: false}) content: ElementRef;
  state: any = {header:'Header', body: 'Body', footer: 'Footer'};
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openModal() {
    this.modal = this.modalService.open(this.content, { centered: true });
  }

  closeModal() {
    this.modal.close();
  }

}
