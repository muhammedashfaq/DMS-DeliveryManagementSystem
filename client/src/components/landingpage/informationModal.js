import React from 'react'

const InformationModal = () => {
  return (
    <div>

<div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
	<h2 className="text-xl font-semibold leadi tracki">Aut fuga esse quasi id dicta dolorem?</h2>
	<p className="flex-1 dark:text-gray-400">Vero mollitia, accusantium deserunt fugiat obcaecati aperiam a, libero soluta asperiores sed quis incidunt.</p>
	<div className="flex flex-col justify-between gap-6 mt-6 sm:flex-row">
		<div className="flex items-center gap-2">
			<input type="checkbox" name="showAgain" id="showAgain" className="rounded-sm focus:ri focus:dark:border-violet-400 focus:ri accent-violet-400" />
			<label for="showAgain" className="text-sm cursor-pointer dark:text-gray-400">Don't show this again</label>
		</div>
		<button className="px-6 py-2 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">Continue</button>
	</div>
</div>
    </div>
  )
}

export default InformationModal