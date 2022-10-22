import { writable, type Updater, type Writable, get } from "svelte/store";
import type { HydratedIdea } from "./mongo";

function checkable<T>(value: T | undefined, cb: (value: T) => boolean): Writable<T> {
    const store = writable(value)
    function set(value: T) {
        if(!cb(value)) return
        store.set(value)
    }
    return {
        set,
        subscribe: store.subscribe,
        update(updater: Updater<T>) {
            set(updater(get(store)))
        }
    }
}

const currentData = writable<HydratedIdea[]>([])
const isBook = writable<boolean>(false)
const openBookID = checkable<string | null>(null, (value) => {
    console.log(value)
    if(value === null) return true
    return get(currentData).findIndex((v) => {
        return v._id.toString() === value
    })===-1?false:true
})

export {
    currentData,
    isBook,
    openBookID,
}