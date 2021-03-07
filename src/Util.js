export function ToReadable(bytes) {
	var unit = "B";
	var divider = 1;
	if (bytes >= 1000000000000) {
		unit = "TB";
		divider = 1000000000000;
	} else if (bytes >= 1000000000) {
		unit = "GB";
		divider = 1000000000;
	} else if (bytes >= 1000000) {
		unit = "MB";
		divider = 1000000;
	} else if (bytes >= 1000) {
		unit = "KB";
		divider = 1000;
	}
	var readable = +(bytes / divider).toFixed(2);
	return `${readable} ${unit}`;
}
