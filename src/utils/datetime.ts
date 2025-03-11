export function formatAMPM(dateParam?: Date): string {
	let date = dateParam ? dateParam : new Date();
	let hours = date.getHours();
	let minutes: string | number = date.getMinutes();
	// let seconds: string | number = date.getSeconds();
	let ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	// seconds = seconds < 10 ? '0'+seconds : seconds;
	// let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
	let strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}

export function formatWindowsDate(dateParam?: Date): string {
	let date = dateParam ? dateParam : new Date();
	// const language = navigator.language;
	// return date.toLocaleDateString(language);
	return date.toLocaleDateString('en');
}