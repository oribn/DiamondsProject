import { Component, OnInit } from '@angular/core';
import { DiamondsService } from '../diamonds.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Diamond } from '../../objectModels/diamond.model';

@Component({
    selector: 'app-diamond-edit',
    templateUrl: './diamonds-edit.component.html',
    styleUrls: ['./diamonds-edit.component.css']
})
export class DiamondsEditComponent  implements OnInit{

    constructor( private diamondsService: DiamondsService){}
    
    serachForm: FormGroup;
    

    ngOnInit() {
        
        this.initForm();

    }

    

    private initForm() {

        let id = '';
        let diamondID = '';
        let shape = '';
        let weight = '';
        let color = '';
        let Clarity = '';
        let date = '';
        let pricePerCarat = '';
        let priceList = '';
        
        this.serachForm = new FormGroup({
            'id': new FormControl(id, Validators.required),
            'diamondID': new FormControl(diamondID, Validators.required),
            'shape': new FormControl(shape, Validators.required),
            'weight': new FormControl(weight, Validators.required),
            'color': new FormControl(color, Validators.required),
            'Clarity': new FormControl(Clarity, Validators.required),
            'date': new FormControl(date),
            'pricePerCarat': new FormControl(pricePerCarat, Validators.required),
            'priceList': new FormControl(priceList, Validators.required),
        });


    }


    onSubmit()
    {
        var date=new Date(this.serachForm.value['date']);
        const diamond = new Diamond(
            this.serachForm.value['id'],
            this.serachForm.value['diamondID'],
            this.serachForm.value['shape'],
            this.serachForm.value['weight'],
            this.serachForm.value['color'],
            this.serachForm.value['Clarity'],
            date.toISOString(),
            this.serachForm.value['pricePerCarat'],
            this.serachForm.value['priceList'],            
        );

        this.diamondsService.addDiamond(diamond)
            .subscribe(
                data => {
                    this.serachForm.reset();                    
                    alert("Add diamond success!");
                },
                error => console.log(error)
            );
    }

    





}