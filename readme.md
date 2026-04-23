# Guía de Estudios: Angular

Esta guía resume los conceptos fundamentales y avanzados de TypeScript y Angular (versiones modernas 16+), diseñada para servir como referencia rápida y material de estudio.

---

## PARTE 1: TYPESCRIPT - FUNDAMENTOS

TypeScript es un lenguaje de programación desarrollado por Microsoft que extiende JavaScript añadiendo tipado estático opcional, interfaces, clases y otras características avanzadas. Permite detectar errores en tiempo de compilación y mejora la mantenibilidad del código.

### 1. Tipos Básicos de Datos

```ts
const name: string = 'Strider';
let hpPoints: number = 54;
const isAlive: boolean = true;
```

### 2. Arreglos, Objetos e Interfaces

**Arreglos**
```ts
let skills: string[] = ['bash', 'counter']; // Arreglo de strings
```

**Objetos e Interfaces**
Para definir la estructura y tipado de un objeto se utilizan `interfaces`.
```ts
interface Character {
    name: string;
    age: number;
    skills: string[];
    hometown?: string; // El "?" significa que es opcional (puede ser undefined)
}

const strider: Character = {
    name: 'Strider',
    age: 100,
    skills: ['bash', 'charge'],
}
```

**Record**
La utilidad `Record<K, T>` define un objeto donde conoces qué tipo de llaves (K) tendrá y qué tipo de valores (T) almacenará. Es ideal para diccionarios o mapas.
```ts
// Un objeto cuyas llaves son strings y sus valores son arreglos de Gifs
const searchHistory = signal<Record<string, Gif[]>>({});
```

### 3. Funciones

**Funciones Normales y Flecha**
```ts
function addNumbers(a: number, b: number): number {
    return a + b;
}

const addNumbersArrow = (a: number, b: number): number => {
    return a + b;
}
```

**Funciones con Objetos como Argumento**
```ts
interface Hero {
    name: string;
    hp: number;
    showHp: () => void;
} 

const healCharacter = (character: Hero, amount: number): void => {
    character.hp += amount;
}
```

### 4. Interfaces Avanzadas (Anidadas)
Se usa cuando hay objetos complejos dentro de otros objetos.
```ts
interface Address {
    calle: string;
    pais: string;
    ciudad: string;
}

interface SuperHero {
    name: string;
    age: number;
    address: Address;
    showAddress: () => string;
}
```

### 5. Desestructuración

**Desestructuración de Objetos**
```ts
const personaje = {
    nombre: 'Samuel',
    edad: 30,
    ciudad: 'Caracas'
}

// Renombrando "nombre" a "name"
const { nombre: name, edad, ciudad } = personaje;
```

**Desestructuración de Arreglos**
```ts
const personajes = ['Goku', 'Vegeta', 'Trunks'];

// Se saltan posiciones con comas. Se puede asignar valor por defecto.
const [ , , trunks = 'Not found' ] = personajes;
```

### 6. Importaciones y Exportaciones

```ts
// Exportar
export const name = 'Samuel';
export default name;

// Importar
import { name } from './path';
import nameDefault from './path';
```

### 7. Clases y Programación Orientada a Objetos

**Constructor Corto (Forma recomendada en TS)**
```ts
export class Person {
    constructor(
        public name: string, 
        private address: string
    ) {}
}
```

**Herencia (Extender una clase)**
```ts
export class Hero extends Person {
    constructor(public alterEgo: string, public age: number) {
        super(alterEgo, 'New York');
    }
}
```

**Composición (Evitar dependencias rígidas)**
En lugar de instanciar clases dentro de otras, se pasan por el constructor (Inyección de dependencias manual).
```ts
export class Hero {
    constructor(
        public alterEgo: string, 
        public age: number,
        public person: Person,
    ) {}
}
const juan = new Person('Juan', 'New York');
const hero = new Hero('Spiderman', 25, juan);
```

### 8. Genéricos
Función reutilizable que permite trabajar con múltiples tipos de datos manteniendo el tipado estricto.
```ts
function whatsMyType<T>(argument: T): T {
    return argument;
}

let amIString = whatsMyType<string>('hola');
let amINumber = whatsMyType(4); // Inferencia de tipo automática
```

