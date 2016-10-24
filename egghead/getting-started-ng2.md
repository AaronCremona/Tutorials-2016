# Getting Started with Angular 2

## Install Angular 2 CLI and Boostrap New Project
$ npm install -g angular-cli

generate new angular 2 project
$ ng new angular2-fundamentals

get served yo
$ ng serve

## Writing a Simple Component
$ ng generate component simple-form --inline-template --inline-style

Generate a component named simple-form with inline temple and style (same file)

### Shorthand for exact same thing
$ ng g c simple-form -it -is

Component gets created in src/app/simple-form.Component.ts

Opening it up, you can see ```selector: 'app-simple-form',```
This can be inserted into the app-root component using: ```<app-simple-form></app-simple-form>```

The prefix app comes from angular-cli.json and can be changed to anything you want for the project namespace

Note: app-root is referenced in index.html to load the whole angular jam.

## Managing Events and Refs

### Events
Building the simple form - edit the template to:
```    
<div>
      <input #myInput type="text">
      <button (click)="onClick()">Click me</button>
</div>
```
The parens refer to the event and the onClick refers to a method in the class to handle the event. Eg

```
onClick() {
  console.log('clicked yo!');
}
```
The syntax of wrapping the event name in parens works with any dom event

### Ref or Reference

```<input #myInput type="text">
```
The #myInput is a ref or reference that can be used elsewhere in the app. E.g.:
```
<button (click)="onClick(myInput.value)">Click me</button>
...
onClick(value) {
  console.log(value);
}
```
### The event object

The actual event object can be accessed using $event (like ng1)

## Services

Generate a service:

$ ng g s mail

Generates a service named mail and a warning that it's generate but not provided. To fix this, go to app.module.ts and add
```
import { MailService } from './mail.service';
```
Add the same import to any components that will use the service, eg app.component.ts and pass it in (inject it) to the constructor, in this example it is private

*The service must also be added to providers in app.moduel.ts:*
```providers: [MailService],
```

### Pass in providers as an object to use @Injectable

```
// in app.module.ts
providers: [
  { provide: 'mail', useClass: MailService },
  { provide: 'api', useValue: 'http://localhost:3000/' }
]

// in app.component

// don't forget to import the inject decorator!
import { Component, Inject } from '@angular/core';

constructor(
    @Inject('mail') private mail,
    @Inject('api') private api
  ){}
```

Using this syntax, values can be injected in the same way, using useValue instead of useClass. Now both can be accessed in the component. This is a good way to provide consistent values across an app

```
{{mail.message}}
<hr>
{{api}}
```

## Looping through components with ngFor
Let's say we have an array of "stuff" in the service
```
// mail.service
messages = [
  `I've got so many messages`,
  `They're poppin off`,
  `Like you can't believe`
]

// app.component
<ul>
  <li *ngFor="let message of mail.messages">
    {{message}}
  </li>
</ul>
```

the ngFor loops over the children of the collection sending in the variable created with let

the * says that the element with the asterisk can be reused as a template during the loop

## Passing data into components using @input

Instead of creating an element in the loop, we can pass an input to a component:

In the component file: add Input to the import for the file and add @Import to the class as shown:
```
@Input() message;
```
Then, the message data can be accessed using {{ message }}

The app file must be modified to pass in message like so:
```
<ul>
<app-simple-form
  *ngFor="let message of mail.messages"
  [message]="message"
  >
  </app-simple-form>
</ul>
```
The square bracket message mean to evaluate the right side, otherwise it will just pass in the string "message" which is pretty bunk
*Note* The names can be anything and don't have to match like they do in this case

## Sync Values from Inputs with ngModel 2 Way Binding

Combines two things we've already seen, parens to represent an event and square brackets to represent pushing a value in. Think of the combo as 2 way binding. If it changes from outside the input, it will push a new value in, and when the value changes inside the input, it pushes the new value out. Think of the parens as out and the square brackets as in.

```
<input #myInput type="text" [(ngModel)]="message">
```

## Pushing Changes Up-Out a Component

Use an @Output!

First, in the component, make sure to import Output and EventEmitter, then make the output in the class:
```
@Output() update = new EventEmitter();

// instead of onClick in the button:
<button (click)="update.emit({ text: message })">Click me!</button>

// now we don't need the onClick event handler anymore!

// in app.component
<ul>
  <li *ngFor="let message of mail.messages">{{ message.text }}</li>
</ul>
<app-simple-form
  *ngFor="let message of mail.messages"
  [message]="message.text"
  (update)="onUpdate(message.id, $event.text)"
  >
  </app-simple-form>

// THEN we need a method in the mail service to handle this 'ish - also don't forget to update the messages data structure:

messages = [
  {id: 0, text: `I've got so many messages`},
  {id: 1, text: `They're poppin off`},
  {id: 2, text: `Like you can't believe`}
];

update(id, text) {
  this.messages = this.messages.map(m =>
    m.id === id
      ? {id, text}
      : m
  )
}
```
