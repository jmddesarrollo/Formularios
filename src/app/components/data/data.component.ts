import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  public forma: FormGroup;
  // public usuarioComplejo: Object = {
  //   nombrecompleto: { nombre: 'Javier', apellidos: 'Molero'},
  //   email: 'jmddesarrolo@gmail.com'
  // };

  public usuario: any;

  constructor() {
    this.usuario = {
      nombre: 'Javier',
      apellidos: 'Molero',
      email: 'jmddesarrolo@gmail.com',
      pasatiempos: ['correr'],
      username: '',
      password1: '',
      password2: ''
    };
    // FormControl parametros: valor por defecto / regla validación[] / regla validación asincrona[]
    this.forma = new FormGroup({
      // Si se necesitará un objeto de objetos.
      // 'nombrecompleto': new FormGroup({
      //   'nombre': new FormControl('Javier', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      //   'apellidos': new FormControl('', [Validators.required])
      // })

      'nombre': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      'apellidos': new FormControl('', [Validators.required, this.noTengo]),
      'email': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', [Validators.required])
      ]),
      // Un FormControl puede aceptar una función en la parte de las validaciones
      'username': new FormControl('', [Validators.required], [this.existeUsuario]),
      'password1': new FormControl('', [Validators.required]),
      'password2': new FormControl()
    });
    // forma.valid  => Indicador de formulario válido.
    // forma.status => Indicador de estado del formulario. Interesante para async. 'INVALID' | 'PENDING'

    // Otra forma de validar, que bien puede ir en el FormGroup.
    // Dentro de la función no reconoce a 'this', por tanto mediante el bind ('enlazar') se puede pasar a la función el elemento.
    this.forma.controls['password2'].setValidators([Validators.required, this.noIgual.bind(this.forma)]);

    // Objeto al tener misma estructura que el 'forma' (formulario)
    this.forma.setValue(this.usuario);

    // Crear un observable y suscribirme a cualquier cambio que se realice en el formulario.
    this.forma.valueChanges.subscribe( data => {
      console.log(data);
    });

    // Crear un observable y subscribirme a cualquier cambio en un determinado elemento del formulario.
    this.forma.controls['username'].valueChanges.subscribe( data => {
      console.log(data);
    });
  }

  ngOnInit() {

  }

  guardarCambios() {
    console.log(this.forma.value);
    console.log(this.forma);

    // Con reset regresa a sus valores iniciales, que puede no ser lo que interese.
    // this.forma.reset(this.usuario);
    this.forma.reset({nombre: '', apellidos: '', email: '', username: '', password1: '', password2: '', pasatiempos: ''});
  }

  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  /**
   * Validación personalizada
   */
  noTengo( control: FormControl ): { [s: string]: boolean } {
    if (control.value === 'notengo') {
      return {
        notengo: true
      };
    }
    return null;
  }

  /**
   * Validación de contraseñas iguales
   */
  noIgual( control: FormControl ): { [s: string]: boolean } {
    // 'this.forma' entra a la función por el método 'bind' pq este tipo de función no reconoce a 'this'.
    // if (control.value !== this.forma.controls['password1'].value) {
    const forma: any = this;

    if (control.value !== forma.controls['password1'].value) {
      return {
        noiguales: true
      };
    }
    return null;
  }

  /**
   * Validación asincrono, contra la base de datos.
   */
  existeUsuario( control: FormControl ): Promise<any> | Observable<any> {
    const promesa = new Promise( (resolve, reject) => {
      setTimeout( () => {
        if (control.value === 'jmolero') {
          resolve( {existe: true } );
        } else {
          resolve(null);
        }
      }, 3000 );
    });

    return promesa;
  }

}