### 9. Decoradores
Un tipo especial de declaración que añade anotaciones o modifica clases y métodos. En Angular se usan extensamente (`@Component`, `@Injectable`).
```ts
function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        newProperty = 'New Property';
        hello = 'override';
    }
}

@classDecorator
export class SuperClass { 
    public myProperty: string = 'Abc123';
}
```

---

## PARTE 2: ANGULAR - CONCEPTOS BÁSICOS

### Puntos Fundamentales
* **Componentes:** Pieza fundamental que representa una parte de la interfaz de usuario.
* **Rutas:** Permiten cambiar entre vistas/páginas en una Single Page Application (SPA).
* **Directivas:** Modifican el comportamiento o apariencia de un elemento HTML (`ngClass`, `ngStyle`).
* **Servicios:** Encapsulan la lógica de negocio y centralizan su acceso, permitiendo compartir datos.
* **Pipes:** Transforman datos visualmente en el HTML sin mutar la data original (ej. mayúsculas, fechas).

### Comandos CLI Útiles
* `ng new nombre_proyecto`: Crea un proyecto nuevo.
* `ng serve -o`: Levanta el servidor de desarrollo y lo abre en el navegador.
* `ng generate component nombre` o `ng g c nombre`: Crea un nuevo componente.
* `ng g s nombre`: Crea un servicio.
* `ng g environments`: Genera los archivos de variables de entorno.

### Estructura de Directorios Principal
* **node_modules:** Librerías y dependencias (nunca se sube al repositorio).
* **src:** Código fuente de tu aplicación (Componentes, servicios, assets).
* **angular.json:** Configuración principal del proyecto Angular.
* **package.json:** Listado de dependencias y scripts del proyecto.
* **tsconfig.json:** Configuración del compilador de TypeScript.

---

## PARTE 3: COMPONENTES Y PLANTILLAS (TEMPLATES)

### Estructura de un Componente (Standalone)
Angular 14+ introdujo componentes Standalone, eliminando la necesidad estricta de `NgModules`.
```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-counter',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './counter.component.html',
    styleUrl: './counter.component.css'
})
export class CounterComponent { }
```

### Control Flow (Angular 17+)

**Condicional @if**
```html
@if (character.power > 9000) {
  <li>
    <span>{{ character.name }} es súper poderoso!</span>
  </li>
} @else {
  <li>El poder de {{ character.name }} es normal.</li>
}
```

**Iteración @for**
```html
@for (item of items; track item.id) {
  <li>{{ item.name }}</li>
} @empty {
  <li>No hay elementos en la lista.</li>
}
```

### Directivas y Enlaces de Datos (Bindings)

**Property Binding y Event Binding**
Usamos `[]` para enviar propiedades desde TS hacia HTML, y `()` para escuchar eventos del HTML hacia TS.
```html
<!-- Property binding en [value], event binding en (input), y #txtPower como referencia local -->
<input 
  type="number" 
  [value]="power()"
  (input)="updatePower(txtPower.valueAsNumber || 0)" 
  #txtPower
>
```

**ngClass y Clases Dinámicas**
Se puede usar la directiva `ngClass` o el atajo de clase nativo.
```html
<!-- Usando objeto en ngClass -->
<strong [ngClass]="{'text-danger': character.power > 9000}">
  ( {{ character.power }} )
</strong>

<!-- Atajo recomendado nativo -->
<strong [class.text-danger]="character.power > 9000" [class.text-primary]="character.power <= 9000">
  ( {{ character.power }} )
</strong>
```

---

## PARTE 4: REACTIVIDAD MODERNA (SIGNALS)

Signals es un sistema reactivo introducido en Angular 16 que permite actualizar el DOM sin depender de Zone.js, lo que hace la aplicación mucho más rápida y predecible.

### Señales Básicas
Son contenedores de valores que notifican cuando cambian.
```ts
import { signal } from '@angular/core';

export class HeroComponent {
  name = signal('Ironman');
  age = signal(45);

  // Leer en TS: this.name()
  // Leer en HTML: {{ name() }}

  cambiarNombre() {
    this.name.set('Spiderman'); // set() reemplaza el valor
  }

  incrementarEdad() {
    this.age.update(currentAge => currentAge + 1); // update() basa el nuevo valor en el anterior
  }
}
```

