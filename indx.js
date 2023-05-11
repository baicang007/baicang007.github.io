let lcStg, lcStgRy, shwTxt;

window.onload = function load() {
	lcStg = localStorage.text;
	if (lcStg == null) {
		lcStg = "我的主页 C https://baicang007.github.io";
		lcStg += ",百度 A https://www.baidu.com";
		lcStg += ",百度翻译 F https://fanyi.baidu.com/?aldtype=85#zh/en/";
		lcStg += ",哔哩哔哩 B https://www.bilibili.com";
		lcStg += ",GitHub H https://github.com,Linux L https://www.linux.org";
	}
	showTxt();
	document.addEventListener("keyup", oneGetFocus);
	document.getElementById("schtx").addEventListener("keyup", schKeyDown);
	document.getElementById("one").addEventListener("keyup", oneKeyGo);
	document.getElementById("add").addEventListener("click", addClk);
	document.getElementById("del").addEventListener("click", delClk);
	document.getElementById("baidu").addEventListener("click", schClick);
};

function showTxt() {
	const container = document.getElementById("container");
	while (container.hasChildNodes()) {
		container.removeChild(container.lastChild);
	}
	if (lcStg) {
		lcStgRy = lcStg.split(",");
		for (let i in lcStgRy) {
			const k = lcStgRy[i].split(" ");
			const box = document.createElement("div");
			const boxImg = document.createElement("div");
			const Img = document.createElement("img");
			const p = document.createElement("p");
			box.className = "box";
			boxImg.className = "img";
			boxImg.title = k[2];
			boxImg.addEventListener("click", boxClk);
			Img.src = "images/" + k[1] + ".png";
			p.innerText = k[0];
			container.appendChild(box);
			box.appendChild(boxImg);
			boxImg.appendChild(Img);
			box.appendChild(p);
		}
	}
}

function boxClk() {
	window.open(this.title, "_self");
}

function oneKeyGo(event) {
	const keynum = window.event ? event.keyCode : event.which;
	const keychar = String.fromCharCode(keynum);
	if (lcStg) {
		for (let i in lcStgRy) {
			const k = lcStgRy[i].split(" ");
			if (keychar == k[1]) {
				window.open(k[2], "_self");
				break;
			}
		}
	}
}

function schKeyDown(event) {
	const keynum = window.event ? event.keyCode : event.which;
	if (keynum == 13) {
		schClick(12);
	}
	if (keynum == 40) {
		schClick(1);
	}
	if (keynum == 38) {
		schClick();
	}
}

function schClick(x) {
	let str = document.getElementById("schtx").value;
	if (str == "") {
		alert("你不能搜索空气---啊!");
	} else {
		switch (x) {
			case 1: //Search within one month
				str = "https://www.baidu.com/s?q1=" + str;
				str = str + "&q2=&q3=&q4=&gpc=stf%3D1633445032.961%2C1636123432.961%7";
				str = str + "Cstftype%3D1&ft=&q5=&q6=&tn=baiduadv";
				break;
			case 12: //Search within one year
				str = "https://www.baidu.com/s?q1=" + str;
				str = str + "&q2=&q3=&q4=&gpc=stf%3D1604509977.288%2C1636045977.288%7";
				str = str + "Cstftype%3D1&ft=&q5=&q6=&tn=baiduadv";
				break;
			default:
				str = "https://www.baidu.com/s?wd=" + str;
				break;
		}
		window.open(str);
	}
}

function addClk() {
	let str = document.getElementById("addtx").value;
	if (str) {
		const space = str.split(" ");
		if (space.length == 3) {
			if (lcStg) {
				str = lcStg + "," + str;
			}
			localStorage.text = lcStg = str;
			document.getElementById("addtx").value = "";
			showTxt();
			document.getElementById("addtx").focus();
		}
	}
}

function delClk() {
	const str = document.getElementById("deltx").value;
	if (str) {
		if (lcStg) {
			for (let i in lcStgRy) {
				if (lcStgRy[i].search(str) != -1) {
					lcStgRy.splice(i, 1);
					localStorage.text = lcStg = lcStgRy.join(",");
					document.getElementById("deltx").value = "";
					showTxt();
					document.getElementById("deltx").focus();
					break;
				}
			}
		}
	}
}

function oneGetFocus(event) {
	if (event.keyCode == 27) {
		document.getElementById("one").focus();
	}
}
