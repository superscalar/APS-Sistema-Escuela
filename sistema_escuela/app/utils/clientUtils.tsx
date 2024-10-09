'use client';
export function disableAfterOneClick(event: any) {
	console.log("disableAfterOneClick:", event.target);
	if ( event.currentTarget.classList.contains("disabled")) {
		event.preventDefault();
	} else {
		event.currentTarget.classList.add("disabled");
	}
}