import { useState } from "react"

export const Counter = () => {
    
    // học java, C# thì ta thấy kiểu viết này hơi lạ, hơi nguọc
    const [count, setCount] = useState(5)
    // count là giá trị của state, ban đầu là 0, vì giá trị nó là 0 nên js tự hiểu nó là number
    // setCount là hàm set lại giá trị của state,, tại sao không dùng count = mà phải làm setCount làm gì cho nặng đàu

    console.log("The function Counter is called");

    // hiểu hơn
    //const countState = useState(0)
   // const count1 = countState[0]
    //const setCount2 = countState[1]
    //2 cái trên là 1

    //function(){console.log("Cuong")}
    // hamf onClick cho pheps banj truyen vao 1 tham so event de ghi lai thong tin cua su kie
    // hamf onChange cung co event
    return <div> {count} <button onClick = {(event) => setCount(count + 1)}> Click me to raise count by 1</button></div>
}