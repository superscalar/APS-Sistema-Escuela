'use client';

export function disableAfterOneClick(event: any) {
	console.log("disableAfterOneClick:", event.target);
	if ( event.currentTarget.classList.contains("disabled")) {
		event.preventDefault();
	} else {
		event.currentTarget.classList.add("disabled");
		
		event.currentTarget.classList.add("bg-gray-300");
		event.currentTarget.classList.add("cursor-not-allowed");
		event.currentTarget.classList.add("text-white");
		event.currentTarget.classList.add("border-none");
	}
}