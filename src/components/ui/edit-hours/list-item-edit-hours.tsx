'use client'
import { Edit } from "lucide-react";
import { Activity, useState } from "react";
import { Input } from "../input";
import { Button } from "../button";

export default function ListItemEditHours({ entry }: { key: number, entry: any }) {
    const [editHours, setEditHours] = useState(false)


    return (
        <li key={entry.id} className="py-4 grid grid-cols-2 lg:grid-cols-6 gap-4 items-center w-full">
            <div className="col-span-2 lg:col-span-4">
                <Activity mode={!editHours ? "visible" : "hidden"} >
                    <div className="grid grid-cols-2 gap-4">
                        <p className="text-sm text-gray-500">{new Date(entry.time_in).toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{new Date(entry.time_out).toLocaleString()}</p>
                    </div>
                </Activity>
                <Activity mode={editHours ? "visible" : "hidden"} >
                    <form className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <Input
                            className="w-full"
                            type="time"
                            defaultValue={entry.time_in.split(" ")[1]}
                        />
                        <Input
                            className="w-full"
                            type="time"
                            defaultValue={entry.time_out.split(" ")[1]}
                        />
                        <Button className="w-full lg:w-auto">Save</Button>
                    </form>
                </Activity>
            </div>
            <div className="col-span-1 lg:col-span-1 mt-4 lg:mt-0 text-left">
                <p className="text-sm text-gray-500">
                    Hours: {((new Date(entry.time_out).getTime() - new Date(entry.time_in).getTime()) / (60 * 60 * 1000)).toFixed(2)}
                </p>
            </div>
            <div className="col-span-1 lg:col-span-1 flex justify-end lg:justify-end mt-4 lg:mt-0">
                <button
                    onClick={() => setEditHours(!editHours)}
                    type="button"
                    className="p-2 rounded-full"
                >
                    <Edit size={20} />
                </button>
            </div>
        </li >
    )
}