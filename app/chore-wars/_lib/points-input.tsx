'use client'
import { ScaleIcon } from '@heroicons/react/24/outline'

export default function PointsInput() {
    return (
        <div className="flex">
            <label
                htmlFor="points"
                className="group -my-2 -ml-2 inline-flex items-center rounded-full pl-3 py-2 text-left text-gray-400"
            >
                <ScaleIcon aria-hidden="true" className="-ml-1 mr-2 size-5 group-hover:text-gray-500" />

                <span className="text-sm italic text-gray-500 group-hover:text-gray-600">Points</span>
            </label>
            <input
                id="points"
                name="points"
                required
                type='number'
                min={1}
                max={100}
                placeholder="##"
                className="block w-full border-0 resize-none px-3 py-2 text-gray-900 sm:text-sm/6 font-medium placeholder:text-gray-400 focus:ring-0"
            />
        </div>
    )
}