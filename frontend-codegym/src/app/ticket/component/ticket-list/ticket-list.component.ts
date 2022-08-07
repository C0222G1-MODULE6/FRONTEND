import {Component, OnInit} from '@angular/core';
import {Ticket} from '../../model/ticket';
import {TicketService} from '../../service/ticket.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  page = 1;
  totalItems: any;
  itemsPerPage = 5;
  tickets: Ticket[];
  ticket: Ticket;
  startPointSearch = '';
  endPointSearch = '';
  startDateSearch = '';
  endDateSearch = '';
  startPointConfirm = '';
  endPointConfirm = '';
  hourConfirm = '';
  startDateConfirm = '';
  bookState = true;
  soldOutState = false;

  constructor(private ticketService: TicketService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.ticketService.getAll(0).subscribe((tickets: any) => {
      this.tickets = tickets.content;
      this.totalItems = tickets.totalElements;
    });
  }

  getPage(page) {
    this.page = page;
    page = page - 1;
    this.ticketService.getAll(page).subscribe((tickets: any) => {
      this.tickets = tickets.content;
      this.totalItems = tickets.totalElements;
    });
  }

  getTicketInfo(ticket: Ticket) {
    if (Number(ticket.number) === 0) {
      this.soldOutState = true;
      this.bookState = false;
    } else {
      this.bookState = true;
      this.soldOutState = false;
    }
    this.ticket = ticket;
    this.startPointConfirm = ticket.startPoint;
    this.endPointConfirm = ticket.endPoint;
    this.hourConfirm = ticket.startHour;
    this.startDateConfirm = ticket.startDate;
  }

  book() {
    console.log(this.ticket.number);
    if (Number(this.ticket.number) === 0) {
      this.toastr.warning('Sold out!', 'Ticket');
      this.bookState = false;
    } else {
      this.ticket.number -= 1;
      console.log(this.ticket);
      this.ticketService.updateTicket(this.ticket.id, this.ticket).subscribe(res => {
        this.getAll();
        this.toastr.success('Booked successfully!', 'Ticket');
      });
    }
  }

  search() {
    if (this.startDateSearch === '') {
      this.startDateSearch = '2000-01-01';
    }
    if (this.endDateSearch === '') {
      this.endDateSearch = '2200-01-01';
    }
    this.ticketService.search(this.startPointSearch, this.endPointSearch,
      this.startDateSearch, this.endDateSearch).subscribe((tickets: any) => {
      if (this.startDateSearch === '2000-01-01') {
        this.startDateSearch = '';
      }
      if (this.endDateSearch === '2200-01-01') {
        this.endDateSearch = '';
      }
      if (tickets != null) {
        this.tickets = tickets.content;
      } else {
        this.tickets = [];
      }
      this.page = 1;
    });
  }

  delete() {
    this.ticketService.delete(this.ticket.id).subscribe(res => {
      this.getAll();
      this.toastr.success('Deleted successfully!', 'Ticket');
    });
  }
}
