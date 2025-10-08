'use client'
import { Edit } from "lucide-react";
import { Activity, useState } from "react";

export default function ListItemEditHours({ key, entry }: { key: number, entry: any }) {
    const [editHours, setEditHours] = useState(false)
    return (
        <li key={entry.id} className="py-4 grid grid-cols-4 gap-4 items-center w-full">
            <Activity mode={!editHours ? "visible" : "hidden"} >
                <p className="text-sm text-gray-500">In: {new Date(entry.time_in).toLocaleString()}</p>
                <p className="text-sm text-gray-500">Out: {new Date(entry.time_out).toLocaleString()}</p>
                <p className="text-center">
                    Hours: {((new Date(entry.time_out).getTime() - new Date(entry.time_in).getTime()) / (60 * 60 * 1000)).toFixed(2)}
                </p>
            </Activity>
             <Activity mode={editHours ? "visible" : "hidden"} >
                <form>
                    <h1>test</h1>
                </form>
             </Activity>
            <div className="col-start-4 flex justify-end w-full">
                <button
                    onClick={() => setEditHours(!editHours)}
                    type="button"
                    className="p-2 rounded-full"
                >
                    <Edit size={20} />
                </button>
            </div>
        </li>
    )
}