import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Brand} from '../../model/brand';
import {TicketService} from '../../service/ticket.service';
import {BrandService} from '../../service/brand.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit {
  ticketForm: FormGroup = new FormGroup({
    startPoint: new FormControl('', Validators.required),
    endPoint: new FormControl('', Validators.required),
    startDate: new FormControl('', [Validators.required,
      Validators.pattern('^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$')]),
    startHour: new FormControl('', [Validators.required, Validators.pattern('^[0-2]{1}[0-9]{1}(:)[0-6]{1}[0-9]{1}$')]),
    brand: new FormGroup({
      id: new FormControl(''),
      name: new FormControl('')
    }),
    number: new FormControl('', [Validators.required, Validators.pattern('^\\d+$')]),
    price: new FormControl('', [Validators.required, Validators.pattern('^\\d+$')])
  }, this.checkStartDate);
  brands: Brand[];
  id: number;

  constructor(private ticketService: TicketService,
              private brandService: BrandService,
              private toastr: ToastrService,
              private route: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.params.id);
    this.getAllBrands();
    this.getTicket(this.id);
  }

  getAllBrands() {
    this.brandService.getAll().subscribe(brands => {
      this.brands = brands;
    });
  }

  getTicket(id) {
    this.ticketService.findById(id).subscribe(ticket => {
      this.ticketForm.patchValue(ticket);
      console.log(this.ticketForm);
    });
  }

  checkStartDate(abstractControl: AbstractControl): any {
    const date = new Date(abstractControl.value.startDate);
    const now = new Date();
    console.log(date);
    console.log(now);
    if (date > now) {
      console.log('null');
      return null;
    } else {
      console.log('error');
      return {dateerror: true};
    }
  }

  submit() {
    this.ticketService.updateTicket(this.id, this.ticketForm.value).subscribe(ticket => {
        this.toastr.success('Updated successfully!', 'Ticket');
        this.route.navigateByUrl('/ticket');
      }
    );
  }
}