### Señales Computadas (`computed`)
Son señales de solo lectura que derivan su valor de otras señales. Solo se recalculan si sus dependencias cambian.
```ts
import { computed } from '@angular/core';

heroDescription = computed(() => {
  return `${this.name()} tiene ${this.age()} años.`;
});
```

### Efectos (`effect`)
Un `effect` es una función que se ejecuta reactivamente cuando una señal de la que depende cambia. Útil para integrarse con código no reactivo (ej. LocalStorage, dibujar un chart en Canvas).
```ts
import { effect } from '@angular/core';

constructor() {
  effect((onCleanup) => {
    // Esto se dispara cada vez que age() o name() cambian
    console.log(`Estado guardado: ${this.name()} - ${this.age()}`);
    
    // onCleanup sirve para limpiar timers o suscripciones antes de que el efecto se vuelva a ejecutar
    const timer = setTimeout(() => console.log('Timer disparado'), 1000);
    onCleanup(() => clearTimeout(timer));
  });
}
```

---

## PARTE 5: COMUNICACIÓN ENTRE COMPONENTES

Angular 17 introdujo funciones basadas en Signals para comunicar componentes padre-hijo de forma más limpia.

### 1. Recibir Datos (`input`)
El componente hijo recibe información del padre.
```ts
import { input } from '@angular/core';

export class CharacterList {
  // Input obligatorio
  characters = input.required<Character[]>();
  
  // Input opcional con valor por defecto
  listName = input<string>('Lista de Defecto'); 
}
```
*En el Padre:* `<app-character-list [characters]="misPersonajes" />`

### 2. Emitir Datos (`output`)
El componente hijo envía información o eventos al padre.
```ts
import { output } from '@angular/core';

export class CharacterAdd {
  newCharacter = output<Character>();

  onSave() {
    this.newCharacter.emit({ name: 'Gohan', power: 5000 });
  }
}
```
*En el Padre:* `<app-character-add (newCharacter)="agregar($event)" />`

### 3. Comunicación Bidireccional (`model`)
Combina `input` y `output` para lograr un "Two-way data binding". Es útil cuando un hijo necesita recibir un valor Y poder modificarlo (notificando al padre automáticamente).
```ts
import { model } from '@angular/core';

export class ToggleComponent {
  // Funciona como input y output a la vez
  isActive = model<boolean>(false);

  toggle() {
    // Al usar .update() o .set(), el componente padre se entera del cambio automáticamente
    this.isActive.update(val => !val); 
  }
}
```
*En el Padre:* `<app-toggle [(isActive)]="miSignalDeEstado" />`

---

## PARTE 6: ENRUTAMIENTO Y NAVEGACIÓN (ROUTING)

### Navegación en el Template
* `routerLink`: Reemplazo del `href` clásico para navegar sin recargar la página.
* `routerLinkActive`: Asigna una clase CSS cuando la ruta coincide con la URL actual.
```html
<nav>
  <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Inicio</a>
  <a routerLink="/hero" routerLinkActive="active">Hero</a>
</nav>
```

### Rutas Dinámicas y Activated Route
Para URLS como `/history/goku`.
```ts
// routes.ts
{ path: 'history/:query', component: HistoryComponent }

// history.component.ts
import { ActivatedRoute } from '@angular/router';

activatedRoute = inject(ActivatedRoute);

// 1. Mediante Suscripción (Detecta cambios si te mantienes en el mismo componente pero la URL cambia)
ngOnInit() {
  this.activatedRoute.params.subscribe(params => {
    console.log(params['query']);
  });
}

// 2. Mediante Snapshot (Solo lee la URL una vez al cargar el componente)
queryParam = this.activatedRoute.snapshot.paramMap.get('query') ?? '';
```

### Cambiar de Ruta desde TypeScript
```ts
import { Router } from '@angular/router';

router = inject(Router);

irAlPerfil() {
  // Navega a /country/by-capital?query=madrid
  this.router.navigate(['/country/by-capital'], {
    queryParams: { query: 'madrid' }
  });
}
```

