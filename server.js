const express=require("express");
var app=express();
var firebase=require("firebase");
var bodyParser=require("body-parser");
var CryptoJS = require("crypto-js");
var refactoring=require("./refactoring.js");
var moment=require('moment');

app.use(bodyParser.urlencoded({extended:true}));

var favicon = require('serve-favicon');
var path = require('path');
const http = require('http');
var cors=require('cors');

//app.set('view engine','hbs');
app.use(express.static(__dirname +'/public'));
app.use(cors());
app.use(favicon(path.join(__dirname, '/public', 'favicon.ico')));

// firebase.initializeApp({
// 	serviceAccount:"./dummy-3538d-firebase-adminsdk-nta1a-f74d968f67.json",
// 	databaseURL:"https://dummy-3538d.firebaseio.com"
// });


var firebase = require("firebase-admin");

//var serviceAccount = require("./dummyfountain-88e720e735ec.json");

// firebase.initializeApp({
//   credential: firebase.credential.cert(serviceAccount),
//   databaseURL: "https://dummyfountain.firebaseio.com/"
// });

firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: 'dummyfountain',
    clientEmail: 'biplav@dummyfountain.iam.gserviceaccount.com',
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDfC299kJ+hVjAW\naUYHTVN31MiF3cyX9snjVrWSUlnVxTK4j/W6qlyxNz+5LJcouQ5GYGjNMpjUgUnG\nO541MM0M1LR0TArG0qRcK33LoIH0iRZHAdpLLZTFQEMTel2y76UcoEvFlx1AFiAF\np+q8h3TDDMV4wYEm1pTlUkje/gmjP1nET3KLsrznuRaxaw6AGJQHokbFdCYIgExr\nZMKbC/rutaNkhbcrP4jsNN2Bfi0oigxREAlRDs4D1TiAHjq/+ofBjbJKqQ2UsKEl\nNGNul/wgTEQAf5uHsPokLlYW356+jxsLH2dnq5wxWDjsuRT8CxoudOPNrqdwmcpi\nf+TP4ef7AgMBAAECggEAHZGbsqw+aqTilB4EVsnQA8YAMrWllAx3VZL0WD+1lsrh\nP1QfvKLYI0rn65Rh561SG09YUBe3Pg4eadAT2F5YrgJGzVdwDaKgKnM+O9qn+nNF\nXPLTGH35nTAN6beiU1XvcCeUqU8FZYO+tAaU7nBmBh5GfDc++BdLaZ6qeBwlH/Bx\n1wm9JKoki+AXop4jP4zZF/COHQHK4iwpwv9G7Cy/FCG/rxfgXpL8BoejkT6M2kzS\nZYXkLPUNlEw4ayNPjH1qmE2Exdtr02BV4koAwpnaWF8K32WxJCuz+VjfKXKfhU1Z\npMThKFjg8wuPEKyX5dXLs5WEc6myGom1PtufzqhWsQKBgQD2+KIPTeBPfAHeKRGl\n2nYLquLw2hEMHanHbheRYuYzFwPUVVPI/walq3FMQ5ewiFxtHLboRLqjbKNHxtKd\nK6Y1ddpsgxl0HSe9W8OpQ2q7+l+cND5osHUjkJaqeP5pm3upeWIWujgymk1KXCqB\n+SyzZi2VD1x4h+QutjMZHLKtCwKBgQDnMuCeID68Yy0uIUvBamvhR8D9MUlhloQ8\nB0tHhWfb7ABUYoz/w9hwkYYON7lQRR7D+1lHx6mvAKXPuMwq3KSwzylc1HxQXUqD\nhldZ5vnQwe6fWRZf3OuUgP6aOkdERku4Gxn4nRYvZKviGU+TP8DTtuR3CDI4Xs6m\ndJb4Stkm0QKBgEXKjUF16GWNzZlSUcJksecqK2eUuCyMVWYeHlrfb94QKuzeEAdE\nykQW5rV+hGdGoZfT/Xw1r+hu0tV9whbYNuf0nfz8Lz043/oK7IfwnUDxyAMEYH6F\nHxUlzu3tszd00MVbn/R8O1VRdXYGBZ0lJRStU0RESwVkoX7xzg7SpUtxAoGAN/X5\npmyZotHCotLOWl+fAyVyEhb28xcSpNEDKKmizPmfzs0X4eSOpBilQRW91i8U1k0l\nfBlY+hIHEHNjf9BuUJmkImMQQAeEvLcst4cP2rbGQm2227dGkmhyt/P5Qg5dz49H\nxwSG1Svh6tVDjJm228f+Hs2uEjTogiPgUvMTArECgYBZ96/F1Pm6zQdWbcA9uN4Q\ndv9AQuQo9EZEnSSvSu0WGMyFx9cjvK2wh5ewWU9HXdnAdDjfl1XlrtZ6WYMwfNJM\nolZlrSGVqD8SozT4OZmttUDAVTiboBsGkYtzQa05y1fnPSGbgNfx1EpbMtWoCQ87\nAaF35XF+tBfRJCbJNJpufA==\n-----END PRIVATE KEY-----\n'
  }),
  databaseURL: 'https://dummyfountain.firebaseio.com'
});


