import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Clase } from 'src/app/models/clase';
import { AlertService } from 'src/app/services/alert.service';
import { ClaseService } from 'src/app/services/clase.service';

@Component({
  selector: 'app-modificar-clase',
  templateUrl: './modificar-clase.component.html',
  styleUrls: ['./modificar-clase.component.scss'],
  animations: [
    trigger('inOut', [
      transition('void => *', [ 
        style({ opacity: 0 }),          
        animate('500ms',
          style({ opacity: 1 }) 
        )
      ]),
      transition('* => void', [
        animate('500ms', 
          style({ opacity: 0 })
        ) 
      ])
    ]) 
  ]
})
export class ModificarClaseComponent implements OnInit, AfterViewInit {

  clase: Clase = new Clase();
  tooltipValidated = false;

  @ViewChild('fileInputClase')
  fileInputClase!: ElementRef;
  
  constructor(private router: Router,
              private claseService: ClaseService,
              private alertService: AlertService,
              private _sanitizer: DomSanitizer,
              private activatedroute: ActivatedRoute,) { }

  ngAfterViewInit(): void {
    const imageName = 'fileInputClase.jpeg';
    const imageBlob = this.dataURItoBlob(this.clase.imagen);
    const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
    let list = new DataTransfer();

    list.items.add(imageFile);
    this.fileInputClase.nativeElement.files = list.files;
    this.clase.imagen = list.files[0];
  }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.clase = data['clase'];
    })
  }

  fileChanged(e:any) {
    this.clase.imagen = e.target.files[0];
  }

  modificarClase(modificarClaseForm: NgForm)
  {
    if(!modificarClaseForm.invalid){
      this.claseService.updateClase(this.clase)
      .subscribe(response => {
        this.alertService.success('Se ha creado correctamente la clase.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
        this.onBack();
      },
      error => {
        this.alertService.error('Ocurrió un error al crear la clase.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' });
      });
    }
    else{
      this.tooltipValidated = true;
    }
  }

  onBack() {
    this.router.navigateByUrl("main/gestion-clases");
  }

  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
 }
}
