import { MetaTypeCreator, ServerTimestamp, getFirelord, getFirestore, setDoc, serverTimestamp } from "firelordjs"
import "firebase/firestore"
import { initializeApp } from "firebase/app"

export type Example = MetaTypeCreator<
   {
      a: number
      b: { c: boolean; d: { e: string }[] }
      f: { g: ServerTimestamp; h: 1010 | 2929 | 3838 }
   }, // can go with even more crazy looking data type
   "SomeCollectionName", // collection ID type, must be string literal type or else will be replaced by error message
   string // optional, document ID type, default string
>

const app = initializeApp({})

export const db = getFirestore(app) // or getFirestore()

export const example = getFirelord<Example>(db, "SomeCollectionName") // this is your firelordRef

setDoc(example.doc("abc"), {
   a: 100,
   b: { c: true, d: [{ e: "abc" }] },
   f: { g: serverTimestamp(), h: 1010 },
})

export default function App() {
   return (
      <div className="App">
         <h1>Hello CodeSandbox</h1>
         <h2>Start editing to see magic happen!</h2>
      </div>
   )
}
