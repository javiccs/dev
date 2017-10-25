import { NgModule } from '@angular/core';
import { BalanceFormatPipe } from './balanceFormat.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { SafePipe } from './safe.pipe';
@NgModule({
	declarations: [BalanceFormatPipe,CapitalizePipe,SafePipe],
	imports: [],
	exports: [BalanceFormatPipe,CapitalizePipe,SafePipe]
})
export class PipesModule {}
