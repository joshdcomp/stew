'use client'
import { BellAlertIcon } from '@heroicons/react/24/outline'
import KeyDatePicker from './key-date-picker'

export default function DueDatePicker() {
    return (
        <KeyDatePicker
            icon={BellAlertIcon}
            name='due-date'
            title='Due date'
            label='Add a due date'
            placeholder='Due date'
        />
    )
}