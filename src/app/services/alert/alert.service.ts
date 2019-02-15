import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success(title?, message?) {
    return Swal.fire({
      title: title || 'Listo',
      text: message || 'La operación se realizo correctamente',
      type: 'success'
    } );
  }

  confirm(title?, message?, textButtonConfirm?, textButtonDecline? ) {
    return Swal.fire({
      title: title || '?',
      text: message || 'Quieres realizar la operación',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: textButtonConfirm || 'Si',
      cancelButtonText: textButtonDecline || 'No',
    });
  }

  warning(title?, message?) {
    return Swal.fire({
      title: title || 'Opps!',
      text: message || 'Te falto algun campo',
      type: 'warning'
    } );
  }
  error(title?, message?) {
    return Swal.fire({
      title: title || 'Opps!',
      text: message || 'Algo salio mal',
      type: 'error'
    });
  }
}
