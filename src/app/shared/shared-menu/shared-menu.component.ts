import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-shared-menu',
  templateUrl: './shared-menu.component.html',
  styleUrls: ['./shared-menu.component.scss'],
})
export class SharedMenuComponent  implements OnInit {
  
  menu: boolean = true
  

  constructor() { }

  ngOnInit() {
    if(this.innerWidth() <= 1024){
      this.menu = false;
    }
  }

  verMenu(){
    this.menu = !this.menu 
  }
  innerWidth(): number{
    return window.innerWidth;
  }

}
