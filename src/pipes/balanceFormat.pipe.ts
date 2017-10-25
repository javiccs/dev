/**
 * Created by Javiccs on 5/11/17.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'balance'})
export class BalanceFormatPipe implements PipeTransform {
    transform(value: string, country: string): any {
        if (!value) return value;

        return("Bs. " + value.replace(/\B(?=(\d{3})+(?!\d))/g, "."))
    }
}
