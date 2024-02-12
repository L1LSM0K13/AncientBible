"usestrict";

// Font Size and Type
const fontSizeElem = document.getElementById("fontSize");
const fontTypeElem = document.getElementById("fontType");
fontSizeElem.onchange = () => {
	const selectedValue = fontSizeElem.value;
	vContainer.style.fontSize = selectedValue;
};
fontTypeElem.onchange = () => {
	const selectedValue = fontTypeElem.value;
	vContainer.style.fontFamily = selectedValue;
};
