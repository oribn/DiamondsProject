import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-diamondItem',
    templateUrl: './diamond-item.component.html',
    styleUrls: ['./diamond-item.component.css']
})
export class DiamondItemComponent {

    @Input() diamond = null;
    

}