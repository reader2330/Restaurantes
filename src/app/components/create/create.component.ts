import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {RestauranteService} from '../../services/restaurante/restaurante.service';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {AlertService} from '../../services/alert/alert.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {
  @ViewChild('search') search: GooglePlaceDirective;
  @Output('responseChildren') responseChildren = new EventEmitter();
  map: google.maps.Map;
  restauranteForm: FormGroup;
  adressActual;

  constructor(private restaurantS: RestauranteService, private fb: FormBuilder, private alert:AlertService) {
  }

  ngOnInit() {
    this.restauranteForm = this.fb.group({
      'name': ['', Validators.required],
      'lat': ['', Validators.required],
      'lng': ['', Validators.required],
      'email': ['', Validators.required],
      'phone': ['', Validators.required],
      'isActive': [false],
    });

  }

  get f() {
    return this.restauranteForm.controls;
  }

  handleAddressChange(address: Address) {
    console.log(address);
    console.log(address.geometry.location.lat());
    this.adressActual = address;
  }

  onCreateRestaurant() {
    this.alert.confirm().then(res => {
      if (res.value) {
        let json = this.restauranteForm.value;
        json['lat'] = this.adressActual.geometry.location.lat();
        json['lng'] = this.adressActual.geometry.location.lng();
        this.restaurantS.createRestaurant(json).subscribe(res => {
          this.alert.success().then(() => {
            this.responseChildren.emit({value: 1});
          });
        });
      }
    });
  }
}
