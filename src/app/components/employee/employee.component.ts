import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  showSuccess(message) {
    this.toastr.info(message);
  }
  resetForm(form: NgForm) {
    form.reset();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      res => {
        console.log(this.employeeService.employees = res);
      },
      err => console.log(err)
    );
  }

  addEmployee(form: NgForm) {
    if (form.value._id) {
      this.employeeService.putEmployee(form.value).subscribe(
        (res) => {
          this.getEmployees();
          form.reset();
          this.showSuccess('Employee Edit!');
        },
        (err) => console.log(err)
      );
    } else {
      this.employeeService.createEmployee(form.value).subscribe(
        res => {
          this.getEmployees();
          form.reset();
          console.log(res);
          this.showSuccess('Employee Created');

        },
        err => console.error(err)
      );
    }
  }

  deleteEmployee(id: string) {
    const res = confirm('Are you sure you want to delete this employee?');
    if (res) {
      this.employeeService.deleteEmployee(id)
        .subscribe((res) => { 
          this.getEmployees(); 
          this.showSuccess('Employee Deleted');
          err => console.error(err) });
    }
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
  }
}
