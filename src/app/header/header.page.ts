import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchComponent } from '../search/search.component';
import { location } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
  standalone: true,
  imports:[CommonModule,FormsModule,IonicModule,SearchComponent],
})
export class HeaderPage {

  constructor() { 
    addIcons({
     location
    });

  }

  onInputFocusReceived(data: any) {
    console.log('Data from child on input focus:', data);
    if (data == false) {
      var headerDiv: any = document.getElementById('headerdiv');
      var searchDiv: any = document.getElementById('searchdiv');
      headerDiv.style.transition = 'top 700ms';
      searchDiv.style.transition = 'top 700ms';
      headerDiv.style.top = '-80px';
      searchDiv.style.top = '-80px';
    } else {
      var headerDiv: any = document.getElementById('headerdiv');
      var searchDiv: any = document.getElementById('searchdiv');
      headerDiv.style.transition = 'top 700ms';
      searchDiv.style.transition = 'top 700ms';
      headerDiv.style.top = '0px';
      searchDiv.style.top = '0px';
    }
  }
  

}
