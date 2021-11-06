import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BankdemoserviceService } from '../_services/bankdemoservice.service';
import { Customer } from 'src/_services/models/customer';
import { List } from 'linqts';
import { TransactionDto } from 'src/_services/models/transactionDto';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  transactionDto: TransactionDto={}
  transaction: any[]=[]
  transactionList: any[]=[]
  totalAmount: number=0;
  searchWord: string= ""
  customerDetails: Customer={
    balance: 0,
    name: ""
  }

  constructor(private bankService: BankdemoserviceService, private _changeDetector: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.getAllTransactions()
    this.getCustomer()
  }

  title = 'BankDemoProject';

  createTransaction(){
    debugger
    this.transactionDto.dateCreated = new Date
    this.bankService.createCustomerTransaction(this.transactionDto).subscribe(()=>{
      this.transactionDto = {}
      this.getAllTransactions()
      this.getCustomer()
    },(error)=>{
      console.log(error)
    })
  }

  getAllTransactions(){
    this.bankService.getAllTransactions().subscribe(res=>{
      this.transaction = res
      console.log(this.transaction)
      this.loadServices()      
    })
  }
  loadServices(){
        let matchedSearch: any[] = this.transaction.filter(
            a => a.recepient.toLowerCase().indexOf(this.searchWord.toLowerCase()) !== -1 
        );
        this.transactionList = new List<Customer>(matchedSearch).ToArray()
        this._changeDetector.detectChanges()
  }

  getCustomer(){
    this.bankService.getCustomer().subscribe(res=>{
      if(res!= null){
        this.customerDetails = res
        this.totalAmount = this.customerDetails.balance || 0
      }
    })
  }
}

  
