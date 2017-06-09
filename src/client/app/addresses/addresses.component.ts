import { Component, OnInit } from '@angular/core';
import { AddressesListService } from '../shared/addresses/addresses-list.service';

/**
 * This class represents the lazy loaded AddressComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-addresses',
  templateUrl: 'addresses.component.html',
  styleUrls: ['addresses.component.css'],
})
export class AddressesComponent implements OnInit {

  errorMessage: string;
  addresses: any[] = [];
  currentAddress: any = {};
  documents: any[] = [];
  documentsVisible: boolean = false;

  /**
   * Creates an instance of the AddressesComponent with the injected
   * AddressesListService.
   *
   * @param {AddressesListService} addressesListService - The injected AddressesListService.
   */
  constructor(public addressesListService: AddressesListService) {}

  /**
   * Get the addresses OnInit
   */
  ngOnInit() {
    this.getAddresses();
  }

  /**
   * Handle the addressesListService observable
   */
  getAddresses() {
    this.addressesListService.get()
      .subscribe(
        addresses => this.addresses = addresses,
        error => this.errorMessage = <any>error
      );
  }

  /**
   * Called on opening address or after dropping a document to a new address
   * @param {object} address - new address that was opened
   * @param {object} draggedDocument - optional parameter
   */
  select(address:any = {}, draggedDocument?:false) {

    // open and close documents on click of the address
    if (this.currentAddress != address || !this.documentsVisible) {
      this.documentsVisible = true;
    }
    else {
      this.documentsVisible = false;
    }

    this.currentAddress = address;

    this.addressesListService.getDocuments(address.Id)
      .subscribe( (documents) => {
        this.documents = documents;
        if (draggedDocument) {
          this.documents.push(draggedDocument);
        }
      });
  }

  /**
   * Handles dropped document
   * @param {object} e - event object
   * @param {object} address - address that the document was dropped to
   */
  onItemDrop(e: any, address:any = {}) {
    this.documents = [];
    var draggedDocument = e.dragData;

    //call the select method and pass the new address and the draggedDocument
    this.select(address, draggedDocument);

    /**
     * Call the fake service post method
     * @param {number} address.Id - the id of the new address to which the dragged document was dropped
     * @param {number} draggedDocument.Id - the id of the dragged document that was dropped to the new address
     */
    this.addressesListService.moveDocument(address.Id, draggedDocument.Id);
  }
}
