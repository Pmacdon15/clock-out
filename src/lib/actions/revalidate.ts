'use server'

import { revalidatePath, updateTag } from 'next/cache'

export async function revalidatePathAction(path: string) {
	revalidatePath(path)
}

export async function updateTagAction(tag: string) {
	updateTag(tag)
}
