/*
author : Sandhiya.A
since : 13/11/2024
description :Custom search component to search the data
*/
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { personCircle, search, timerOutline } from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';
import { CloseIconDirective } from '../close-icon.directive';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, CloseIconDirective],
})
export class SearchComponent implements OnInit {
  isSearchbarFocused = false;
  search = ['Name', 'Lead Id', 'Mobile Number'];
  currentPlaceholder: string = this.search[0];
  private index = 0;
  lastEntries: string[] = [];
  private intervalId: any;
  searchTerm: string = '';
  dividerShow: boolean = false;

  closeIconStyles = {
    position: 'absolute',
    top: '18px',
    right: '18px',
    'font-size': '1.5em',
    color: 'red',
  };
  @Output() inputFocused = new EventEmitter<any>();

  showCloseIcon:boolean = false;
  constructor(public renderer: Renderer2, private el: ElementRef) {
    console.log(`test component....`);
    addIcons({ personCircle, search, timerOutline });
  }

  ngOnInit() {
    this.slider();
  }

  /**
   * @author: Sandhiya A
   * @method:slider()
   * @description:creates a sliding up placeholder animation
   */
  slider() {
    this.currentPlaceholder = this.search[this.index];
    this.intervalId = setInterval(() => {
      this.index = (this.index + 1) % this.search.length;
      this.currentPlaceholder = this.search[this.index];
    }, 2500);
  }
  /**
   * @author: Sandhiya A
   * @method:ngOnDestroy()
   * @description:sliding placeholder animation by clearing the interval when the component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onClose(){
    this.searchTerm = '';
    this.isSearchbarFocused = false;
  }

  /**
   * @author: Sandhiya A
   * @method:  onSearchbarFocus()
   * @description:Handles the focus event for the search bar.
   */
  onSearchbarFocus() {
      this.isSearchbarFocused = true;
      let searchIcon: any = document.querySelector('.icon-end-input');
      searchIcon.style.right = '65px';
      this.dividerShow = true;
      this.showCloseIcon = true;
      this.inputFocused.emit(false);

  }

  focusOutFunction() {
    console.log(this.searchTerm, 'shdsjd');
    this.isSearchbarFocused = false;
    if (this.searchTerm && this.searchTerm !== '') {
      this.isSearchbarFocused = true;
    }
    this.dividerShow = false;
    let searchIcon: any = document.querySelector('.icon-end-input');
    searchIcon.style.right = '16px';
    this.showCloseIcon= false;
  }

  /**
   * @author: Sandhiya A
   * @method:  onInpuChange()
   * @description:showing and hidding icons based on the input value
   */
  onInpuChange(event: any) {
    const inputValue = event.target.value;
    this.searchTerm = event.target.value;
    let searchIcon: any = document.querySelector('.icon-end-input');
    console.log(inputValue);
    if (inputValue.length < 1) {
      this.dividerShow = false;
      this.isSearchbarFocused = false;
      this.showCloseIcon= false;
      searchIcon.style.right = '16px';
    } else {
      searchIcon.style.right = '65px';
      this.isSearchbarFocused = true;
      this.dividerShow = true;
      this.showCloseIcon= true;
    }
  }

  /**
   * @author: Sandhiya A
   * @method:  onBlur()
   * @description:If input is empty isSearchbarFocused property to false.
   */
  onBlur(event: any) {
    console.group(event.target.value, 'ssssssss');
    if (!event.target.value) {
      this.isSearchbarFocused = false;
      this.inputFocused.emit(true);
    }
  }

  /**
   * @author: Sandhiya A
   * @method:  onSearch()
   * @description:Handle the search functionality
   */
  onSearch() {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      console.log(this.searchTerm);
      if (this.lastEntries.length >= 5) {
        this.lastEntries.pop();
      }
      this.lastEntries.unshift(this.searchTerm.trim());
    } else {
      console.log('Search term empty');
    }
    this.searchTerm = '';
    this.isSearchbarFocused=false;
    // this.focusOutFunction();
  }

  /**
   * @author: Sandhiya A
   * @method:  autoPopulate()
   * @description:Search lastEntries and autopopulate input value
   */
  autoPopulate(index: any) {
    this.searchTerm = this.lastEntries[index];
    const input = document.querySelector('input');
    if (input) {
      input.value = this.lastEntries[index];
      console.log(input.value);
      input.focus();
      this.dividerShow = true;
      let searchIcon: any = document.querySelector('.icon-end-input');
      searchIcon.style.right = '65px';
    }
  }
}