//code for writing data to the database
var ref=firebase.database().ref('users');
var data=[];

ref.once('value')
	.then(function(snap){
		data=snap.val();
	})

var ref=firebase.database().ref('deviceAccount');
var data1=[];
ref.once('value')
	.then(function(snap){
		data1=(snap.val());		
	})

var ref=firebase.database().ref('device');
var data2=[];
ref.once('value')
	.then(function(snap){
		data2=(snap.val());
})

app.get("/",function(req,res){
	res.send("Welcome to Haws Fountain API!!! <br><br> <br> <br> <br>  Copyright @Hawsco");
});


app.get("/allData",function(req,res){
	res.send({data,data1,data2});
});

app.get("/bad",function(req,res){
	res.send({
		name:'Error Message'
	});
});

app.get("/details/rfid/:rfid",function(req,res){
	var option=0;	//option=1 indicates summary , 0 indicates details
	var returned=refactoring.rfidCalculation(req,data2,option);
	res.send(returned);
});

app.get("/details/rfid/:rfid/:days",function(req,res){
	var reqRfid=req.params.rfid;
	var reqDate=req.params.days;
	var option=0;
	var regexRfid=RegExp('([a-zA-Z0-9]{8}$)');
	//console.log(reqRfid.length);
	//console.log("regexRfid.test(reqRfid)=" + regexRfid.test(reqRfid));
	if((regexRfid.test(reqRfid)==true && reqRfid.length===8) || reqRfid==='000000'){
		var allMatchingLog=[];
		var totalConsumption=0;
		var totalLogs=0;
		Object.keys(data2["MPRlog"]).forEach(function(key){
			var tempRfid=data2["MPRlog"][key]["rfid"];
			if(tempRfid===reqRfid)
			{
				allMatchingLog.push(data2["MPRlog"][key]);
				var tempVal= (Number(data2["MPRlog"][key]["flow"]));
				totalConsumption=totalConsumption+tempVal;
     			totalLogs=Number(totalLogs)+1;
			}
		});
		//find out the total number of days of data available for this user		
		//var sinceDays=calculateDays(allMatchingLog);
		//console.log(sinceDays);
		//var uniqueDays=calculateActualDays(allMatchingLog);
		var tempMatchingLog=[];
		var now=moment(new Date());
		var totalLogs=0;
		var totalConsumption=0;
		allMatchingLog.forEach(function(log){
			var logDate=log.timestamp;
			var duration=moment.duration(now.diff(logDate));
			//console.log('duration:',duration.asDays());
			if(duration.asDays()<=reqDate){
				var tempVal= (Number(log.flow));
				tempMatchingLog.push(log);
				totalLogs++;
				totalConsumption+=tempVal;
			}
		}); 
		var logData={
			'totalLogs':totalLogs,
			'totalConsumption':totalConsumption
			//'totalDaysSinceFirstDispense':sinceDays,
			//'uniqueDays':uniqueDays
		};
		if(option===1){
			allMatchingLog.push(logData);
			res.send(logData);
		}else
		{
			res.send(tempMatchingLog);
		}
		
	}else{
		return ("Invalid Rfid tag. Please re-check your rfid. It must have 8 alphanumeric characters!!!");
	}
});


