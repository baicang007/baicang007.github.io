let lcStg, lcStgRy, dragX, dragY, dragContent;
const KeyUp = 38;
const KeyDown = 40;
const KeyEnter = 13;

window.onload = function load() {
	lcStg = localStorage.text;
	if (lcStg == null || lcStg == "") {
		lcStg = "我的主页 C ./aboutMe.html";
		lcStg += ",百度 A https://www.baidu.com";
		lcStg += ",百度翻译 F https://fanyi.baidu.com/?aldtype=85#zh/en/";
		lcStg += ",哔哩哔哩 B https://www.bilibili.com";
		lcStg += ",GitHub H https://github.com,Linux L https://www.linux.org";
	}
	showBox();
	document.addEventListener("keyup", oneGetFocus);
	document.getElementById("schtx").addEventListener("keyup", schKeyDown);
	document.getElementById("one").addEventListener("keyup", oneKeyGo);
	document.getElementById("baidu").addEventListener("click", schClick);

	const boxs = document.getElementById("container");
	boxs.addEventListener("dragstart", (event) => {
		let draging = event.target;
		draging.style.opacity = "0.1";
		dragX = Number(draging.title);
		// console.log(typeof dragX);
	});
	boxs.addEventListener("dragend", (event) => {
		let draging = event.target;
		draging.style.opacity = "1";
	});
};

function showBox() {
	const container = document.getElementById("container");
	while (container.hasChildNodes()) {
		container.removeChild(container.lastChild);
	}
	lcStgRy = lcStg.split(",");
	let k, box, boxImg, Img, p;
	for (let i in lcStgRy) {
		k = lcStgRy[i].split(" ");
		box = document.createElement("div");
		boxImg = document.createElement("div");
		Img = document.createElement("img");
		p = document.createElement("p");
		box.className = "box";
		boxImg.className = "img";
		boxImg.title = k[2];
		boxImg.addEventListener("click", boxClk);
		Img.src = "images/" + k[1] + ".png";
		Img.title = i.toString();
		Img.draggable = "true";
		Img.addEventListener("dragover", drover);
		Img.addEventListener("drop", droped);
		p.innerText = k[0];
		container.appendChild(box);
		box.appendChild(boxImg);
		boxImg.appendChild(Img);
		box.appendChild(p);
	}
}

function boxClk() {
	window.open(this.title, "_self");
}

function oneKeyGo(event) {
	const keynum = window.event ? event.keyCode : event.which;
	const keychar = String.fromCharCode(keynum);
	for (let i in lcStgRy) {
		const k = lcStgRy[i].split(" ");
		if (keychar == k[1]) {
			window.open(k[2], "_self");
			break;
		}
	}
}

function schKeyDown(event) {
	let keynum = window.event ? event.keyCode : event.which;
	if (keynum == KeyEnter) {
		schClick(KeyEnter);
	}
	//40=key down
	if (keynum == KeyDown) {
		schClick(KeyDown);
	}
	//38=key up
	if (keynum == KeyUp) {
		schClick(KeyUp);
	}
}

function schClick(x) {
	let str = document.getElementById("schtx").value.trim();
	if (str == "") {
		str = "./resume.html";
		window.open(str);
		//alert("你不能搜索空气---啊!");
	} else {
		switch (x) {
			case KeyEnter: //Search within bidu
				str = "https://www.baidu.com/s?q1=" + str;
				window.open(str);
				break;
			case KeyUp:
				delClk();
				break;
			case KeyDown:
				addClk();
				break;
			default:
				str = "https://www.baidu.com/s?wd=" + str;
				window.open(str);
				break;
		}
	}
}

function addClk() {
	let str = document.getElementById("schtx").value;
	if (str) {
		let space = str.split(" ");
		if (space.length == 3) {
			str = lcStg + "," + str;
			localStorage.text = lcStg = str;
			document.getElementById("schtx").value = "";
			showBox();
			document.getElementById("schtx").focus();
		}
	}
}

function delClk() {
	const str = document.getElementById("schtx").value;
	if (str) {
		for (let i in lcStgRy) {
			if (lcStgRy[i].search(str) != -1) {
				lcStgRy.splice(i, 1);
				localStorage.text = lcStg = lcStgRy.join(",");
				document.getElementById("schtx").value = "";
				showBox();
				document.getElementById("schtx").focus();
				break;
			}
		}
	}
}

function oneGetFocus(event) {
	//keycode 27=Esc
	if (event.keyCode == 27) {
		document.getElementById("one").focus();
	}
}

function droped(event) {
	if (dragX != dragY) {
		dragY = Number(this.title);
		dragContent = lcStgRy[dragX];
		lcStgRy[dragX] = lcStgRy[dragY];
		lcStgRy[dragY] = dragContent;
		localStorage.text = lcStg = lcStgRy.join(",");
		showBox();
	}
}

function drover(event) {
	event.preventDefault();
}
