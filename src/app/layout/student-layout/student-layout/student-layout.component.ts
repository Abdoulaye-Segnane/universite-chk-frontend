import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-student-layout',
  imports: [CommonModule, RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.css'
})
export class StudentLayoutComponent {
  // This component serves as a layout for the student section of the application.
  // It includes a navbar and a footer, and uses Angular's RouterOutlet to display child routes.
  // The CommonModule is imported to provide common directives like ngIf and ngFor.
  // The FooterComponent and NavbarComponent are imported to be used in the template.
  // The RouterOutlet is used to load the appropriate component based on the current route.
}