app.get("/summary/rfid/:rfid",function(req,res){
	var option=1;	//option=1 indicates summary , 0 indicates details
	var returned=refactoring.rfidCalculation(req,data2,option);
	res.send(returned);
});

app.get("/summary/rfid/:rfid/:days",function(req,res){
	var reqRfid=req.params.rfid;
	var reqDate=req.params.days;
	var option=1;
	var regexRfid=RegExp('([a-zA-Z0-9]{8}$)');
	//console.log(reqRfid.length);
	//console.log("regexRfid.test(reqRfid)=" + regexRfid.test(reqRfid));
	if((regexRfid.test(reqRfid)==true && reqRfid.length===8) || reqRfid==='000000'){
		var allMatchingLog=[];
		var totalConsumption=0;
		var totalLogs=0;
		Object.keys(data2["MPRlog"]).forEach(function(key){
			var tempRfid=data2["MPRlog"][key]["rfid"];
			if(tempRfid===reqRfid)
			{
				allMatchingLog.push(data2["MPRlog"][key]);
				var tempVal= (Number(data2["MPRlog"][key]["flow"]));
				totalConsumption=totalConsumption+tempVal;
     			totalLogs=Number(totalLogs)+1;
			}
		});
		//find out the total number of days of data available for this user
		
		//var sinceDays=calculateDays(allMatchingLog);
		//console.log(sinceDays);

		//var uniqueDays=calculateActualDays(allMatchingLog);
		var tempMatchingLog=[];
		var now=moment(new Date());
		var totalLogs=0;
		var totalConsumption=0;
		allMatchingLog.forEach(function(log){
			var logDate=log.timestamp;
			var duration=moment.duration(now.diff(logDate));
			//console.log('duration:',duration.asDays());
			if(duration.asDays()<=reqDate){
				var tempVal= (Number(log.flow));
				tempMatchingLog.push(log);
				totalLogs++;
				totalConsumption+=tempVal;
			}
		}); 
		var logData={
			'totalLogs':totalLogs,
			'totalConsumption':totalConsumption
			//'totalDaysSinceFirstDispense':sinceDays,
			//'uniqueDays':uniqueDays
		};
		if(option===1){
			allMatchingLog.push(logData);
			res.send(logData);
		}else
		{
			res.send(allMatchingLog);
		}
		
	}else{
		return ("Invalid Rfid tag. Please re-check your rfid. It must have 8 alphanumeric characters!!!");
	}
});


app.get("/details/email/:emailId",function(req,res){
	var option=0;	//option=1 indicates summary , 0 indicates details
	var returned=refactoring.emailCalculation(req,data,data2,option);
	res.send(returned);
});

app.get("/summary/email/:emailId",function(req,res){
	var option=1;	//option=1 indicates summary , 0 indicates details
	var returned=refactoring.emailCalculation(req,data,data2,option);
	res.send(returned);
});

