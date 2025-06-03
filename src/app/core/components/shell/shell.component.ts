import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-shell',
    imports: [HeaderComponent, RouterOutlet],
    templateUrl: './shell.component.html',
    styleUrl: './shell.component.css',
})
export default class ShellComponent {}
