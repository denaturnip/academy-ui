import { bindable, inject } from "aurelia-framework";
import { RestService } from "../../../lib/rest-service";
import { Router } from 'aurelia-router';
import { Dialog } from '../../../au-components/dialog/dialog';
import parseLoopbackError from "../../../lib/loopback-error-parser";
import createLoopbackFilterObject from "../../../lib/loopback-filter-factory";
import moment from "moment";

export class assignments {

  @bindable assignmentsData;
  @bindable assignmentEfficiency;
<<<<<<< HEAD
  @bindable countAssignments;

  @bindable totalWorkTime;
  @bindable totalBudget;

  @bindable loadStat;
  @bindable dateRangeStat;

  @bindable startDate;
  @bindable endDate;
  
  @bindable closedElapsed;
  @bindable closedBudget;
  
  @bindable openElapsed;
  @bindable openBudget;
  
  
constructor() {
  this.countAssignments;
  this.efficiencyCount =0 ;
  this.data=[];
  this.loadStat = false;//showing the botton after table loaded
  this.dateRangeStat =false;//date range input for filter table

=======
  @bindable totalWorkTime;
  @bindable totalBudget;
  @bindable startDate;
  @bindable endDate;
  @bindable closedElapsed;
  @bindable closedBudget;
  @bindable openElapsed;
  @bindable openBudget;
  
constructor() {
  this.accountId;
  this.data=[];
>>>>>>> 004d7b94575c92c1acb5491680dfb6e43b8b40e7
  this.startDate;
  this.endDate;

  this.totalWorkTime;
  this.totalBudget;

  this.closedElapsed;
  this.closedBudget;
  
  this.openElapsed;
  this.openBudget;
}

  async activate(model) {
    this.data = model.datas;
      if(model.datas==null){
      }
      else{

<<<<<<< HEAD
        this.assignmentService = new RestService("core", `accounts/${model.datas.accountId}/assignments`); 
        this.assignmentsData = await this.assignmentService.get({filter: { include: "task"}});
        this.openAssignmentData = await this.assignmentService.get({filter: { include: "task"}});
=======
        this.accountId = model.datas.accountId;

        this.assignmentService = new RestService("core", `accounts/${model.datas.accountId}/assignments`); 
        this.assignmentsData = await this.assignmentService.get({filter: { include: "task",where: {status: 'closed'}}});
        this.openAssignmentData = await this.assignmentService.get({filter: { include: "task",where: {status: 'open'}}});
>>>>>>> 004d7b94575c92c1acb5491680dfb6e43b8b40e7

        this.projectService = new RestService("core",`reports/account/${model.datas.accountId}/project`)
        this.projectData = await this.projectService.get();

        this.countWorkTimeService = new RestService("core",`reports/account/${model.datas.accountId}/assignments/elapsed`)
        this.totalWorkTime = await this.countWorkTimeService.get();

        this.countBudgetTime = new RestService("core",`reports/account/${model.datas.accountId}/assignments/budget`)
        this.totalBudget = await this.countBudgetTime.get();

        this.efficiencyService = new RestService("core",`reports/account/${model.datas.accountId}/assignments/efficiency`)
        this.efficiencyData = await this.efficiencyService.get();

        this.refreshTables();

      }  
  }

  refreshTables(){
    this.openAssignmentTable.refresh();
    this.assignmentTable.refresh();
    this.projectsTable.refresh();
  }

  assignmentsColumns = [
    {
        field: "status",
        title: "Status"
    },
    {
      field: "task.name",
      title: "Task Name"
    },
    {
      field: "task.type",
      title: "Task Type"
    },  
    {
        field: "budget",
        title: "Budget Time"
    },
    {
        field: "elapsed",
        title: "Elapsed Time"
    },
    {
        field: "date", 
        title: "Date",
        formatter: function (value, row, index) {
        return value ? moment(value).format("DD-MMM-YYYY") : "-";}
    },
    {
        field: "remark",
        title: "Remark"
<<<<<<< HEAD
    }];

    __dateFormatter = function (value, row, index) {
    return value ? moment(value).format("DD-MMM-YYYY") : "-";
    };
=======
    }
  ];

  __dateFormatter = function (value, row, index) {
    return value ? moment(value).format("DD-MMM-YYYY") : "-";
  };
