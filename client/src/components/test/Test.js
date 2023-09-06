import React from 'react'

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Test = () => {
  return (
    <div>

<div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 dark:bg-gray-800 dark:text-gray-100">
	<div className="flex flex-col justify-between">
		<div className="space-y-2">
			<h2 className="text-4xl font-bold leadi lg:text-5xl">Let's talk!</h2>
			<div className="dark:text-gray-400">Vivamus in nisl metus? Phasellus.</div>
		</div>
		<img src="assets/svg/doodle.svg" alt="" className="p-6 h-52 md:h-64" />
	</div>
	<form novalidate="" className="space-y-6">
		<div>
			<label for="name" className="text-sm">Full name</label>
			<input id="name" type="text" placeholder="" className="w-full p-3 rounded dark:bg-gray-800" />
		</div>
		<div>
			<label for="email" className="text-sm">Email</label>
			<input id="email" type="email" className="w-full p-3 rounded dark:bg-gray-800" />
		</div>
		<div>
			<label for="message" className="text-sm">Message</label>
			<textarea id="message" rows="3" className="w-full p-3 rounded dark:bg-gray-800"></textarea>
		</div>
		<button type="submit" className="w-full p-3 text-sm font-bold tracki uppercase rounded dark:bg-violet-400 dark:text-gray-900">Send Message</button>
	</form>
</div>




  <Popup trigger={<button> Trigger</button>} position="right center">
    <div>Popup content here !! jfhksgkg</div>
  </Popup>

    </div>
  )	
}

export default Test


