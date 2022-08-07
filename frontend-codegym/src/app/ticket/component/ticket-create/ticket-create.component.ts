import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Brand} from '../../model/brand';
import {TicketService} from '../../service/ticket.service';
import {BrandService} from '../../service/brand.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {
  ticketForm: FormGroup;
  brands: Brand[];

  constructor(private ticketService: TicketService,
              private brandService: BrandService,
              private toastr: ToastrService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.getAllBrands();
    this.ticketForm = new FormGroup({
      startPoint: new FormControl('', Validators.required),
      endPoint: new FormControl('', Validators.required),
      startDate: new FormControl('', [Validators.required,
        Validators.pattern('^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$')]),
      startHour: new FormControl('', [Validators.required, Validators.pattern('^[0-2]{1}[0-9]{1}(:)[0-6]{1}[0-9]{1}$')]),
      brand: new FormGroup({
        id: new FormControl('', Validators.required)
      }),
      number: new FormControl('', [Validators.required, Validators.pattern('^[1-9]\\d*$')]),
      price: new FormControl('', [Validators.required, Validators.pattern('^^[1-9]\\d*$')])
    }, this.checkStartDate);
  }

  getAllBrands() {
    this.brandService.getAll().subscribe(brands => {
      this.brands = brands;
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
    this.ticketService.save(this.ticketForm.value).subscribe(ticket => {
        this.toastr.success('Created successfully!', 'Ticket');
        this.ticketForm.reset();
        this.route.navigateByUrl('/ticket');
      }
    );
  }
}
