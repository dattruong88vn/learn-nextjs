import { StudentDetail } from "@/components/swr"
import React, { useState } from "react"

export interface SwrPageProps {}

export default function SwrPage(props: SwrPageProps) {
  const [detailList, setDeailList] = useState([1, 1, 1])

  const handleAddClick = () => {
    setDeailList((prevList) => [...prevList, 1])
  }

  return (
    <div>
      <button onClick={handleAddClick}>Add detail</button>
      <ul>
        {detailList.map((x, i) => {
          return (
            <li key={i}>
              <StudentDetail studentId='sktwi1cgkkuif36f3' />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
