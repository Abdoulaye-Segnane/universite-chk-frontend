import { Component } from '@angular/core';
import {MatCardModule } from '@angular/material/card';
import {MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-message',
  imports: [MatCardModule, MatCardModule, MatIconModule, CommonModule, RouterLink, MatButtonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {

}