>>>>>>> 004d7b94575c92c1acb5491680dfb6e43b8b40e7

  assignmentLoader = (info) => {
    if(!this.assignmentsData) {
      return {
        data: []
      }
    }
    else {
    var fields = this.assignmentsColumns.map(col => {
      if (typeof col === "string")
        return col;
      else if (typeof col === "object" && col.field)
        return col.field;
    })
    var loopbackFilter = createLoopbackFilterObject(info, fields)
    return Promise
      .all([null,this.assignmentsData])
      .then(results => {
<<<<<<< HEAD

        var data;

        for(var r of results[1]){
          if(r.status == "closed")
          {
            data = results[1];
          } 
        }
=======
        var data= results[1];
        // for(var r of results[1]){
        //   if(r.status == "closed")
        //   {
        //      data.push(r);
        //   } 
        // }
>>>>>>> 004d7b94575c92c1acb5491680dfb6e43b8b40e7
        this.countClosedAssignmentsDetails(data);
        return {
          data: data
        };
      });
    }
  };

  //openAssignment
  assignmentLoaderOpen = (info) => {
    if(!this.openAssignmentData) {
      return {
        data: []
      }
    }
    else {
    var fields = this.assignmentsColumns.map(col => {
      if (typeof col === "string")
        return col;
      else if (typeof col === "object" && col.field)
        return col.field;
    })
    var loopbackFilter = createLoopbackFilterObject(info, fields)
    return Promise
      .all([null,this.openAssignmentData])
      .then(results => {
<<<<<<< HEAD
        var data;

        for(var r of results[1]){
          if(r.status == "open")
          {
            data = results[1];
          } 
        }
        this.countOpenAssignmentsDetails(data);
        if(this.loadStat==false) this.loadStat = 1; // mengisi variabel agar memunculkan button
        else this.loadStat = true;
=======
        var data = results[1];
        // for(var r of results[1]){
        //   if(r.status == "open")
        //   {
        //     data.push(r);
        //   } 
        // }
        this.countOpenAssignmentsDetails(data);
>>>>>>> 004d7b94575c92c1acb5491680dfb6e43b8b40e7
        return {
          data: data
        };
      });
    }
  };


  //project
  //column
   projectCollumns = [
    {
      field:"code",
      title:"Code"
    },
    {
      field:"name",
      title:"Project Name"
    },
    {
      field:"description",
      title:"Description"
    }];
    
  //loader
  projectsLoader = (info) => {
    if(!this.projectData) {
      return {
        data: []
      }
    }
    else {
    var fields = this.projectCollumns.map(col => {
      if (typeof col === "string")
        return col;
      else if (typeof col === "object" && col.field)
        return col.field;
    })
    var loopbackFilter = createLoopbackFilterObject(info, fields)
    return Promise
      .all([null,this.projectData])
      .then(results => {
        var data=results[1];
        return {
          data: data
        };
      });
    }
  };

<<<<<<< HEAD
  showDateRange(){
    this.loadStat = false;
    this.dateRangeStat = true;
  }

  async getAssignmentByDate(){

      this.assignmentService = new RestService("core", `reports/account/${this.data.accountId}/${this.startDate}/to/${this.endDate}/assignments`);     
=======

  async getAssignmentByDate(){

      this.assignmentService = new RestService("core", `reports/account/${this.data.accountId}/${this.startDate}/to/${this.endDate}/assignments/open`);     
>>>>>>> 004d7b94575c92c1acb5491680dfb6e43b8b40e7
      this.assignmentsData = await this.assignmentService.get();
      this.openAssignmentData = await this.assignmentService.get( );

      this.efficiencyService = new RestService("core", `reports/account/${this.data.accountId}/${this.startDate}/to/${this.endDate}/efficiency`);     
      this.efficiencyData = await this.efficiencyService.get();

      this.totalBudgetService = new RestService("core", `reports/account/${this.data.accountId}/${this.startDate}/to/${this.endDate}/assignments/budget`);     
      this.totalBudget = await this.totalBudgetService.get();

      this.elapsedTimeService = new RestService("core", `reports/account/${this.data.accountId}/${this.startDate}/to/${this.endDate}/assignments/elapsed`);     
      this.totalWorkTime = await this.elapsedTimeService.get();

      this.assignmentTable.refresh();
      this.openAssignmentTable.refresh();
<<<<<<< HEAD

=======
>>>>>>> 004d7b94575c92c1acb5491680dfb6e43b8b40e7
  }

  countClosedAssignmentsDetails(array){
    if(array!=null)
      {this.closedElapsed = array.reduce(function(last, d) {
                return d.elapsed + last;
            }, 0);
      this.closedBudget = array.reduce(function(last, d) {
                return d.budget + last;
            }, 0);     }     
  }

<<<<<<< HEAD
  countOpenAssignmentsDetails(array){

=======
  contextMenu = ["Detail"];

  __contextMenuCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Detail":
                this.__view(data.id);
                break;    
        }
    }

  __view(id) {
       // this.router.navigateToRoute('detail', { id: id });
      this.getAssignmentPerProject(id);
    }

  async getAssignmentPerProject(id){
    this.assignmentService = new RestService("core", `reports/account/${this.accountId}/${id}/assignments`);     
    this.assignmentsData = await this.assignmentService.get();
    this.openAssignmentData = await this.assignmentService.get();

    this.efficiencyService = new RestService("core", `reports/account/${this.accountId}/${id}/efficiency`);     
    this.efficiencyData = await this.efficiencyService.get();

    this.assignmentTable.refresh();
  }  

  countOpenAssignmentsDetails(array){
>>>>>>> 004d7b94575c92c1acb5491680dfb6e43b8b40e7
    if(array!=null){
      this.openElapsed = array.reduce(function(last, d) {
                return d.elapsed + last;
            }, 0);
      this.openBudget = array.reduce(function(last, d) {
                return d.budget + last;
            }, 0); 

    }
    }
}
