const { Project } = require('../models/Project.model')

module.exports.list = (request, response) => {
    Project.find({}).sort({"dueDate": -1})
    // get list ordered ordered by due date 
    .then(projects => {
        response.json(projects);
    })
    .catch(err=>{
        response.status(400).json(err);
    })
}

module.exports.create = (request, response) =>{
    const {project, dueDate} = request.body;
    Project.create({
        project, 
        dueDate
    })
        .then(project => {
            response.json(project)
        })
        .catch(err=>{
            response.status(400).json(err)
        })
}   

module.exports.detail = (request, response) => {
    const {id}= request.params;
    Project.findOne({_id:id})
    .then(project => {
        response.json(project)
    })
    .catch(err => {
        response.status(400).json(err)
    })
}

module.exports.update = (request, response) => {
    const { id } = request.params;
    const {project, dueDate, backlog, inProgress, completed} = request.body;
    Project.findOneAndUpdate({_id: id},{
        project,
        dueDate,
        backlog,
        inProgress,
        completed
    },
        {
            new:true,
            useFundAndModify: true
        })
        .then(project =>{
            response.json(project)
        })
        .catch(err => {
            response.status(400).json(err)
        })
}
module.exports.delete = (request, response) => {
    const {id} = request.params;
    Project.deleteOne({_id:id})
    .then(deleteConfirmation => {
        response.json(deleteConfirmation);
    })
    .catch(err=>{
        response.json(err)
    })
}