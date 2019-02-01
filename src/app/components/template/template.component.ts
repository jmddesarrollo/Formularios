import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  public usuario: Object;
  public paises: Object[];
  public sexos: string[];

  constructor() {
    this.usuario = { nombre: 'Javier', apellidos: 'Molero', email: 'jmddesarrollo@gmail.com', pais: '', sexo: 'Hombre', acepta: false};
    this.paises = [{ codigo: 'ESP', nombre: 'España'}, {codigo: 'CRI', nombre: 'Costa Rica'}];
    this.sexos = ['Hombre', 'Mujer'];
  }

  ngOnInit() {
  }

  guardar(forma: NgForm) {
    console.log('Formulario enviado.');
    console.log(forma);
    console.log(forma.value);
  }

}
