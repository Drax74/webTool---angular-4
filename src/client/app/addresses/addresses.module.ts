import { NgModule } from '@angular/core';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { AddressesComponent } from './addresses.component';
import { AddressesRoutingModule } from './addresses-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddressesListService } from '../shared/addresses/addresses-list.service';

@NgModule({
  imports: [AddressesRoutingModule, SharedModule, Ng2DragDropModule],
  declarations: [AddressesComponent],
  exports: [AddressesComponent],
  providers: [AddressesListService]
})
export class AddressesModule { }
