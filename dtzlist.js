var mySelect=document.getElementById("gro");
var tsk=mySelect.options[mySelect.selectedIndex].value;
var node=document.getElementById("postmessage_48534402").firstChild;
var found=false;
var bdate=document.getElementById("begin").value;
var edate=document.getElementById("end").value;
var resfield=document.getElementById("res").firstElementChild.firstElementChild.firstElementChild;
while(node!==null){
	if(node.tagName==="FONT" && node.innerText.indexOf(tsk)>=0){
		found=true;
		break;
	}
	node=node.nextElementSibling;
}
if(found){
	var sig=false;
	var stp=false;
	var week=new Array("<li>[b][color=#6666FF]星期一：","<li>星期二：","<li>星期三：","<li>星期四：","<li>星期五：","<li>星期六：","<li>星期日：");
	var ind=-1;
	list="<li>[spoiler=FFF组【"+bdate+"—"+edate+"】]\n</li>";
	node=node.nextElementSibling;
	while(node!==null&&node.tagName!=="FONT"){
		stp=false;
		switch(node.tagName){
			case undefined:
				sig=true;
				break;
			case "STRONG":
				if(node.innerText.indexOf("星期")>=0)
					ind+=1;
				sig=false;
				break;
			case "A":
				if(sig){
					week[ind]+="、[url="+node.href+"]"+node.innerText+"[/url]--（/）楼 --【】\n</li>";
					stp=true;
					sig=false;
					break;
				}
				else{
					week[ind]+="[url="+node.href+"]"+node.innerText+"[/url]";
					sig=true;
				}
				break;
			case "BR":
				if(sig){
					week[ind]+="--（）楼 --【】\n</li>";
					stp=true;
				}
				sig=false;
				break;
			default:
				break;
		}
		if(stp&&ind===6){
			break;
		}
		node=node.nextElementSibling;
	}
	for(i=0;i!==7;i++){
		list+=week[i];
	}
	list+="<li>\n</li><li>【总结：】\n</li><li>[/color][/b]\n</li><li>[/spoiler]\n</li>";
}
else{
	node=document.getElementById("postmessage_48534402").firstElementChild;
	while (node.tagName!=="HR"){
		node=node.nextElementSibling;
	}
	list=""
	var sig1=false
	var sig2=false
	while(node!==null){
		switch(node.tagName){
			case "HR":
				sig1=true;
				break;
			case "FONT":
				if(sig1){
					if(list.length)
						list=list+"\n</li>";
					else if(bdate.length)
						list+="<li>"+bdate+"\n</li>";
					list=list+"<li>"+node.innerText+":";
					sig2=true;
				}
				sig1=false;
				break;
			case "STRONG":	
				if(node.innerText.indexOf("星期")>=0){
					if(sig2)
						sig2=false;
					else
						list+=";"
				}
				else if(node.children[0].tagName=="A"){
					list+=node.children[0].href.match(/\d+/)[0]+" "
				}
				break;
			case "A":
				list+=node.href.match(/\d+/)[0]+" "
				break;
			default:
				break;
		}
		node=node.nextElementSibling;
	}
	list=list+"\n</li>";
	list=list.replace(/[\s]+:/g,":").replace(/[\s]+;/g,";")
}
resfield.innerHTML=list;
document.getElementById("res").style="display:inline";
