import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../Services/address.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrl: './create-address.component.css'
})
export class CreateAddressComponent {


  selectedCar: any;
  is_submit = false;
  countries: any;
  states: any;
  cities: any;
  id: any;
  editAddress:any;
  notyf: Notyf;


  constructor(private address: AddressService, private router: Router, private activated: ActivatedRoute) { this.notyf = new Notyf(); }

  ngOnInit() {
    this.address.getCountry().subscribe(res => {
      this.countries = res.data;
    })
    this.activated.paramMap.subscribe(param => {
      this.id = param.get('id');
      if (this.id) {
        this.address.address().subscribe(res => {
          this.editAddress = res.data.find((add: any) => add.id == this.id);
          this.addressForm.patchValue({
            country_id: this.editAddress.country_id.country_id,
            suburb: this.editAddress.suburb,
            phone: this.editAddress.phone,
            street_address: this.editAddress.street_address,
            building_number: this.editAddress.building_number,
            floor_number: this.editAddress.floor_number,
            flat_number: this.editAddress.flat_number,
            is_default: (this.editAddress.default_address == 1) ? true : false
          });
        },(err)=>{
        },()=>{
          this.address.getGovernorates(this.addressForm.get('country_id')?.value).subscribe(res => {
            this.states = res.data;
            this.addressForm.patchValue({
              state_id: this.editAddress.state_id.id
            });
          });
          this.address.getCities(this.editAddress.state_id.id).subscribe(res => {
            this.cities = res.data;
            this.addressForm.patchValue({
              city: this.editAddress.cityInfo.id
            });
          })
        });
      }
    })
  }

  handleState() {
    this.addressForm.patchValue({
      state_id: null,
      city: null
    });
    this.address.getGovernorates(this.addressForm.get('country_id')?.value).subscribe(res => {
      this.states = res.data;
    })
  }

  handleCities() {
    this.addressForm.patchValue({
      city: null
    });
    this.address.getCities(this.addressForm.get('state_id')?.value).subscribe(res => {
      this.cities = res.data;
    })
  }

  addressForm = new FormGroup({
    country_id: new FormControl(null, Validators.required),
    state_id: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    suburb: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    street_address: new FormControl(null, Validators.required),
    building_number: new FormControl(null, Validators.required),
    floor_number: new FormControl(null, Validators.required),
    flat_number: new FormControl(null, Validators.required),
    is_default: new FormControl(false),
  });

  onSubmit() {
    this.is_submit = true;
    if (this.addressForm.valid) {
      if (this.id == null) {
        this.address.addAddress(this.addressForm.value).subscribe((res) => {
          this.notyf.success('Add Address Successfully.');
          setTimeout(() => {
            this.router.navigateByUrl('/address');
          }, 1000);
        });
      } else {
        this.address.updateAddress(this.addressForm.value, this.id).subscribe((res) => {
          this.notyf.success('Update Address Successfully.');

          setTimeout(() => {
            this.router.navigateByUrl('/address');
          }, 1000);
        });
      }
    }
  }
}
