import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';
import { RestService } from "../../lib/rest-service";
import createLoopbackFilterObject from "../../lib/loopback-filter-factory";
import moment from "moment";

@inject(Router)
export class List {
<<<<<<< HEAD
    info = {};
    constructor(router) {
        this.service = new RestService("core", "assignments");
        this.router = router;
        this.getData();
        this.getInfo();
        this.waktu = 0.0;
    }
    getData() {
        this.service.get({ filter: { include: 'task', where:{status: 'open'} }  }).then(results => {
            this.data = results;
            console.log(this.data);
            var getTasks;
            for (var item of this.data) {
                var tasksService = new RestService("core", `/assignments/`);
                getTasks.push(tasksService.get());
            }

=======

    info = {};
    constructor(router) {
        this.service = new RestService("core", "assignments");
        this.router = router;
        this.getData();
        this.getInfo();
        this.waktu = 0.0;
    }
    getData() {
        this.service.get({ filter: { include: 'task', where:{status: 'open'} }  }).then(results => {
            this.data = results;
            console.log(this.data);
            var getTasks;
            for (var item of this.data) {
                var tasksService = new RestService("core", `/assignments/`);
                getTasks.push(tasksService.get());
            }

>>>>>>> 004d7b94575c92c1acb5491680dfb6e43b8b40e7
        })
        this.service.get({ filter: { include: 'task', where:{status: 'closed'} }  }).then(results => {
            this.dataClosed = results;
            console.log(this.dataClosed);
            var getTasks;
            for (var item of this.dataClosed) {
                var tasksService = new RestService("core", `/assignments/`);
                getTasks.push(tasksService.get());
            }

        })
    }

    async getInfo() {
        var serviceAssignment =  new RestService("core", "assignments");
        var serviceTask =  new RestService("core", "tasks");
        this.info.totAssignments = (await serviceAssignment.count()).count;
        this.info.totTasks = (await serviceTask.count()).count;
    }

    __view(id) {
        this.router.navigateToRoute('view', { id: id });
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    start(item) {
        if (this.currentItem)
            this.currentItem.isStart = false;

        item.isStart = true;
        item.isStop = true;
        this.currentItem = item;
        this.waktu = item.duration;

        for (var i in this.data) {
            var isHas = false
            if (this.data[i].id == item.id) {
                isHas = true;
            }
            if (isHas) {
                this.index = i;
                break;
            }
        }

        this.data[this.index].waktu = 0.0;
        this.interval2 = setInterval(() =>
            this.data[this.index].waktu = parseInt(this.data[this.index].waktu) + 1,
            1000);
        if (this.data[this.index].duration == null) {
            this.data[this.index].duration = 0;
            this.interval = setInterval(() =>
                this.data[this.index].duration = parseInt(this.data[this.index].duration) + 1,
                1000);

        } else {
            this.interval = setInterval(() =>
                this.data[this.index].duration = parseInt(this.data[this.index].duration) + 1,
                1000);
        }
        var assignment =
            {
                "elapsed": this.data[this.index].duration,
                "date": this.data[this.index].date,
                "budget": this.data[this.index].budget,
                "remark": this.data[this.index].remark,
                "status": this.data[this.index].status,
                "id": this.data[this.index].id,
                "accountId": this.data[this.index].accountId,
                "taskId": this.data[this.index].taskId,
                "iterationId": this.data[this.index].iterationId,
                "assignmentId": this.data[this.index].assignmentId,
                "duration": this.data[this.index].duration
            };
        var timerRecord =
            {
                "date": new Date(),
                "name": this.data[this.index].task.name,
                "duration": this.data[this.index].duration,
                "description": this.data[this.index].task.description,
                "remark": this.data[this.index].task.remark,
                "projectId": this.data[this.index].task.projectId,
                "assignmentId": this.data[this.index].task.id,
                "waktu": this.data[this.index].waktu,
            }
    }
    stop(item) {
        item.isStop = false;
        item.isStart = false;
        clearInterval(this.interval);
        clearInterval(this.interval2);
        this.data[this.index].status = 'closed';
        var assignment =
            {
                "elapsed": this.data[this.index].duration,
                "date": this.data[this.index].date,
                "budget": this.data[this.index].budget,
                "remark": this.data[this.index].remark,
                "status": this.data[this.index].status,
                "id": this.data[this.index].id,
                "accountId": this.data[this.index].accountId,
                "taskId": this.data[this.index].taskId,
                "iterationId": this.data[this.index].iterationId,
                "assignmentId": this.data[this.index].assignmentId,
                "duration": this.data[this.index].duration
            };
        var timerRecord =
            {
                "date": new Date(),
                "name": this.data[this.index].task.name,
                "duration": this.data[this.index].duration,
                "description": this.data[this.index].task.description,
                "remark": this.data[this.index].task.remark,
                "projectId": this.data[this.index].task.projectId,
                "assignmentId": this.data[this.index].task.id,
                "waktu": this.data[this.index].waktu,
            }

        delete this.interval;
        this.service.post(timerRecord, `assignments/${this.data[this.index].id}/timerecords`)
        this.service.put(this.data[this.index].id, assignment, `assignments/${this.data[this.index].id}`)
    }
    __goToView() {
        this.router.navigateToRoute('list');
    }

    pause(item) {
        item.isStop = false;
        item.isStart = false;
        clearInterval(this.interval);
        clearInterval(this.interval2);

        var assignment =
            {
                "elapsed": this.data[this.index].duration,
                "date": this.data[this.index].date,
                "budget": this.data[this.index].budget,
                "remark": this.data[this.index].remark,
                "status": this.data[this.index].status,
                "id": this.data[this.index].id,
                "accountId": this.data[this.index].accountId,
                "taskId": this.data[this.index].taskId,
                "iterationId": this.data[this.index].iterationId,
                "assignmentId": this.data[this.index].assignmentId,
                "duration": this.data[this.index].duration
            };
        var timerRecord =
            {
                "date": new Date(),
                "name": this.data[this.index].task.name,
                "duration": this.data[this.index].duration,
                "description": this.data[this.index].task.description,
                "remark": this.data[this.index].task.remark,
                "projectId": this.data[this.index].task.projectId,
                "assignmentId": this.data[this.index].task.id,
                "waktu": this.data[this.index].waktu,
            }

        delete this.interval;
        this.service.post(timerRecord, `assignments/${this.data[this.index].id}/timerecords`)
        this.service.put(this.data[this.index].id, assignment, `assignments/${this.data[this.index].id}`)
    }
}
 