### Rutas Hijas y Layouts
Útil para aplicar un mismo diseño (Navbar, Footer) a múltiples páginas (Layout) y usar lazy loading.
```ts
// app.routes.ts
export const routes: Routes = [
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes')
  }
];

// country.routes.ts
export default [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      { path: 'by-capital', component: ByCapitalPageComponent },
      { path: 'by-country', component: ByCountryPageComponent },
      { path: '**', redirectTo: 'by-capital' }
    ]
  }
];
```
*En el `CountryLayoutComponent.html`, se usa `<router-outlet />` para indicar dónde se renderizarán los hijos.*

### HashLocationStrategy
Se utiliza en el archivo de configuración para evitar errores 404 al recargar la página en servidores de producción (como GitHub Pages o servidores estáticos simples). Añade un `#` a la URL (ej. `midominio.com/#/home`).
```ts
// app.config.ts
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()), // Angular moderno
    // O de forma tradicional: { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
};
```

---

## PARTE 7: SERVICIOS E INYECCIÓN DE DEPENDENCIAS

Los servicios son clases `Singleton` (una sola instancia en toda la app) usadas para centralizar llamadas HTTP, lógicas de negocio o variables de estado que necesitan compartirse entre múltiples componentes.

```ts
import { Injectable, signal } from '@angular/core';

// 'root' hace que el servicio esté disponible en toda la aplicación
@Injectable({ providedIn: 'root' })
export class DragonBallService {
  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 }
  ]);

  addCharacter(character: Character) {
    this.characters.update(chars => [...chars, character]);
  }
}
```

**Uso en un Componente usando `inject`**
```ts
import { inject } from '@angular/core';

export class HeroPageComponent {
  // Inyección moderna de dependencias
  private dbService = inject(DragonBallService);

  get personajes() {
    return this.dbService.characters();
  }
}
```

---

## PARTE 8: PETICIONES HTTP Y MANEJO DE APIS

### Configuración
Habilitar cliente HTTP en `app.config.ts`.
```ts
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), // withFetch optimiza usando el API Fetch nativo
  ]
};
```

### Consumir APIs, Mapeo y Manejo de Errores
Se recomienda usar "Mappers" (Clases que transforman la respuesta compleja de una API a la Interfaz simple que tu frontend necesita) y manejar errores usando `rxjs`.

```ts
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string) {
    return this.http.get<RESTCountry[]>(`https://restcountries.com/v3.1/capital/${query}`)
      .pipe(
        // Transformar la respuesta usando un Mapper estático
        map(resp => CountryMapper.toDomain(resp)),
        // Manejo de errores si la API falla o la capital no existe
        catchError(error => {
          console.log('Error de API:', error);
          return throwError(() => new Error(`No se encontró la capital: ${query}`));
        })
      );
  }
}
```

**En el componente (Usando Suscripción manual)**
```ts
this.countryService.searchByCapital(query).subscribe({
  next: (countries) => {
    this.countries.set(countries);
  },
  error: (err) => {
    this.errorMessage.set(err.message);
  }
});
```

---

## PARTE 9: MANEJO DE ESTADO ASÍNCRONO (Angular 19+)

Angular 19 introdujo utilidades para manejar llamadas asíncronas de manera declarativa usando Signals, ahorrándonos variables manuales como `isLoading`, `hasError`, etc.

### `resource` (Para Promesas o Fetch)
```ts
import { resource } from '@angular/core';

query = signal('');

countryResource = resource({
  // Cuando params cambia, el loader se vuelve a ejecutar automáticamente
  params: () => ({ query: this.query() }),
  loader: async ({ params }) => {
    if (!params.query) return [];
    const resp = await fetch(`https://restcountries.com/v3.1/capital/${params.query}`);
    return await resp.json();
  }
});

// En el HTML accedes a: 
// countryResource.value() (los datos)
// countryResource.isLoading() (true/false)
// countryResource.error() (mensaje de error)
```

### `rxResource` (Para Observables / HttpClient)
```ts
import { rxResource } from '@angular/core/rxjs-interop';

countryResource = rxResource({
  params: () => ({ query: this.query() }),
  stream: ({ params }) => {
    if (!params.query) return of([]); // "of" emite un observable vacío
    return this.countryService.searchByCapital(params.query);
  }
});
```

---

## PARTE 10: PIPES

Los Pipes formatean datos en el HTML antes de mostrarlos al usuario.

**Importación en Standalone**
```ts
import { UpperCasePipe, DecimalPipe, DatePipe } from '@angular/common';
// Agregar a imports: [UpperCasePipe, DecimalPipe, DatePipe]
```

**Ejemplos Comunes:**
```html
<!-- Texto a Mayúsculas -->
<p>{{ name() | uppercase }}</p>

