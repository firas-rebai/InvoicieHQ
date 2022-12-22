import {Component, OnInit, ViewChild} from '@angular/core';
import {ClientService} from "../_services/client.service";
import {Router} from "@angular/router";
import {Client} from "../_models/Client";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit{

  clients: MatTableDataSource<Client>;

  displayedColumns: string[] = ['ID', 'raison', 'email', 'adresse', 'assujetti', 'fax', 'telephone'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.clients.paginator = this.paginator;
  }
  constructor(private clientService: ClientService, private router: Router) {
  }

  public getClients(): void {
    this.clientService.getClients().subscribe(
      (response: Client[]) => {
        this.clients = new MatTableDataSource<Client>(response);
      }, (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  ngOnInit(): void {
    this.getClients();
  }

}
