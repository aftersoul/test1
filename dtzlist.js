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
	list="<li>[spoiler=FFF组【"+bdate+"—"+edate+"】]-- 楼 -- 当天顶帖 （） --【】\n</li><li>[b][color=#6666FF]星期一：\n</li><li>星期二：\n</li><li>星期三：\n</li><li>星期四：\n</li><li>星期五：\n</li><li>星期六：\n</li><li>星期日：\n</li><li>\n</li><li>【总结：】\n</li><li>[/color][/b]\n</li><li>[/spoiler]\n</li>";
}
resfield.innerHTML=list;
document.getElementById("res").style="display:inline";
