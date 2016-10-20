var express=require('express');
var router=express.Router();
var mongojs=require('mongojs');
var db=mongojs( 'mongodb://diego:diego@ds051853.mlab.com:51853/mytasklist_diego',['tasks']);

//Get All Tasks
router.get('/tasks',function(req,res,next){
	db.tasks.find(function(err,tasks){
		if(err){
			res.send(err);
		}
		res.json(tasks);
	});
});

//Get Single Task

router.get('/tasks/:id',function(req,res,next){
	db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,task){
		if(err){
			res.send(err);
		}
		res.json(task);
	});
});

//Save Task

router.post('/task',function(req,res,next){
	var task=req.body;
	if(!task.title||!(task.isDone + '')){
		res.status(400);
		res.json({
			"error":"Bad data"
		});
	}else{
		db.tasks.save(task,function(err,task){
			if(err){
				res.send(err);
			}
			res.json(task);
		});
	}
});

//delete task
router.delete('/task/:id',function(req,res,next){
	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err,task){
		if(err){
			res.send(err);
		}
		res.json(task);
	});
});

//update task
router.put('/task/:id',function(req,res,next){
	var task=req.body;
	var updTask={};
	if(task.isDone){
		updTask.isDone=task.isDone;
	}
	if(task.title){
		updTask.title=task.title;
	}
	if(!updTask){
		res.status(400);
		res.json({
			"error":"Bad data"	
		});
	}else{
		db.tasks.update({_id:mongojs.ObjectId(req.params.id)},updTask,{},function(err,task){
		if(err){
			res.send(err);
		}
		res.json(task);
	});	
	}
	
});

module.exports=router;	