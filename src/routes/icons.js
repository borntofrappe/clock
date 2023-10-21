const icons = {
	expand: `<svg width="1em" height="1em" viewBox="-10 -10 20 20">
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M 9.5 -9.5 3 -9.5 9 -9 9.5 -3 Z M 9.5 -9.5 -9.5 9.5 M -9.5 9.5 -3 9.5 -9 9 -9.5 3 Z" />
</svg>`,
	pause: `<svg width="1em" height="1em" viewBox="-10 -10 20 20">
    <path fill="currentColor" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d="M -6.5 -8 -4 -8 -4 8 -6.5 8 Z M 6.5 -8 4 -8 4 8 6.5 8 Z" />
</svg>`,
	reset: `<svg width="1em" height="1em" viewBox="-10 -10 20 20">
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M -6 -9.5 -9.5 -6 -6 -2.5 -9 -6 Z M -9.5 -6 L 2.5 -6 A 7 7 0 0 1 9.5 1 8.5 8.5 0 0 1 -7.5 1" />
</svg>`,
	restore: `<svg width="1em" height="1em" viewBox="-10 -10 20 20">
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M 9.5 -9.5 2 -2 2 -8 2.5 -2.5 8 -2 2 -2 M -9.5 9.5 -2 2 -8 2 -2.5 2.5 -2 8 -2 2" />
</svg>`,
	start: `<svg width="1em" height="1em" viewBox="-10 -10 20 20">
    <path fill="currentColor" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d="M -6.5 -8 7 0 -6.5 8 Z" />
</svg>`,
	sun: `<svg width="1em" height="1em" viewBox="-10 -10 20 20">
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 0 -5.25 A 5.25 5.25 0 0 0 0 5.25 5.25 5.25 0 0 0 0 -5.25" />
        <path id="ray-1" transform="translate(0 8)" d="M 0 0 V 1.5" /> 
        <use href="#ray-1" transform="rotate(90)" /> 
        <use href="#ray-1" transform="rotate(180)" /> 
        <use href="#ray-1" transform="rotate(270)" /> 
        <path id="ray-2" transform="translate(5.6 5.6)" d="M 0 0 1.2 1.2" /> 
        <use href="#ray-2" transform="rotate(90)" /> 
        <use href="#ray-2" transform="rotate(180)" /> 
        <use href="#ray-2" transform="rotate(270)" /> 
    </g>
</svg>`,
	moon: `<svg width="1em" height="1em" viewBox="-10 -10 20 20">
    <path transform="rotate(35) translate(-5.5 0)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M 0 -5.5 A 5.5 5.5 0 0 1 0 5.5 8 8 0 1 0 0 -5.5" />
</svg>`
};

export default icons;
