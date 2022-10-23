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
    if(value === null) return true
    return get(currentData).findIndex((v) => {
        return v._id.toString() === value
    })===-1?false:true
})
const debug = writable<boolean>(false)

const wait = (ts: number) => new Promise((res) => {
    setTimeout(res, ts)
})

async function getData() {
    const r = await fetch('/api/ideas', {
        method: 'GET'
    })
    return await r.json()
}

async function refresh(e?: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    e?.currentTarget?.querySelector('svg')?.classList.add('animate-spin')
    const target = e?.currentTarget
    const data = await getData()
    await wait(400)
    currentData.set(data)
    target?.querySelector('svg')?.classList.remove('animate-spin')
}

export {
    currentData,
    isBook,
    openBookID,
    debug,
    refresh
}