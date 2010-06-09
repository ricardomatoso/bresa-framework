/****************************************************************************
* Flash Tag Write Object v1.8 - by Lucas Fererira - www.lucasferreira.com   *
* Info and Usage: www.lucasferreira.com/flashtag                            *
* bugs/reports: contato@lucasferreira.com                                   *
****************************************************************************/

if(Browser == undefined)
{
	var Browser = {
		isIE: function(){ return (window.ActiveXObject && document.all && navigator.userAgent.toLowerCase().indexOf("msie") > -1  && navigator.userAgent.toLowerCase().indexOf("opera") == -1) ? true : false; }
	};
}

var Flash = function(movie, id, width, height, initParams)
{
	this.html = "";
	
	this.variables = new Array();
	
	this.flashversion = (typeof initParams != "undefined" && typeof initParams.flashversion != "undefined") ? initParams.flashversion : "7,0,0,0";
	
	this.attributes = {
		"classid": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"codebase": "http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version=" + this.flashversion,
		"type": "application/x-shockwave-flash"
	};
	
	this.params = { "pluginurl": "http://www.macromedia.com/go/getflashplayer" };
	
	if(movie)
	{
		this.addAttribute("data", movie);
		this.addParameter("movie", movie);
	}
	
	if(id && id != null && (this.id = id)) 
	{
		this.addAttribute("id", this.id);
		this.addAttribute("name", this.id);
	}
	else
	{
		this.id = null;
	}
	
	if(width) this.addAttribute("width", width);
	if(height) this.addAttribute("height", height);
	
	if(initParams != undefined)
	{
		for(var i in initParams) this.addParameter(i.toString(), initParams[i]);
	}
};
Flash.version = "v1.8";

Flash.prototype.getObject = function()
{
	if(this.id == null) return null;
	try
	{
		if(window.document[this.id])
		{
			return window.document[this.id];
		}
		else
		{
			return document.getElementById(window.document[this.id]);
		}
	}
	catch(e) { return null; }
};

Flash.getObjectByExceptions = function(obj, excep)
{
	var tempObj = {};
	for(var i in obj)
	{
		var EOF = false;
		for(var j=0; j<excep.length; j++) if(excep[j] == i.toString()) { EOF = true; break; };
		if(!EOF) tempObj[i] = obj[i];
	}
	return tempObj;
};

Flash.prototype.addAttribute = function(prop, val){ this.attributes[prop] = val; };
Flash.prototype.addParameter = function(prop, val){ this.params[prop] = val; };
Flash.prototype.addVariable = function(prop, val){ this.variables.push([prop, val]); };

Flash.prototype.getFlashVars = function()
{
	for(var i=0, tempString = new Array(); i<this.variables.length; i++) tempString.push(this.variables[i].join("="));
	return tempString.join("&");
};
Flash.prototype.toString = function()
{
	this.params.flashVars = this.getFlashVars();
	if(Browser.isIE())
	{
		//IE
		this.html = "<ob" + "ject";
		var attr = Flash.getObjectByExceptions(this.attributes, ["type", "data"]);
		for(var i in attr) if(i.toString() != "extend") this.html += " " + i.toString() + " = \"" + attr[i] + "\"";
		this.html += "> ";
		var params = Flash.getObjectByExceptions(this.params, ["pluginurl", "extend"]);
		for(var i in params) if(i.toString() != "extend") this.html += "<param name=\"" + i.toString() + "\" value=\"" + params[i] + "\" /> ";
		this.html += " </obj" + "ect>";
	}
	else
	{
		//non-IE
		this.html = "<!--[if !IE]> <--> <obj" + "ect";
		var attr = Flash.getObjectByExceptions(this.attributes, ["classid", "codebase"]);
		for(var i in attr) if(i.toString() != "extend") this.html += " " + i.toString() + " = \"" + attr[i] + "\"";
		this.html += "> ";
		var params = Flash.getObjectByExceptions(this.params, ["extend"]);
		for(var i in params) if(i.toString() != "extend") this.html += "<param name=\"" + i.toString() + "\" value=\"" + params[i] + "\" /> ";
		this.html += " </obj" + "ect> <!--> <![endif]-->";
	}
	return this.html;
};
Flash.prototype.write = Flash.prototype.writeIn = function(w)
{
	if(typeof w == "string" && (w = document.getElementById(w)));
	if( w != null ) { w.innerHTML = this.toString(); }
	else if( w == undefined ) { document.write( this.toString() ); }
    	else { return false; }
};

//automatization functions...
Flash.correctAll = function()
{
	if(!/msie/.test(navigator.userAgent.toLowerCase()) || !document.getElementsByTagName) return false;
	for (var i = 0, objects = document.getElementsByTagName("OBJECT"); i < objects.length;
		(objects[i].outerHTML ? (objects[i].outerHTML = objects[i].outerHTML, objects[i].style.visibility = "visible") : null), i++);
};
Flash.automatic = function(r)
{
	if(r && window.attachEvent)
	{	
		for (var i = 0, objects = document.getElementsByTagName("OBJECT"); i < objects.length; (objects[i].style.visibility = "hidden"), i++);
		window.attachEvent("onload", Flash.correctAll);
		window.attachEvent("onunload", function(){ window.detachEvent("onload", Flash.correctAll); });
	}
	else
	{
		Flash.correctAll();
	}
};


function killFloater(div) {
	var layer = document.getElementById(div);
	var father = layer.parentNode;
	father.removeChild(layer);
}



// JavaScript Document