app.get("/details/email/:emailId/:days",function(req,res){
	var reqEmailId=req.params.emailId;
	var reqDate=req.params.days;
	var regexEmail=RegExp('([a-z0-9][-a-z0-9_\+\.]*[a-z0-9])@([a-z0-9][-a-z0-9\.]*[a-z0-9]\.(arpa|root|aero|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|([0-9]{1,3}\.{3}[0-9]{1,3}))');
	var totalConsumption=0;
	var totalLogs=0;
	if(regexEmail.test(reqEmailId)){
		var matchingLog=[];
		//first make an array of all logs of the email
		Object.keys(data).forEach(function(key){
		if(data[key].email===reqEmailId){
				matchingLog.push(data[key]);				
			}
		});
		//console.log(matchingLog[0]);
		var reqRfid=matchingLog[0].rfid;
		//console.log('reqRfid= ',reqRfid);
		var allMatchingLog=[];

		//now, start to find all logs by comparing that RFID to the logs, since logs don't have email info
		Object.keys(data2["MPRlog"]).forEach(function(key){
			var tempRfid=data2["MPRlog"][key]["rfid"];
			//console.log('tempRfid= ',tempRfid);
			if(tempRfid===reqRfid)
			{
				allMatchingLog.push(data2["MPRlog"][key]);
				totalLogs++;
				var tempVal= (Number(data2["MPRlog"][key]["flow"]));
				totalConsumption+=tempVal;
			}
		});
		//res.send(allMatchingLog);

	var tempMatchingLog=[];
	var now=moment(new Date());
	var totalLogs=0;
	var totalConsumption=0;
	allMatchingLog.forEach(function(log){
		var logDate=log.timestamp;
		var duration=moment.duration(now.diff(logDate));
		//console.log('duration:',duration.asDays());
		if(duration.asDays()<=reqDate){
			//var tempVal= (Number(data2["MPRlog"][key]["flow"]));
			tempMatchingLog.push(log);
			totalLogs++;
			//totalConsumption+=tempVal;
		}
		
	});
	res.send(tempMatchingLog);
	}
});

app.get("/summary/email/:emailId/:days",function(req,res){
	var reqEmailId=req.params.emailId;
	var reqDate=req.params.days;
	var regexEmail=RegExp('([a-z0-9][-a-z0-9_\+\.]*[a-z0-9])@([a-z0-9][-a-z0-9\.]*[a-z0-9]\.(arpa|root|aero|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|([0-9]{1,3}\.{3}[0-9]{1,3}))');
	var totalConsumption=0;
	var totalLogs=0;
	if(regexEmail.test(reqEmailId)){
		var matchingLog=[];
		//first make an array of all logs of the email
		Object.keys(data).forEach(function(key){
		if(data[key].email===reqEmailId){
				matchingLog.push(data[key]);				
			}
		});
		//console.log(matchingLog[0]);
		var reqRfid=matchingLog[0].rfid;
		//console.log('reqRfid= ',reqRfid);
		var allMatchingLog=[];

		//now, start to find all logs by comparing that RFID to the logs, since logs don't have email info
		Object.keys(data2["MPRlog"]).forEach(function(key){
			var tempRfid=data2["MPRlog"][key]["rfid"];
			//console.log('tempRfid= ',tempRfid);
			if(tempRfid===reqRfid)
			{
				allMatchingLog.push(data2["MPRlog"][key]);
				totalLogs++;
				var tempVal= (Number(data2["MPRlog"][key]["flow"]));
				totalConsumption+=tempVal;
			}
		});
		//res.send(allMatchingLog);

	var tempMatchingLog=[];
	var now=moment(new Date());
	var totalLogs=0;
	var totalConsumption=0;
	allMatchingLog.forEach(function(log){
		var logDate=log.timestamp;
		var duration=moment.duration(now.diff(logDate));
		//console.log('duration:',duration.asDays());
		if(duration.asDays()<=reqDate){
			var tempVal= (Number(log.flow));
			tempMatchingLog.push(log);
			totalLogs++;
			totalConsumption+=tempVal;
		}
		
	});
	res.send({
		'totalLogs':totalLogs,
		'totalConsumption':totalConsumption
	});
	}
});

app.get("/access/:key",function(req,res){
	
});


app.get("*",function(req,res){
	res.send("You are trying to reach an end point which doesn't exist!!! Please try again");
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));

module.exports = app;