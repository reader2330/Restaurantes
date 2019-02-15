/// <reference types="@types/googlemaps" />
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RestauranteService} from '../../services/restaurante/restaurante.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {AlertService} from '../../services/alert/alert.service';
declare var google: any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.sass']
})
export class MapaComponent implements OnInit, AfterViewInit {
  @ViewChild('googleMap') gmapElement: any;
  @ViewChild('search') search: GooglePlaceDirective;
  map: google.maps.Map;
  restauranteForm: FormGroup;
  restaurants = [];
  ngOnInit() {
    this.getRestaurants();



  }

  ngAfterViewInit() {

      setTimeout(() => {
        var mapProp = {
          center: new google.maps.LatLng(19.4301808, -99.21262189999999),
          zoom: 7,
           mapTypeId: google.maps.MapTypeId.ROADMAP
          //mapTypeId: google.maps.MapTypeId.HYBRID
          // mapTypeId: google.maps.MapTypeId.SATELLITE
          // mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        this.crearMarkers();
      },2000);


  }



  constructor(private restaurantS: RestauranteService, private fb: FormBuilder, private alert: AlertService) { }
  getRestaurants() {
    this.restaurantS.getRestaurants().subscribe(res => {
      console.log(res);
      this.restaurants = res.restaurants;
    });
  }
  crearMarkers() {
    let markers = [];
    for(let res of this.restaurants) {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(res['lat'], res['lng']),
        map: this.map,
        visible: true,
        label: res['name']
      });
      let infowindod = new google.maps.InfoWindow({
        content: '<div class="info-window">' +
          '<h3>' +  res.name + '</h3>' +
          '<div class="info-content">' +
          '<p>Email:' + res.email + '</p>' +
          '<p>Telefono:' + res.phone + '</p>' +
          '<p>Latitud:' + res.lat + '</p>' +
          '<p>Longitud:' + res.lng + '</p>' +
          '</div>' +
          '</div>'

      });
      infowindod.setPosition({lat: res.lat, lng: res.lng});
      infowindod.open(this.map);
      markers.push(marker);

    }
  }

  get f() {
    return this.restauranteForm.controls;
  }
  deleteRestaurant(res) {
    console.log(res);
    this.alert.confirm('Borrar', '¿Eliminas un restaurante?').then(res2 => {
      if (res2.value) {
        this.restaurantS.deleteRestaurant(res['_id']).subscribe(res3 => {
          this.alert.success();
        });
      }
    });


  }




}
