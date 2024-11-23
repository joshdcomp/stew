'use client'
import createChore from '@/app/chore-wars/create-chore'

import RoomPicker from './room-picker'
import TypePicker from './type-picker'
import DueDatePicker from './due-date-picker'
import PointsInput from './points-input'
import SubmitButton from './submit-button'

export default function CreateChore() {

    return (
        <form
            action={async (e) => {
                await createChore(e)
            }}
            className="relative block w-full"
        >
            <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <label htmlFor="title" className="sr-only">
                    Title
                </label>
                <input
                    id="title"
                    name="title"
                    required
                    type="text"
                    placeholder="Title"
                    className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 text-primary focus:ring-0"
                />

                <label htmlFor="description" className="sr-only">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    required
                    rows={2}
                    placeholder="Write a description..."
                    className="block w-full border-0 py-0 placeholder:text-gray-400 text-primary focus:ring-0 sm:text-sm/6"
                    defaultValue={''}
                />

                {/* Spacer element to match the height of the toolbar */}
                <div aria-hidden="true">
                    <div className="py-2">
                        <div className="h-9" />
                    </div>
                    <div className="h-px" />
                    <div className="py-2">
                        <div className="py-px">
                            <div className="h-9" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute inset-x-px bottom-0">
                {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
                <div className="flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3">
                    {/* room picker */}
                    <RoomPicker />

                    {/* Label */}
                    <TypePicker />

                    {/* Due date */}
                    <DueDatePicker />
                </div>

                <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
                    {/* points */}
                    <PointsInput />

                    {/* submit */}
                    <div className="shrink-0">
                        <SubmitButton />
                    </div>
                </div>
            </div>
        </form>
    )
}
