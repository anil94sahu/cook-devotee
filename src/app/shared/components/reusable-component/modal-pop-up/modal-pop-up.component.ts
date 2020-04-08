import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-modal-pop-up',
  templateUrl: './modal-pop-up.component.html',
  styleUrls: ['./modal-pop-up.component.css']
})
export class ModalPopUpComponent implements OnInit {

  modal: NgbModalRef;
  @ViewChild('content', {static: false}) content: ElementRef;
  @Input()role = 'cp';
  state: any = {header: 'Header', body: 'Body', footer: 'Footer'};

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if (this.role === 'cp') {
      this.state.header = 'Change Password';
    } else if (this.role === 'fp') {
      this.state.header = 'Forgot Password';
    }
  }

  openModal() {
    this.modal = this.modalService.open(this.content, { centered: true });
  }

  closeModal() {
    this.modal.close();
  }

  response($event) {
    this.closeModal();
  }
}
