import { Component } from '@angular/core';
import { AddressService } from '../../Services/address.service';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  notyf: Notyf;
  addresses: any;
  asDefault = {
    is_default: 0
  }

  constructor(private address: AddressService) {  this.notyf = new Notyf();  }

  ngOnInit() {
    this.getAddress()
  }

  getAddress() {
    this.address.address().subscribe(res => {
      this.addresses = res.data;
    })
  }

  delete(id: any) {
    this.address.deleteAddress(id).subscribe(
      (res) => {
        this.getAddress();

        this.notyf.success('Delete Address Successfully.');
      },
      (err) => {
        
        this.notyf.error(err.error.message || 'Error occurred while deleting address.');
      }
    );
  }

  default(id: any) {
    this.asDefault.is_default = 1;
    this.address.updateAddress(this.asDefault, id).subscribe((res) => {
      this.getAddress();

      
      this.notyf.success('Set Address Successfully.');
    });
  }

}