<!-- Formato de Fechas -->
<p>{{ miFecha | date:'short' }}</p>

<!-- DecimalPipe: Formatea números. 
  Estructura: 'minIntegerDigits.minFractionDigits-maxFractionDigits' 
  Ej: '1.2-2' significa 1 dígito entero mínimo, 2 decimales mínimos, 2 máximos. -->
<p>Población: {{ population | number:'1.0-0' }}</p>
<p>Precio: {{ 1234.5 | number:'1.2-2' }}</p>
```

---

## PARTE 11: TÉCNICAS AVANZADAS Y BUENAS PRÁCTICAS

### Debounce (Retrasar ejecución al escribir)
Evita saturar la API enviando una petición por cada letra escrita. Espera a que el usuario deje de escribir por unos milisegundos.
```ts
inputValue = signal('');
debouncedValue = output<string>();

constructor() {
  effect((onCleanup) => {
    const currentVal = this.inputValue();
    
    // Configurar temporizador
    const timeout = setTimeout(() => {
      this.debouncedValue.emit(currentVal);
    }, 500); // 500ms de espera

    // Si la señal cambia antes de los 500ms, se ejecuta la limpieza y aborta el timer anterior
    onCleanup(() => clearTimeout(timeout));
  });
}
```

### Manejo de Caché (Evitar Peticiones Duplicadas)
Guardar resultados previos en Memoria (RAM) usando un `Map`. Si la página se recarga, la caché se pierde.
```ts
private cache = new Map<string, Country[]>();

search(query: string): Observable<Country[]> {
  if (this.cache.has(query)) {
    return of(this.cache.get(query)!); // Retornar data de caché
  }

  return this.http.get<Country[]>(`...`).pipe(
    tap(countries => this.cache.set(query, countries)) // Guardar en caché antes de retornar
  );
}
```

### Persistencia con LocalStorage
Para que la información sobreviva al recargar el navegador, debes guardarla en el `localStorage` del navegador.
```ts
export class HistoryService {
  history = signal<string[]>(this.loadHistory());

  private loadHistory(): string[] {
    const saved = localStorage.getItem('myHistory');
    return saved ? JSON.parse(saved) : [];
  }

  addSearch(term: string) {
    this.history.update(h => [term, ...h]);
    localStorage.setItem('myHistory', JSON.stringify(this.history()));
  }
}
```

### Preservar Resultados Visuales en Servicios
Si quieres que al cambiar de pestaña y volver a la vista, los resultados de la búsqueda sigan estando ahí (sin requerir LocalStorage), **debes guardar esos resultados en las señales del Servicio, NO en el Componente.**
1. El componente se destruye al salir de la ruta (pierde sus señales).
2. El servicio es Singleton y nunca se destruye.
3. Al inyectar el servicio nuevamente, el componente lee las señales intactas.

---

## PARTE 12: RECURSOS ÚTILES Y LIBRERÍAS

**Oficiales y Documentación**
* [Hoja de Atajos Oficial (Angular Cheat Sheet)](https://github.com/Klerith/mas-talento/blob/main/angular/angular-cheat-sheet.pdf)
* [Documentación Angular.dev](https://angular.dev/)
* [RxJS Documentación](https://rxjs.dev/guide/overview) - Para entender Operadores, Observables y Subject.

**UI Componentes y Estilos**
* [TailwindCSS](https://tailwindcss.com/) - Framework CSS de utilidades, estándar en proyectos Angular modernos.
* [DaisyUI](https://daisyui.com/) - Componentes de interfaz usando clases de Tailwind.
* [PrimeNG](https://primeng.org/) - Librería inmensa y robusta de componentes corporativos para Angular.
* [Angular Material](https://material.angular.io/) - Componentes oficiales basados en Material Design.
* [Iconify](https://iconify.design/) - Librería agnóstica para importar cualquier icono del mercado (Material, Bootstrap, FontAwesome) sin sobrecargar el bundle.

**Gestión de Estado Avanzada**
* [NgRx](https://ngrx.io/) - Redux para Angular (Recomendado solo para aplicaciones empresariales masivas).
